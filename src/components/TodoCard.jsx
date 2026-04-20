import { useState, useEffect, useMemo, useRef } from 'react'

function TodoCard() {
  const [editMode, setEditMode] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState('Pending')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [isOverdue, setIsOverdue] = useState(false)
  
  const [todoData, setTodoData] = useState({
    title: 'Complete project documentation',
    description: 'Write comprehensive README and technical documentation for the todo app project. This includes all the setup instructions, dependencies, and usage examples that will help users get started quickly.',
    priority: 'High',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    tags: ['Work', 'Documentation', 'Urgent']
  })
  
  const [editForm, setEditForm] = useState({})
  
  const saveButtonRef = useRef(null)
  const cancelButtonRef = useRef(null)
  const titleInputRef = useRef(null)

  const isCompleted = status === 'Done'
  const isLongDescription = todoData.description.length > 100

  useEffect(() => {
    const updateTimeRemaining = () => {
      if (status === 'Done') {
        setTimeRemaining('Completed')
        setIsOverdue(false)
        return
      }
      
      const now = new Date()
      const diff = todoData.dueDate - now
      
      if (diff < 0) {
        setIsOverdue(true)
        const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)))
        const days = Math.floor(hours / 24)
        const remainingHours = hours % 24
        
        if (days > 0) {
          setTimeRemaining(`Overdue by ${days} day${days > 1 ? 's' : ''}, ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`)
        } else if (hours > 0) {
          setTimeRemaining(`Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`)
        } else {
          const minutes = Math.abs(Math.floor(diff / (1000 * 60)))
          setTimeRemaining(`Overdue by ${minutes} minute${minutes !== 1 ? 's' : ''}`)
        }
        return
      }
      
      setIsOverdue(false)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      
      if (days > 0) {
        setTimeRemaining(`Due in ${days} day${days > 1 ? 's' : ''}`)
      } else if (hours > 0) {
        setTimeRemaining(`Due in ${hours} hour${hours > 1 ? 's' : ''}`)
      } else {
        const minutes = Math.floor(diff / (1000 * 60))
        setTimeRemaining(`Due in ${minutes} minute${minutes !== 1 ? 's' : ''}`)
      }
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 30000)
    
    return () => clearInterval(interval)
  }, [todoData.dueDate, status])

  useEffect(() => {
    if (editMode && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [editMode])

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const formatDateTimeForInput = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
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
    if (p === 'high') return 'w-2 h-2 rounded-full bg-red-500'
    if (p === 'medium') return 'w-2 h-2 rounded-full bg-yellow-500'
    return 'w-2 h-2 rounded-full bg-green-500'
  }

  const getPriorityBorderClass = (priority) => {
    const p = priority.toLowerCase()
    if (p === 'high') return 'border-l-4 border-l-red-500'
    if (p === 'medium') return 'border-l-4 border-l-yellow-500'
    return 'border-l-4 border-l-green-500'
  }

  const getStatusStyle = () => {
    switch (status) {
      case 'Done': return 'bg-green-50 text-green-700 ring-1 ring-green-200'
      case 'In Progress': return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
      default: return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
    }
  }

  const getStatusDotClass = () => {
    switch (status) {
      case 'Done': return 'bg-green-500'
      case 'In Progress': return 'bg-blue-500 animate-pulse'
      default: return 'bg-amber-500 animate-pulse'
    }
  }

  const handleEnterEditMode = () => {
    setEditForm({
      title: todoData.title,
      description: todoData.description,
      priority: todoData.priority,
      dueDate: formatDateTimeForInput(todoData.dueDate)
    })
    setEditMode(true)
  }

  const handleSave = () => {
    setTodoData({
      ...todoData,
      title: editForm.title,
      description: editForm.description,
      priority: editForm.priority,
      dueDate: new Date(editForm.dueDate)
    })
    setEditMode(false)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    if (newStatus === 'Done') {
      setIsOverdue(false)
    }
  }

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked
    if (checked) {
      setStatus('Done')
    } else {
      setStatus('Pending')
    }
  }

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  if (editMode) {
    return (
      <article 
        data-testid="test-todo-card"
        className={`w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${getPriorityBorderClass(todoData.priority)}`}
      >
        <form 
          data-testid="test-todo-edit-form"
          className="p-6 space-y-4"
          onSubmit={(e) => { e.preventDefault(); handleSave() }}
        >
          <h3 className="text-lg font-bold text-gray-800">Edit Task</h3>
          
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              id="edit-title"
              ref={titleInputRef}
              type="text"
              data-testid="test-todo-edit-title-input"
              value={editForm.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="edit-description"
              data-testid="test-todo-edit-description-input"
              value={editForm.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                id="edit-priority"
                data-testid="test-todo-edit-priority-select"
                value={editForm.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="edit-due-date" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                id="edit-due-date"
                type="datetime-local"
                data-testid="test-todo-edit-due-date-input"
                value={editForm.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              ref={cancelButtonRef}
              data-testid="test-todo-cancel-button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              ref={saveButtonRef}
              data-testid="test-todo-save-button"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </article>
    )
  }

  return (
    <article 
      data-testid="test-todo-card"
      className={`w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300 ease-out ${getPriorityBorderClass(todoData.priority)} ${isCompleted ? 'opacity-75' : ''}`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4 group">
          <div className="relative">
            <input
              type="checkbox"
              id="todo-complete"
              data-testid="test-todo-complete-toggle"
              checked={isCompleted}
              onChange={handleCheckboxChange}
              className="peer sr-only"
            />
            <label 
              htmlFor="todo-complete" 
              aria-label="Mark task as complete"
              className="flex items-center justify-center w-6 h-6 rounded-md border-2 border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"
            >
              <svg 
                className={`w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ${isCompleted ? 'scale-100' : 'scale-0'}`} 
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
              className={`text-lg font-bold text-gray-800 transition-all duration-200 ${isCompleted ? 'line-through text-gray-400' : 'group-hover:text-gray-900'}`}
            >
              {todoData.title}
            </h3>
          </div>
        </div>

        <div className="ml-9 mb-3">
          <span 
            data-testid="test-todo-priority"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getPriorityColor(todoData.priority)}`}
          >
            <span 
              data-testid="test-todo-priority-indicator"
              className={getPriorityDotClass(todoData.priority)}
            ></span>
            {todoData.priority}
          </span>
        </div>

        <div className="ml-9 mb-4">
          {isLongDescription && !expanded ? (
            <>
              <p 
                data-testid="test-todo-description"
                className="text-gray-600 text-sm mb-2 line-clamp-2"
              >
                {todoData.description.substring(0, 100)}...
              </p>
              <button
                type="button"
                data-testid="test-todo-expand-toggle"
                onClick={() => setExpanded(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Show more
              </button>
            </>
          ) : (
            <>
              <div data-testid="test-todo-collapsible-section">
                <p 
                  data-testid="test-todo-description"
                  className="text-gray-600 text-sm mb-2"
                >
                  {todoData.description}
                </p>
              </div>
              {isLongDescription && expanded && (
                <button
                  type="button"
                  data-testid="test-todo-expand-toggle"
                  onClick={() => setExpanded(false)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Show less
                </button>
              )}
            </>
          )}
        </div>

        <div className="ml-9 flex flex-wrap items-center gap-4 text-sm mb-4">
          <time 
            data-testid="test-todo-due-date"
            dateTime={todoData.dueDate.toISOString()}
            className="flex items-center gap-1 text-gray-500"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due {formatDate(todoData.dueDate)}
          </time>
          <span 
            data-testid="test-todo-time-remaining"
            className={`font-medium ${isOverdue ? 'text-red-600' : 'text-blue-600'}`}
          >
            {timeRemaining}
          </span>
          {isOverdue && (
            <span 
              data-testid="test-todo-overdue-indicator"
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Overdue
            </span>
          )}
        </div>

        <div className="ml-9 mb-4">
          <div 
            data-testid="test-todo-status-control"
            className="inline-flex rounded-lg overflow-hidden border border-gray-200"
            role="radiogroup"
            aria-label="Task status"
          >
            {['Pending', 'In Progress', 'Done'].map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={status === s}
                onClick={() => handleStatusChange(s)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  status === s 
                    ? s === 'Done' ? 'bg-green-500 text-white' : s === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-9 mb-4">
          <span 
            data-testid="test-todo-status"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle()}`}
          >
            <span className={`w-2 h-2 rounded-full ${getStatusDotClass()}`}></span>
            {status}
          </span>
        </div>

        <ul 
          data-testid="test-todo-tags"
          className="ml-9 flex flex-wrap gap-2"
        >
          {todoData.tags.map((tag) => (
            <li 
              key={tag}
              data-testid={`test-todo-tag-${tag.toLowerCase()}`}
              className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="ml-9 mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
          <button
            type="button"
            data-testid="test-todo-edit-button"
            aria-label="Edit task"
            onClick={handleEnterEditMode}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 transition-all duration-200 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            type="button"
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