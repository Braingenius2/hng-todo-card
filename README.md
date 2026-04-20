# HNG Todo Card - Stage 1A Task

A clean, high-fidelity Task Card component built with React and Tailwind CSS for the HNG Internship Frontend Stage 1A.

## Live URL

(Will be available after GitHub Pages deployment)

## What Changed from Stage 0

### New Features Added

1. **Edit Mode** - Click Edit to enter edit mode with form inputs:
   - Title input
   - Description textarea
   - Priority dropdown
   - Due date picker
   - Save and Cancel buttons

2. **Status Control** - Changed from static display to interactive segmented control:
   - Pending
   - In Progress
   - Done

3. **Priority Indicator Enhancement**:
   - Left border accent changes based on priority level
   - Colored dot indicator

4. **Expand/Collapse Behavior**:
   - Long descriptions (>100 chars) collapse by default
   - "Show more"/"Show less" toggle button
   - Keyboard accessible

5. **Time Management Enhancements**:
   - More granular time display (days, hours, minutes)
   - Explicit "Overdue" indicator with warning badge
   - Timer stops when status is "Done"

6. **Status Sync**:
   - Checkbox toggling changes status to "Done"
   - Setting status to "Done" checks the checkbox
   - Unchecking returns status to "Pending"

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- gh-pages (deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Braingenius2/hng-todo-card.git
cd hng-todo-card

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Test IDs

All Stage 0 test IDs (Must exist):

| Test ID | Element |
|--------|---------|
| `test-todo-card` | Card container |
| `test-todo-title` | Task title |
| `test-todo-description` | Task description |
| `test-todo-priority` | Priority badge |
| `test-todo-due-date` | Due date display |
| `test-todo-time-remaining` | Time remaining display |
| `test-todo-status` | Status indicator |
| `test-todo-complete-toggle` | Checkbox |
| `test-todo-tags` | Categories/tags list |
| `test-todo-tag-{tag-name}` | Individual tag (dynamic) |
| `test-todo-edit-button` | Edit button |
| `test-todo-delete-button` | Delete button |

New Stage 1A Test IDs:

| Test ID | Element |
|--------|---------|
| `test-todo-edit-form` | Edit form container |
| `test-todo-edit-title-input` | Title input in edit mode |
| `test-todo-edit-description-input` | Description textarea |
| `test-todo-edit-priority-select` | Priority dropdown |
| `test-todo-edit-due-date-input` | Due date picker |
| `test-todo-save-button` | Save button |
| `test-todo-cancel-button` | Cancel button |
| `test-todo-status-control` | Status segmented control |
| `test-todo-priority-indicator` | Priority dot indicator |
| `test-todo-expand-toggle` | Expand/collapse button |
| `test-todo-collapsible-section` | Collapsible container |
| `test-todo-overdue-indicator` | Overdue warning badge |

## Design Decisions

1. **Editable State** - Used local component state instead of props for simplicity
2. **Segmented Status Control** - Used button group instead of dropdown for faster access
3. **Left Border Priority** - Visual indicator matches priority color
4. **Expand/Collapse** - Uses button toggle, keyboard accessible
5. **Time Granularity** - Shows appropriate unit (days/hours/minutes)
6. **Focus Management** - Returns focus to Edit button after save/cancel

## Known Limitations

- No data persistence (resets on refresh)
- No form validation
- No delete confirmation
- Focus trap not implemented in edit mode

## Project Structure

```
hng-todo-card/
├── src/
│   ├── components/
│   │   └── TodoCard.jsx    # Main todo card component
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## License

MIT