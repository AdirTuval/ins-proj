export default function FloatingCTA({ onOpen }) {
  return (
    <div className="fixed bottom-0 right-0 left-0 z-30 px-4 pb-4 pt-3 bg-white/95 backdrop-blur-sm border-t border-ins_border shadow-[0_-4px_20px_rgba(3,105,161,0.08)]">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onOpen}
          className="w-full py-3.5 bg-accent text-white rounded-xl font-semibold text-base transition-all duration-200 shadow-md hover:bg-accent-hover hover:shadow-lg active:scale-[0.98] cursor-pointer"
        >
          אני רוצה שנציג יחזור אליי
        </button>
      </div>
    </div>
  )
}
