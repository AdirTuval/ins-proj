import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Tooltip from '../ui/Tooltip'

export default function Step2BNoInsurance({ initialData, onNext, onBack }) {
  const [isSmoker, setIsSmoker] = useState(initialData.isSmoker)

  const {
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      healthConditions: initialData.healthConditions || '',
      medicalProcess: initialData.medicalProcess || '',
      additionalInfo: initialData.additionalInfo || '',
      additionalDetails: initialData.additionalDetails || '',
      accuracyConsent: initialData.accuracyConsent || false,
    },
  })

  const accuracyConsent = watch('accuracyConsent')
  const canProceed = isSmoker !== null && accuracyConsent === true

  const onSubmit = (data) => {
    onNext({
      isSmoker,
      healthConditions: data.healthConditions,
      medicalProcess: data.medicalProcess,
      additionalInfo: data.additionalInfo,
      additionalDetails: data.additionalDetails,
      accuracyConsent: true,
    })
  }

  const textareaClass =
    'w-full px-4 py-3 rounded-xl border-2 border-ins_border bg-white text-foreground text-right placeholder-muted/40 text-base focus:outline-none focus:border-primary transition-colors resize-none'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.0, 0.0, 0.2, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.18, ease: [0.4, 0.0, 1, 1] } }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-muted hover:text-foreground text-sm mb-4 transition-colors duration-150 cursor-pointer"
      >
        חזור →
      </button>

      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground mb-1">שאלות רפואיות</h2>
        <p className="text-muted text-sm">ככל שתפרט יותר, הפוליסה תתאים לך יותר</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-ins_border p-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5">

            {/* 1 — Smoker toggle */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                האם אתה מעשן?
                <span className="text-destructive mr-1" aria-label="שדה חובה">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3" role="group" aria-label="האם אתה מעשן?">
                {[{ value: false, label: 'לא מעשן' }, { value: true, label: 'מעשן' }].map(({ value, label }) => (
                  <button
                    key={String(value)}
                    type="button"
                    aria-pressed={isSmoker === value}
                    onClick={() => setIsSmoker(value)}
                    className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer ${
                      isSmoker === value
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-foreground border-ins_border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2 — Health conditions */}
            <div>
              <label htmlFor="healthConditions" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                מצבים בריאותיים קיימים
                <Tooltip text="לדוגמה: סוכרת, לחץ דם, מחלות לב" />
              </label>
              <textarea
                id="healthConditions"
                rows={2}
                placeholder="אם יש, פרט כאן..."
                className={textareaClass}
                {...register('healthConditions')}
              />
            </div>

            {/* 3 — Medical process */}
            <div>
              <label htmlFor="medicalProcess" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                תהליכים רפואיים נוכחיים
                <Tooltip text="לדוגמה: ניתוח מתוכנן, טיפולים, בדיקות" />
              </label>
              <textarea
                id="medicalProcess"
                rows={2}
                placeholder="אם יש, פרט כאן..."
                className={textareaClass}
                {...register('medicalProcess')}
              />
            </div>

            {/* 4 — Additional info */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold text-foreground mb-1.5">
                כל משהו שחשוב לדעת
              </label>
              <textarea
                id="additionalInfo"
                rows={2}
                placeholder="פרט כאן..."
                className={textareaClass}
                {...register('additionalInfo')}
              />
            </div>

            {/* 5 — Free text */}
            <div>
              <label htmlFor="additionalDetails" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                רשום כאן כל הדברים שרלוונטים וחשוב לדעת
                <Tooltip text="ככל שתפרט יותר, כך נוכל להתאים לך פוליסה מדויקת יותר" />
              </label>
              <textarea
                id="additionalDetails"
                rows={4}
                placeholder="שתף אותנו בכל מידע נוסף שיכול לעזור למצוא לך את הפוליסה הטובה ביותר..."
                className={textareaClass}
                {...register('additionalDetails')}
              />
            </div>

          </div>

          {/* 6 — Accuracy consent */}
          <div className="mt-5 pt-4 border-t border-ins_border">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                className="mt-0.5 w-5 h-5 rounded border-2 border-ins_border cursor-pointer flex-shrink-0"
                {...register('accuracyConsent', { required: true })}
              />
              <span className="text-sm text-foreground leading-relaxed">
                אני מאשר/ת שכל הפרטים שמילאתי נכונים למיטב ידיעתי ונכונים לזמן זה{' '}
                <span className="text-destructive" aria-label="שדה חובה">*</span>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canProceed}
            aria-disabled={!canProceed}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 mt-4 ${
              canProceed
                ? 'bg-primary text-white hover:bg-primary-hover cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]'
                : 'bg-ins_border text-muted cursor-not-allowed opacity-70'
            }`}
          >
            המשך
            <span className="mr-1.5" aria-hidden="true">←</span>
          </button>
        </form>
      </div>
    </motion.div>
  )
}
