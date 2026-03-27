import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Tooltip from '../ui/Tooltip'
import FileUpload from '../ui/FileUpload'

export default function Step2AInsurance({ initialData, onNext, onBack }) {
  const [uploadedFile, setUploadedFile] = useState(initialData.policyFile || null)
  const [isSmoker, setIsSmoker] = useState(initialData.isSmoker)

  const {
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      coveragePreferences: initialData.coveragePreferences || '',
      healthConditions: initialData.healthConditions || '',
      medicalProcess: initialData.medicalProcess || '',
      additionalInfo: initialData.additionalInfo || '',
      additionalDetails: initialData.additionalDetails || '',
      accuracyConsent: initialData.accuracyConsent || false,
    },
  })

  const accuracyConsent = watch('accuracyConsent')

  const handleSkipWithFile = () => {
    onNext({
      policyFile: uploadedFile,
      coveragePreferences: '',
      isSmoker: null,
      healthConditions: '',
      medicalProcess: '',
      additionalInfo: '',
      additionalDetails: '',
      accuracyConsent: true,
    })
  }

  const onSubmit = (data) => {
    onNext({
      policyFile: uploadedFile,
      coveragePreferences: data.coveragePreferences,
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
        <h2 className="text-2xl font-bold text-foreground mb-1">פרטי הפוליסה הקיימת</h2>
        <p className="text-muted text-sm">העלה את הפוליסה שלך, או ענה על השאלות הבאות</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-ins_border p-6 space-y-6">

        {/* ─── File upload section ─── */}
        <section aria-labelledby="upload-heading">
          <h3 id="upload-heading" className="text-sm font-semibold text-foreground mb-2">
            העלאת פוליסה קיימת
            <span className="text-muted font-normal mr-1">(אופציונלי)</span>
          </h3>
          <FileUpload value={uploadedFile} onChange={setUploadedFile} />

          {/* Skip button — appears when file is uploaded */}
          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <button
                type="button"
                onClick={handleSkipWithFile}
                className="w-full py-3.5 bg-accent text-white rounded-xl font-bold text-base hover:bg-accent-hover transition-all duration-200 cursor-pointer shadow-md active:scale-[0.98]"
              >
                דלג על השאלות ועבור לסיום
                <span className="mr-1.5" aria-hidden="true">←</span>
              </button>
            </motion.div>
          )}
        </section>

        {/* ─── Q&A section (shown when no file uploaded) ─── */}
        {!uploadedFile && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="border-t border-ins_border pt-5">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-4">
                או ענה על השאלות הבאות:
              </p>

              <div className="space-y-5">

                {/* 1 — Coverage preferences */}
                <div>
                  <label htmlFor="coveragePreferences" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                    אילו כיסויים חשובים לך בפוליסה?
                    <Tooltip text="לדוגמה: נכות, מחלות קשות, אובדן כושר עבודה" />
                  </label>
                  <textarea
                    id="coveragePreferences"
                    rows={3}
                    placeholder="תאר את הכיסויים החשובים לך..."
                    className={textareaClass}
                    {...register('coveragePreferences')}
                  />
                </div>

                {/* 2 — Smoker toggle */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    האם אתה מעשן?
                  </label>
                  <div className="grid grid-cols-2 gap-3" role="group" aria-label="האם אתה מעשן?">
                    {[{ value: true, label: 'כן' }, { value: false, label: 'לא' }].map(({ value, label }) => (
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

                {/* 3 — Health conditions */}
                <div>
                  <label htmlFor="healthConditions" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                    האם קיימים מצבים בריאותיים ידועים?
                    <Tooltip text="לדוגמה: סוכרת, לחץ דם, מחלות לב" />
                  </label>
                  <textarea
                    id="healthConditions"
                    rows={2}
                    placeholder="אם כן, פרט כאן..."
                    className={textareaClass}
                    {...register('healthConditions')}
                  />
                </div>

                {/* 4 — Medical process */}
                <div>
                  <label htmlFor="medicalProcess" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                    האם אתה עובר כיום תהליך רפואי כלשהו?
                    <Tooltip text="לדוגמה: ניתוח מתוכנן, טיפולים, בדיקות" />
                  </label>
                  <textarea
                    id="medicalProcess"
                    rows={2}
                    placeholder="אם כן, פרט כאן..."
                    className={textareaClass}
                    {...register('medicalProcess')}
                  />
                </div>

                {/* 5 — Additional info */}
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-semibold text-foreground mb-1.5">
                    האם יש משהו נוסף שחשוב לדעת?
                  </label>
                  <textarea
                    id="additionalInfo"
                    rows={2}
                    placeholder="פרט כאן..."
                    className={textareaClass}
                    {...register('additionalInfo')}
                  />
                </div>

                {/* 6 — Additional details (large) */}
                <div>
                  <label htmlFor="additionalDetails" className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1.5">
                    פרטים נוספים רלוונטיים
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

              {/* Accuracy consent */}
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
                disabled={!accuracyConsent}
                aria-disabled={!accuracyConsent}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 mt-4 ${
                  accuracyConsent
                    ? 'bg-primary text-white hover:bg-primary-hover cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]'
                    : 'bg-ins_border text-muted cursor-not-allowed opacity-70'
                }`}
              >
                המשך
                <span className="mr-1.5" aria-hidden="true">←</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  )
}
