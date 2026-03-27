const STEPS = [
  { key: 'step1', label: 'פרטים בסיסיים' },
  { key: 'step2', label: 'פרטים נוספים' },
  { key: 'final', label: 'סיום' },
]

function normalizeStep(step) {
  if (step === 'step2a' || step === 'step2b') return 'step2'
  return step
}

export default function ProgressBar({ currentStep }) {
  const steps = STEPS
  const currentIndex = steps.findIndex((s) => s.key === normalizeStep(currentStep))

  return (
    <nav aria-label="שלבי הטופס">
      <ol className="flex items-start gap-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isLast = index === steps.length - 1

          return (
            <li key={step.key} className="flex items-center flex-1 min-w-0">
              {/* Step node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : isActive
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-white text-muted border-2 border-ins_border'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span aria-hidden="true">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 whitespace-nowrap font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary' : isCompleted ? 'text-primary/70' : 'text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500 ${
                    isCompleted ? 'bg-primary' : 'bg-ins_border'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
