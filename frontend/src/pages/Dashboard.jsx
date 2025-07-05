import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useTasks } from "../hooks/useTasks"
import Button from "../components/ui/Button"
import Modal from "../components/ui/Modal"
import TaskCard from "../components/TaskCard"
import TaskForm from "../components/TaskForm"
import TaskFilters from "../components/TaskFilters"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { tasks, loading, error, filters, createTask, updateTask, deleteTask, toggleTask, updateFilters, clearError } =
    useTasks()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const handleLogout = () => {
    logout()
  }

  const handleCreateTask = async (taskData) => {
    setFormLoading(true)
    try {
      await createTask(taskData)
      setIsCreateModalOpen(false)
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditTask = async (taskData) => {
    setFormLoading(true)
    try {
      await updateTask(editingTask._id, taskData)
      setIsEditModalOpen(false)
      setEditingTask(null)
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId)
      } catch (error) {
        // Error is handled by the hook
      }
    }
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const closeModals = () => {
    setIsCreateModalOpen(false)
    setIsEditModalOpen(false)
    setEditingTask(null)
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const pending = total - completed
    const dueSoon = tasks.filter((task) => task.isDueSoon && !task.completed).length

    return { total, completed, pending, dueSoon }
  }

  const stats = getTaskStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mr-4 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Smart Task Manager
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-gray-700 hidden sm:block font-semibold">
                Welcome, <span className="text-purple-600">{user?.name}</span>! 👋
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover-lift">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover-lift">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover-lift">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover-lift">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Due Soon</p>
                <p className="text-3xl font-bold text-gray-900">{stats.dueSoon}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Task Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Tasks ✨
          </h2>
          <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Task
          </Button>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFiltersChange={updateFilters} onClearFilters={() => updateFilters({})} />

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between">
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
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-100 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No tasks found 📝</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Get started by creating your first task and boost your productivity!
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
              🚀 Create Your First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Task Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={closeModals} title="Create New Task" size="lg">
        <TaskForm onSubmit={handleCreateTask} onCancel={closeModals} loading={formLoading} />
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeModals} title="Edit Task" size="lg">
        <TaskForm task={editingTask} onSubmit={handleEditTask} onCancel={closeModals} loading={formLoading} />
      </Modal>
    </div>
  )
}

export default Dashboard
