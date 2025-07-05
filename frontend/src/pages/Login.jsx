
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const { login, loading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    clearError()
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await login(formData)
      navigate("/dashboard")
    } catch (err) {
      // Error is handled by context
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-600 text-lg font-medium">Sign in to your Smart Task Manager</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 hover-lift">
          {error && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl animate-pulse">
              <div className="flex items-center">
                <div className="p-2 rounded-xl bg-red-100 mr-4">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-red-700 font-bold text-lg">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="📧 Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              autoComplete="email"
            />

            <Input
              label="🔒 Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              {loading ? "Signing In..." : "🚀 Sign In"}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-lg">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-pink-600 hover:text-pink-700 transition-colors cursor-pointer hover:underline"
              >
                Create one here ✨
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Fast</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
