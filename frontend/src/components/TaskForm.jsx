
import { useState, useEffect } from "react"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Select from "./ui/Select"
import { formatDateForInput } from "../utils/dateUtils"

const TaskForm = ({ task, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Work",
    deadline: "",
  })
  const [errors, setErrors] = useState({})

  const categoryOptions = [
    { value: "Work", label: "💼 Work" },
    { value: "Personal", label: "🏠 Personal" },
    { value: "Learning", label: "📚 Learning" },
    { value: "Other", label: "📝 Other" },
  ]

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "Work",
        deadline: task.deadline ? formatDateForInput(task.deadline) : "",
      })
    }
  }, [task])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must be 100 characters or less"
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be 500 characters or less"
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (deadlineDate < today) {
        newErrors.deadline = "Deadline cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
    }

    if (formData.deadline) {
      submitData.deadline = new Date(formData.deadline).toISOString()
    }

    try {
      await onSubmit(submitData)
    } catch (error) {
      // Error handling is done in the parent component
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <Input
        label="✨ Task Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="What needs to be done?"
        maxLength={100}
        required
      />

      <div className="space-y-3">
        <label className="block text-sm font-bold text-gray-800 tracking-wide">📝 Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add more details about your task..."
          maxLength={500}
          rows={4}
          className={`
            w-full px-5 py-4 rounded-2xl border-2 border-gray-200 
            focus:border-purple-500 focus:ring-4 focus:ring-purple-100 
            transition-all duration-300 outline-none
            placeholder-gray-400 text-gray-900 resize-none font-medium
            hover:border-purple-300 hover:shadow-md
            ${errors.description ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}
          `}
        />
        {errors.description && (
          <div className="flex items-center space-x-2 text-red-600 animate-pulse">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-semibold">{errors.description}</p>
          </div>
        )}
        <div className="text-right">
          <span
            className={`text-sm font-medium ${formData.description.length > 400 ? "text-red-500" : "text-gray-500"}`}
          >
            {formData.description.length}/500
          </span>
        </div>
      </div>

      <Select
        label="🏷️ Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={categoryOptions}
        error={errors.category}
      />

      <Input
        label="📅 Deadline (Optional)"
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        error={errors.deadline}
        min={new Date().toISOString().split("T")[0]}
      />

      <div className="flex justify-end space-x-4 pt-6">
        <Button type="button" variant="secondary" onClick={onCancel} size="lg">
          Cancel
        </Button>
        <Button type="submit" loading={loading} size="lg">
          {task ? "✨ Update Task" : "🚀 Create Task"}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
