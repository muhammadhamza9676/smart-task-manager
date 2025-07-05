
import { useEffect } from "react"

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop with blur */}
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md transition-all duration-300" onClick={onClose} />

        {/* Modal */}
        <div
          className={`relative bg-white rounded-3xl shadow-2xl w-full ${sizeClasses[size]} transform transition-all duration-300 scale-100 border border-gray-100`}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
