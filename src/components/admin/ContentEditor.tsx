'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

interface ContentEditorProps {
  value: string
  onChange: (markdown: string) => void
  placeholder?: string
}

export default function ContentEditor({
  value,
  onChange,
  placeholder = 'Escreva o conteúdo aqui...',
}: ContentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: { languageClassPrefix: 'language-' } }),
      Image.configure({ allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose-editor focus:outline-none min-h-[300px] px-5 py-4',
      },
    },
    onUpdate({ editor }) {
      // Retorna o HTML — backend pode converter se necessário
      onChange(editor.getHTML())
    },
  })

  // Sincronizar valor externo (ex: ao trocar de post sem remontar)
  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.12)' }}
    >
      {/* Toolbar */}
      {editor && (
        <div
          className="flex flex-wrap gap-1 px-3 py-2 border-b"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Headings */}
          {[1, 2, 3].map(level => (
            <ToolBtn
              key={level}
              active={editor.isActive('heading', { level })}
              onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()}
              title={`Título ${level}`}
            >
              H{level}
            </ToolBtn>
          ))}

          <Divider />

          <ToolBtn
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Negrito"
          >
            <strong>B</strong>
          </ToolBtn>
          <ToolBtn
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Itálico"
          >
            <em>I</em>
          </ToolBtn>
          <ToolBtn
            active={editor.isActive('code')}
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="Código inline"
          >
            {'<>'}
          </ToolBtn>

          <Divider />

          <ToolBtn
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Lista com marcadores"
          >
            •—
          </ToolBtn>
          <ToolBtn
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Lista numerada"
          >
            1.
          </ToolBtn>
          <ToolBtn
            active={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Citação"
          >
            &ldquo;&rdquo;
          </ToolBtn>

          <Divider />

          <ToolBtn
            onClick={() => editor.chain().focus().undo().run()}
            title="Desfazer"
            disabled={!editor.can().undo()}
          >
            ↩
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().redo().run()}
            title="Refazer"
            disabled={!editor.can().redo()}
          >
            ↪
          </ToolBtn>
        </div>
      )}

      {/* Editor area */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <style>{`
          .prose-editor h1 { font-size: 1.75rem; font-weight: 700; margin: 1rem 0 0.5rem; color: var(--color-canvas); }
          .prose-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; color: var(--color-canvas); }
          .prose-editor h3 { font-size: 1.15rem; font-weight: 600; margin: 0.8rem 0 0.4rem; color: var(--color-canvas); }
          .prose-editor p { margin: 0.5rem 0; color: rgba(244,239,230,0.85); line-height: 1.7; }
          .prose-editor strong { color: var(--color-canvas); }
          .prose-editor em { color: rgba(244,239,230,0.75); }
          .prose-editor code { background: rgba(255,255,255,0.1); padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.85em; }
          .prose-editor blockquote { border-left: 3px solid var(--color-gold); margin: 0.8rem 0; padding-left: 1rem; color: rgba(244,239,230,0.6); }
          .prose-editor ul, .prose-editor ol { margin: 0.5rem 0; padding-left: 1.5rem; color: rgba(244,239,230,0.85); }
          .prose-editor li { margin: 0.2rem 0; }
          .prose-editor .is-editor-empty::before { content: attr(data-placeholder); float: left; color: rgba(244,239,230,0.3); pointer-events: none; height: 0; }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

// ── Helpers internos ──

function ToolBtn({
  children,
  onClick,
  active = false,
  disabled = false,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="px-2 py-1 text-xs rounded transition-colors disabled:opacity-30"
      style={{
        backgroundColor: active ? 'rgba(170,134,75,0.25)' : 'transparent',
        color: active ? 'var(--color-gold)' : 'rgba(244,239,230,0.6)',
      }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return (
    <span
      className="mx-1 self-stretch w-px"
      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
    />
  )
}
