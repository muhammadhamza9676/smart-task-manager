import { createContext, useContext, useReducer, useEffect } from "react"
import { authService } from "../services/auth"

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      }
    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const user = authService.getCurrentUser()
    const token = authService.getToken()

    if (user && token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      })
    }
  }, [])

  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" })
    try {
      const result = await authService.login(credentials)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result,
      })
      return result
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message || "Login failed",
      })
      throw error
    }
  }

  const register = async (userData) => {
    dispatch({ type: "REGISTER_START" })
    try {
      const result = await authService.register(userData)
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: result,
      })
      return result
    } catch (error) {
      dispatch({
        type: "REGISTER_ERROR",
        payload: error.message || "Registration failed",
      })
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: "LOGOUT" })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
