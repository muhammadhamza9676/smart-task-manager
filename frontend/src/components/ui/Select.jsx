import { forwardRef } from "react"

const Select = forwardRef(({ label, error, options = [], className = "", ...props }, ref) => {
  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-bold text-gray-800 tracking-wide">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-5 py-4 rounded-2xl border-2 border-gray-200 
            focus:border-purple-500 focus:ring-4 focus:ring-purple-100 
            transition-all duration-300 outline-none
            text-gray-900 bg-white font-medium cursor-pointer
            hover:border-purple-300 hover:shadow-md
            appearance-none pr-12
            ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600 animate-pulse">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select
