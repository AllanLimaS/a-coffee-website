import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_WIDTH = 1920
const QUALITY = 82

export interface OptimizeResult {
  filename: string
  publicPath: string
  width: number
  height: number
  sizeBytes: number
}

/**
 * Recebe um Buffer de imagem, otimiza com sharp (WebP, max 1920px, q82)
 * e salva em public/uploads/.
 * Retorna os metadados do arquivo gerado.
 */
export async function optimizeAndSave(
  buffer: Buffer,
  originalFilename: string
): Promise<OptimizeResult> {
  // Garantir que o diretório existe
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true })
  }

  // Gerar nome de arquivo único: slug + timestamp + .webp
  const base = slugify(path.parse(originalFilename).name)
  const filename = `${base}-${Date.now()}.webp`
  const outputPath = path.join(UPLOADS_DIR, filename)

  // Processar com sharp
  const image = sharp(buffer)
  const meta = await image.metadata()

  const needsResize = meta.width && meta.width > MAX_WIDTH

  const pipeline = needsResize
    ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : image

  const { data, info } = await pipeline
    .webp({ quality: QUALITY })
    .toBuffer({ resolveWithObject: true })

  fs.writeFileSync(outputPath, data)

  return {
    filename,
    publicPath: `/uploads/${filename}`,
    width: info.width,
    height: info.height,
    sizeBytes: info.size,
  }
}

/**
 * Remove uma imagem de public/uploads/ pelo nome do arquivo.
 */
export function deleteUpload(filename: string): boolean {
  try {
    const filePath = path.join(UPLOADS_DIR, filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    return true
  } catch (err) {
    console.error('[image] deleteUpload error:', err)
    return false
  }
}

/**
 * Lista todas as imagens em public/uploads/.
 */
export function listUploads(): { filename: string; publicPath: string; sizeBytes: number }[] {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) return []

    return fs
      .readdirSync(UPLOADS_DIR)
      .filter(f => !f.startsWith('.') && /\.(webp|jpg|jpeg|png|gif|avif)$/i.test(f))
      .map(filename => {
        const stat = fs.statSync(path.join(UPLOADS_DIR, filename))
        return {
          filename,
          publicPath: `/uploads/${filename}`,
          sizeBytes: stat.size,
        }
      })
      .sort((a, b) => b.sizeBytes - a.sizeBytes) // mais pesados primeiro (geralmente mais recentes)
  } catch {
    return []
  }
}

// ── Helpers ──

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}
