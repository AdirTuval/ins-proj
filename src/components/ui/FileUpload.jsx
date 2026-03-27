import { useState, useRef } from 'react'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileUpload({ value, onChange }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }
  const handleDragOver = (e) => { e.preventDefault() }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onChange(file)
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    if (file) onChange(file)
    // Reset input so same file can be re-selected after remove
    e.target.value = ''
  }

  // — File selected state —
  if (value) {
    return (
      <div className="flex items-center justify-between bg-primary/5 border-2 border-primary/30 rounded-xl px-4 py-3 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{value.name}</p>
            <p className="text-xs text-muted">{formatSize(value.size)}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="הסר קובץ"
          className="w-7 h-7 flex-shrink-0 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors cursor-pointer text-base font-medium"
        >
          ×
        </button>
      </div>
    )
  }

  // — Drop zone state —
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="העלאת קובץ פוליסה — לחץ או גרור קובץ לכאן"
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-ins_border hover:border-primary/50 hover:bg-primary/5'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/*"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">גרור קובץ לכאן או לחץ להעלאה</p>
      <p className="text-xs text-muted">PDF, JPG, PNG — עד 10MB</p>
    </div>
  )
}
