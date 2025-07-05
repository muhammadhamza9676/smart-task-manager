import api from "./api"

export const authService = {
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData)
      const { user, token } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      return { user, token }
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" }
    }
  },

  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials)
      const { user, token } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      return { user, token }
    } catch (error) {
      throw error.response?.data || { message: "Login failed" }
    }
  },

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },

  getToken() {
    return localStorage.getItem("token")
  },

  isAuthenticated() {
    return !!this.getToken()
  },
}
