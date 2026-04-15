import { useState, useEffect, useMemo } from 'react'

function TodoCard() {
  const [completed, setCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('')
  
  const todo = useMemo(() => ({
    title: 'Complete project documentation',
    description: 'Write comprehensive README and technical documentation for the todo app project',
    priority: 'High',
     
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    tags: ['Work', 'Documentation', 'Urgent']
  }), [])

  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date()
      const diff = todo.dueDate - now
      
      if (diff < 0) {
        const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)))
        setTimeRemaining(`Overdue by ${hours} hours`)
        return
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      
      if (days > 0) {
        setTimeRemaining(`Due in ${days} day${days > 1 ? 's' : ''}`)
      } else if (hours > 0) {
        setTimeRemaining(`Due in ${hours} hour${hours > 1 ? 's' : ''}`)
      } else {
        const minutes = Math.floor(diff / (1000 * 60))
        setTimeRemaining(`Due in ${minutes} minutes`)
      }
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 30000)
    
    return () => clearInterval(interval)
  }, [todo.dueDate])

  if (!todo) return null

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityDotClass = (priority) => {
    const p = priority.toLowerCase()
    if (p === 'high') return 'w-1.5 h-1.5 rounded-full bg-red-500'
    if (p === 'medium') return 'w-1.5 h-1.5 rounded-full bg-yellow-500'
    return 'w-1.5 h-1.5 rounded-full bg-green-500'
  }

  const getStatusText = () => completed ? 'Completed' : 'Pending'

  return (
    <article 
      data-testid="test-todo-card"
      className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300 ease-out"
    >
      <div className="p-6">
        {/* Header with Checkbox and Title */}
        <div className="flex items-start gap-4 mb-4 group">
          <div className="relative">
            <input
              type="checkbox"
              id="todo-complete"
              data-testid="test-todo-complete-toggle"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="peer sr-only"
            />
            <label 
              htmlFor="todo-complete" 
              aria-label="Mark task as complete"
              className="flex items-center justify-center w-6 h-6 rounded-md border-2 border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"
            >
              <svg 
                className={`w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ${completed ? 'scale-100' : 'scale-0'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <h3 
              data-testid="test-todo-title"
              className={`text-lg font-bold text-gray-800 transition-all duration-200 ${completed ? 'line-through text-gray-400' : 'group-hover:text-gray-900'}`}
            >
              {todo.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p 
          data-testid="test-todo-description"
          className="text-gray-600 text-sm mb-4 ml-9"
        >
          {todo.description}
        </p>

        {/* Priority Badge */}
        <div className="ml-9 mb-4">
          <span 
            data-testid="test-todo-priority"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getPriorityColor(todo.priority)}`}
          >
            <span className={getPriorityDotClass(todo.priority)}></span>
            {todo.priority}
          </span>
        </div>

        {/* Due Date and Time Remaining */}
        <div className="ml-9 flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <time 
            data-testid="test-todo-due-date"
            dateTime={todo.dueDate.toISOString()}
            className="flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due {formatDate(todo.dueDate)}
          </time>
          <span 
            data-testid="test-todo-time-remaining"
            className="text-blue-600 font-medium"
          >
            {timeRemaining}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="ml-9 mb-4">
          <span 
            data-testid="test-todo-status"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              completed 
                ? 'bg-green-50 text-green-700 ring-1 ring-green-200' 
                : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${completed ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            {getStatusText()}
          </span>
        </div>

        {/* Tags */}
        <ul 
          data-testid="test-todo-tags"
          className="ml-9 flex flex-wrap gap-2"
        >
          {todo.tags.map((tag) => (
            <li 
              key={tag}
              data-testid={`test-todo-tag-${tag.toLowerCase()}`}
              className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors cursor-default"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="ml-9 mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
          <button
            data-testid="test-todo-edit-button"
            aria-label="Edit task"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 transition-all duration-200 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            data-testid="test-todo-delete-button"
            aria-label="Delete task"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:text-red-600 hover:bg-red-50 hover:ring-2 hover:ring-red-200 transition-all duration-200 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default TodoCard