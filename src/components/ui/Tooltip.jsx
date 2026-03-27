import { useState } from 'react'

export default function Tooltip({ text }) {
  const [visible, setVisible] = useState(false)

  return (
    <span className="relative inline-flex items-center flex-shrink-0">
      <button
        type="button"
        aria-label="מידע נוסף"
        className="w-5 h-5 rounded-full bg-secondary/20 text-primary flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-secondary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 select-none"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setVisible((v) => !v)
        }}
      >
        ?
      </button>

      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full right-0 mb-2 z-50 bg-foreground text-white text-xs rounded-xl px-3 py-2.5 shadow-xl w-56 leading-relaxed pointer-events-none"
        >
          {text}
          {/* Arrow */}
          <span className="absolute bottom-[-5px] right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
        </span>
      )}
    </span>
  )
}
