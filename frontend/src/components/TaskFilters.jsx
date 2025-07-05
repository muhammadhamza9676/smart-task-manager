
import { useState } from "react"
import Button from "./ui/Button"
import Select from "./ui/Select"

const TaskFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const categoryOptions = [
    { value: "", label: "🌟 All Categories" },
    { value: "Work", label: "💼 Work" },
    { value: "Personal", label: "🏠 Personal" },
    { value: "Learning", label: "📚 Learning" },
    { value: "Other", label: "📝 Other" },
  ]

  const dueDateOptions = [
    { value: "", label: "📋 All Tasks" },
    { value: "today", label: "⚡ Due Today" },
    { value: "tomorrow", label: "🌅 Due Tomorrow" },
    { value: "week", label: "📅 Due This Week" },
    { value: "overdue", label: "🚨 Overdue" },
  ]

  const handleFilterChange = (name, value) => {
    const newFilters = { ...localFilters, [name]: value }
    setLocalFilters(newFilters)

    // Create clean filters object
    const processedFilters = {}

    // Add category filter if it exists
    if (newFilters.category) {
      processedFilters.category = newFilters.category
    }

    // Add date filter only if it's not "All Tasks" (empty value)
    if (newFilters.dueDate && newFilters.dueDate !== "") {
      if (newFilters.dueDate === "today") {
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        processedFilters.dueBefore = today.toISOString()
      } else if (newFilters.dueDate === "tomorrow") {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(23, 59, 59, 999)
        processedFilters.dueBefore = tomorrow.toISOString()
      } else if (newFilters.dueDate === "week") {
        const weekFromNow = new Date()
        weekFromNow.setDate(weekFromNow.getDate() + 7)
        weekFromNow.setHours(23, 59, 59, 999)
        processedFilters.dueBefore = weekFromNow.toISOString()
      } else if (newFilters.dueDate === "overdue") {
        const now = new Date()
        processedFilters.dueBefore = now.toISOString()
      }
    }

    onFiltersChange(processedFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = { category: "", dueDate: "" }
    setLocalFilters(clearedFilters)
    onClearFilters()
  }

  const hasActiveFilters = localFilters.category || localFilters.dueDate

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8 hover-lift">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Select
            label="🎯 Filter by Category"
            value={localFilters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            options={categoryOptions}
          />

          <Select
            label="⏰ Filter by Due Date"
            value={localFilters.dueDate || ""}
            onChange={(e) => handleFilterChange("dueDate", e.target.value)}
            options={dueDateOptions}
          />
        </div>

        {hasActiveFilters && (
          <Button variant="outline" onClick={handleClearFilters} className="whitespace-nowrap bg-transparent" size="lg">
            🧹 Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-6 flex flex-wrap gap-3">
          {localFilters.category && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-all duration-200">
              Category: {localFilters.category}
              <button
                onClick={() => handleFilterChange("category", "")}
                className="ml-2 text-white hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-all duration-200"
              >
                ✕
              </button>
            </span>
          )}

          {localFilters.dueDate && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-200">
              {dueDateOptions.find((opt) => opt.value === localFilters.dueDate)?.label}
              <button
                onClick={() => handleFilterChange("dueDate", "")}
                className="ml-2 text-white hover:text-gray-200 cursor-pointer transform hover:scale-110 transition-all duration-200"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskFilters
