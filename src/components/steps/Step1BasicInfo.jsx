import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '../ui/Tooltip'

const ISRAELI_PHONE_RE = /^05[0-9][-\s]?\d{7}$/

export default function Step1BasicInfo({ initialData, onNext }) {
  const [hasInsurance, setHasInsurance] = useState(initialData.hasInsurance)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      age: initialData.age || '',
      phone: initialData.phone || '',
      currentPayment: initialData.currentPayment || '',
      coverageAmount: initialData.coverageAmount || '',
      consent: initialData.consent || false,
    },
  })

  const watchAge = watch('age')
  const watchPhone = watch('phone')
  const watchConsent = watch('consent')

  const isAgeValid = watchAge && Number(watchAge) >= 18 && Number(watchAge) <= 80
  const isPhoneValid = watchPhone && ISRAELI_PHONE_RE.test(watchPhone.trim())
  const canProceed = isAgeValid && isPhoneValid && hasInsurance !== null && watchConsent

  const onSubmit = (data) => {
    if (!canProceed) return
    onNext({
      age: Number(data.age),
      phone: data.phone.trim(),
      hasInsurance,
      currentPayment: data.currentPayment ? Number(data.currentPayment) : '',
      coverageAmount: data.coverageAmount ? Number(data.coverageAmount) : '',
      consent: true,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.0, 0.0, 0.2, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.18, ease: [0.4, 0.0, 1, 1] } }}
    >
      {/* Hero intro */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground mb-1">קבל הצעה מותאמת אישית</h2>
        <p className="text-muted text-sm">מלא את הפרטים הבאים — זה לוקח פחות מדקה</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-ins_border p-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-foreground mb-1.5">
              גיל <span className="text-destructive" aria-label="שדה חובה">*</span>
            </label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min="18"
              max="80"
              placeholder="לדוגמה: 35"
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'age-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-foreground text-right placeholder-muted/40 text-base transition-colors focus:outline-none focus:border-primary ${
                errors.age ? 'border-destructive' : 'border-ins_border'
              }`}
              {...register('age', {
                required: 'שדה חובה',
                min: { value: 18, message: 'גיל מינימלי הוא 18' },
                max: { value: 80, message: 'גיל מקסימלי הוא 80' },
              })}
            />
            {errors.age && (
              <p id="age-error" role="alert" className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1.5">
              מספר טלפון <span className="text-destructive" aria-label="שדה חובה">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="050-1234567"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-foreground text-right placeholder-muted/40 text-base transition-colors focus:outline-none focus:border-primary ${
                errors.phone ? 'border-destructive' : 'border-ins_border'
              }`}
              {...register('phone', {
                required: 'שדה חובה',
                pattern: {
                  value: ISRAELI_PHONE_RE,
                  message: 'אנא הזן מספר נייד ישראלי תקין (לדוגמה: 050-1234567)',
                },
              })}
            />
            <p id="phone-hint" className="text-xs text-muted mt-1">
              מספר ישראלי בפורמט 05X-XXXXXXX
            </p>
            {errors.phone && (
              <p id="phone-error" role="alert" className="text-destructive text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Insurance toggle */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              האם יש לך ביטוח חיים פעיל? <span className="text-destructive" aria-label="שדה חובה">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3" role="group" aria-label="האם יש לך ביטוח חיים פעיל?">
              {[{ value: true, label: 'כן, יש לי' }, { value: false, label: 'לא, אין לי' }].map(({ value, label }) => (
                <button
                  key={String(value)}
                  type="button"
                  aria-pressed={hasInsurance === value}
                  onClick={() => setHasInsurance(value)}
                  className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    hasInsurance === value
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-foreground border-ins_border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional fields — has insurance */}
          <AnimatePresence>
            {hasInsurance === true && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto', transition: { duration: 0.25 } }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
                className="overflow-hidden"
              >
                <div className="bg-primary/5 rounded-xl p-4 border border-ins_border space-y-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">פרטי הביטוח הקיים — אופציונלי</p>

                  {/* Current payment */}
                  <div>
                    <label htmlFor="currentPayment" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                      כמה אתה משלם כיום?
                      <Tooltip text="הסכום החודשי שאתה משלם כרגע לביטוח החיים שלך" />
                    </label>
                    <div className="relative">
                      <input
                        id="currentPayment"
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-ins_border bg-white text-foreground text-right placeholder-muted/40 text-base focus:outline-none focus:border-primary transition-colors"
                        {...register('currentPayment')}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-semibold text-sm select-none">₪</span>
                    </div>
                  </div>

                  {/* Coverage amount */}
                  <div>
                    <label htmlFor="coverageAmount" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                      מה סכום הכיסוי לפיצויים?
                      <Tooltip text="הסכום שיתקבל במקרה של פטירה או אירוע מכוסה בפוליסה" />
                    </label>
                    <div className="relative">
                      <input
                        id="coverageAmount"
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-ins_border bg-white text-foreground text-right placeholder-muted/40 text-base focus:outline-none focus:border-primary transition-colors"
                        {...register('coverageAmount')}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-semibold text-sm select-none">₪</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Consent checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                className="mt-0.5 w-5 h-5 rounded border-2 border-ins_border cursor-pointer flex-shrink-0"
                {...register('consent', { required: true })}
              />
              <span className="text-sm text-foreground leading-relaxed">
                אני מאשר/ת העברת פרטיי לנציג וכי ייצרו איתי קשר{' '}
                <span className="text-destructive" aria-label="שדה חובה">*</span>
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!canProceed}
            aria-disabled={!canProceed}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 mt-1 ${
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
