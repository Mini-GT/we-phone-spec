import { useState } from "react"

type EmailVerificationModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EmailVerificationModal({
  isOpen,
  onClose,
}: EmailVerificationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-[80vw] p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Email Verification Sent
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please check your email inbox or spam folder to verify your account.
        </p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
