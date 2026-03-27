import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function StepFinal({ formData }) {
  useEffect(() => {
    // Serialize File object (not JSON-serializable natively)
    const dataToLog = {
      ...formData,
      policyFile: formData.policyFile
        ? {
            name: formData.policyFile.name,
            size: formData.policyFile.size,
            type: formData.policyFile.type,
          }
        : null,
    }
    console.log('📋 Insurance Lead — Form Data:')
    console.log(JSON.stringify(dataToLog, null, 2))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.0, 0.0, 0.2, 1] } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.18, ease: [0.4, 0.0, 1, 1] } }}
    >
      <div className="bg-white rounded-2xl shadow-md border border-ins_border p-8 text-center">

        {/* Animated checkmark */}
        <motion.div
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 18 }}
        >
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">תודה!</h2>
          <h3 className="text-lg font-semibold text-primary mb-3">
            קיבלנו את הפרטים שלך
          </h3>
          <p className="text-muted text-base leading-relaxed max-w-xs mx-auto mb-7">
            נציג מטעמנו יצור איתך קשר בהקדם האפשרי עם הצעה מותאמת אישית עבורך
          </p>

          {/* Trust badge */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-ins_border text-right">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">הפרטים שלך מאובטחים</p>
                <p className="text-xs text-muted leading-relaxed">
                  המידע שמסרת יישמר בסודיות מלאה ויועבר לנציג המורשה בלבד
                </p>
              </div>
            </div>
          </div>

          {/* Dev note */}
          <p className="text-xs text-muted/60 mt-5 italic">
            פרטי הטופס הוגרשו ל-console (פתח DevTools לצפות)
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
