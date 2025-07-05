export const formatDate = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays === -1) return "Yesterday"
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })
}

export const isDueSoon = (dateString) => {
  if (!dateString) return false

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffHours = diffTime / (1000 * 60 * 60)

  return diffHours <= 24 && diffHours >= 0
}

export const isOverdue = (dateString) => {
  if (!dateString) return false

  const date = new Date(dateString)
  const now = new Date()

  return date < now
}

export const formatDateForInput = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  return date.toISOString().split("T")[0]
}
