
import { useState } from "react"
import { formatDate, isDueSoon, isOverdue } from "../utils/dateUtils"

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await onToggle(task._id)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryStyle = (category) => {
    const styles = {
      Work: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30",
      Personal: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30",
      Learning: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30",
      Other: "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/30",
    }
    return styles[category] || styles.Other
  }

  const getDeadlineStatus = () => {
    if (!task.deadline) return null

    if (isOverdue(task.deadline)) {
      return {
        text: "OVERDUE",
        className:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/40 animate-pulse-slow",
        cardGlow: "shadow-glow-pink",
      }
    }

    if (isDueSoon(task.deadline)) {
      return {
        text: "DUE SOON",
        className:
          "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/40 animate-bounce-subtle",
        cardGlow: "due-soon-glow",
      }
    }

    return null
  }

  const deadlineStatus = getDeadlineStatus()

  return (
    <div
      className={`
        bg-white rounded-3xl shadow-lg border-2 transition-all duration-300 hover-lift cursor-pointer
        ${
          task.completed
            ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
            : deadlineStatus?.cardGlow
              ? `border-pink-300 ${deadlineStatus.cardGlow}`
              : "border-gray-200 hover:border-purple-300 hover:shadow-purple-500/10"
        }
      `}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4 flex-1">
            {/* Custom Checkbox */}
            <button
              onClick={handleToggle}
              disabled={isLoading}
              className={`
                mt-1 w-7 h-7 rounded-xl border-3 flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110
                ${
                  task.completed
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg shadow-green-500/30"
                    : "border-gray-300 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md"
                } 
                ${isLoading ? "opacity-50 cursor-not-allowed animate-pulse" : ""}
              `}
            >
              {task.completed && (
                <svg className="w-4 h-4 font-bold" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold text-xl mb-3 leading-tight ${
                  task.completed ? "text-gray-500 line-through" : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className={`text-base mb-4 leading-relaxed ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                  {task.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${getCategoryStyle(task.category)} transform hover:scale-105 transition-all duration-200`}
                >
                  {task.category}
                </span>

                {deadlineStatus && (
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${deadlineStatus.className} transform hover:scale-105 transition-all duration-200`}
                  >
                    {deadlineStatus.text}
                  </span>
                )}
              </div>

              {/* Deadline */}
              {task.deadline && (
                <div className="flex items-center text-base text-gray-600 font-medium">
                  <div className="p-2 rounded-lg bg-purple-100 mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  Due {formatDate(task.deadline)}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 ml-6">
            <button
              onClick={() => onEdit(task)}
              className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 cursor-pointer transform hover:scale-110"
              title="Edit task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer transform hover:scale-110"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
