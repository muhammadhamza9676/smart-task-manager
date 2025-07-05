const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 cursor-pointer"

  const variants = {
    primary:
      "bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-xl hover:shadow-pink-500/25 focus:ring-pink-500",
    secondary:
      "bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 shadow-md hover:shadow-lg hover:shadow-purple-500/10 focus:ring-purple-500",
    outline:
      "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:border-pink-600 focus:ring-pink-500 shadow-md hover:shadow-lg",
    ghost: "text-gray-600 hover:text-white hover:bg-pink-600 focus:ring-pink-500 rounded-xl",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-500",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
