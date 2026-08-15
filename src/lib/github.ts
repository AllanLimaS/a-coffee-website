import { Octokit } from '@octokit/rest'

// Singleton do client Octokit
let _octokit: Octokit | null = null

export function getOctokit(): Octokit {
  if (!_octokit) {
    _octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  }
  return _octokit
}

export const REPO_OWNER = process.env.GITHUB_OWNER ?? ''
export const REPO_NAME  = process.env.GITHUB_REPO  ?? ''

// ── Leitura de arquivo ──
export async function getFileContent(path: string): Promise<{ content: string; sha: string } | null> {
  try {
    const octokit = getOctokit()
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
    })

    const data = response.data
    if (Array.isArray(data) || data.type !== 'file') return null

    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    return { content, sha: data.sha }
  } catch {
    return null
  }
}

// ── Escrita / commit de arquivo ──
export async function putFileContent(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<boolean> {
  try {
    const octokit = getOctokit()
    const encoded = Buffer.from(content, 'utf-8').toString('base64')

    let currentSha = sha
    if (!currentSha) {
      const existing = await getFileContent(path)
      if (existing) {
        currentSha = existing.sha
      }
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      content: encoded,
      sha: currentSha,
    })

    return true
  } catch (err) {
    console.error('[github] putFileContent error:', err)
    return false
  }
}

// ── Deleção de arquivo ──
export async function deleteFile(
  path: string,
  sha: string,
  message: string
): Promise<boolean> {
  try {
    const octokit = getOctokit()

    await octokit.repos.deleteFile({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      sha,
    })

    return true
  } catch (err) {
    console.error('[github] deleteFile error:', err)
    return false
  }
}

// ── Listar arquivos de uma pasta ──
export async function listDirectory(dirPath: string): Promise<string[]> {
  try {
    const octokit = getOctokit()
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: dirPath,
    })

    const data = response.data
    if (!Array.isArray(data)) return []

    return data
      .filter(item => item.type === 'file')
      .map(item => item.name)
  } catch {
    return []
  }
}
