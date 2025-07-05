
import { useState, useEffect, useCallback } from "react"
import { taskService } from "../services/tasks"

export const useTasks = (initialFilters = {}) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  const fetchTasks = useCallback(
    async (currentFilters = filters) => {
      setLoading(true)
      setError(null)

      try {
        // Clean the filters - only send non-empty values
        const cleanFilters = {}

        if (currentFilters.category && currentFilters.category.trim() !== "") {
          cleanFilters.category = currentFilters.category
        }

        if (currentFilters.dueBefore && currentFilters.dueBefore.trim() !== "") {
          cleanFilters.dueBefore = currentFilters.dueBefore
        }

        const data = await taskService.getTasks(cleanFilters)
        setTasks(data)
      } catch (err) {
        setError(err.message || "Failed to fetch tasks")
      } finally {
        setLoading(false)
      }
    },
    [filters],
  )

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks((prev) => [newTask, ...prev])
      return newTask
    } catch (err) {
      setError(err.message || "Failed to create task")
      throw err
    }
  }

  const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData)
      setTasks((prev) => prev.map((task) => (task._id === taskId ? updatedTask : task)))
      return updatedTask
    } catch (err) {
      setError(err.message || "Failed to update task")
      throw err
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
    } catch (err) {
      setError(err.message || "Failed to delete task")
      throw err
    }
  }

  const toggleTask = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleTaskCompletion(taskId)
      setTasks((prev) => prev.map((task) => (task._id === taskId ? updatedTask : task)))
      return updatedTask
    } catch (err) {
      setError(err.message || "Failed to toggle task")
      throw err
    }
  }

  const updateFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const clearError = () => setError(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    loading,
    error,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    updateFilters,
    clearError,
  }
}
