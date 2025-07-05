import api from "./api"

export const taskService = {
  async getTasks(filters = {}) {
    try {
      const params = new URLSearchParams()

      if (filters.category) {
        params.append("category", filters.category)
      }

      if (filters.dueBefore) {
        params.append("dueBefore", filters.dueBefore)
      }

      const response = await api.get(`/tasks?${params.toString()}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch tasks" }
    }
  },

  async createTask(taskData) {
    try {
      const response = await api.post("/tasks", taskData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Failed to create task" }
    }
  },

  async updateTask(taskId, taskData) {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Failed to update task" }
    }
  },

  async deleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`)
      return true
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete task" }
    }
  },

  async toggleTaskCompletion(taskId) {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Failed to toggle task" }
    }
  },

  async getTaskById(taskId) {
    try {
      const response = await api.get(`/tasks/${taskId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch task" }
    }
  },
}
