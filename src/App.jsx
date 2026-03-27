import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ProgressBar from './components/ui/ProgressBar'
import FloatingCTA from './components/ui/FloatingCTA'
import Modal from './components/ui/Modal'
import Step1BasicInfo from './components/steps/Step1BasicInfo'
import Step2AInsurance from './components/steps/Step2AInsurance'
import StepFinal from './components/steps/StepFinal'

const initialFormData = {
  age: '',
  phone: '',
  hasInsurance: null,
  currentPayment: '',
  coverageAmount: '',
  consent: false,
  policyFile: null,
  coveragePreferences: '',
  isSmoker: null,
  healthConditions: '',
  medicalProcess: '',
  additionalInfo: '',
  additionalDetails: '',
  accuracyConsent: false,
}

export default function App() {
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState('step1')
  const [modalOpen, setModalOpen] = useState(false)

  const updateFormData = (partial) => {
    setFormData((prev) => ({ ...prev, ...partial }))
  }

  const goNext = (stepData) => {
    const merged = { ...formData, ...stepData }
    setFormData(merged)

    if (currentStep === 'step1') {
      setCurrentStep(stepData.hasInsurance ? 'step2a' : 'final')
    } else {
      setCurrentStep('final')
    }
  }

  return (
    <div className="min-h-dvh bg-background" dir="rtl">
      {/* Sticky header with progress */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-ins_border shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-base font-bold text-primary">ביטוח חיים</span>
            </div>
            <span className="text-xs text-muted bg-ins_border/50 px-3 py-1 rounded-full font-medium">
              השוואה חינמית
            </span>
          </div>
          <ProgressBar currentStep={currentStep} hasInsurance={formData.hasInsurance} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6 page-scroll-padding">
        <AnimatePresence mode="wait">
          {currentStep === 'step1' && (
            <Step1BasicInfo
              key="step1"
              initialData={formData}
              onNext={goNext}
            />
          )}
          {currentStep === 'step2a' && (
            <Step2AInsurance
              key="step2a"
              initialData={formData}
              onNext={goNext}
            />
          )}
          {currentStep === 'final' && (
            <StepFinal
              key="final"
              formData={formData}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Always-visible floating CTA */}
      <FloatingCTA onOpen={() => setModalOpen(true)} />

      {/* Modal triggered by floating CTA */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
