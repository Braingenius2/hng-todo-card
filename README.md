# HNG Todo Card - Stage 0 Task

A clean, high-fidelity Task Card component built with React and Tailwind CSS for the HNG Internship Frontend Stage 0.

## Live URL

https://braingenius2.github.io/hng-todo-card/

## Features

- **Testable Components** - All elements have `data-testid` attributes for automated testing
- **Semantic HTML** - Uses proper HTML5 elements (`<article>`, `<h3>`, `<time>`, `<input>`, `<button>`, `<ul>`, `<li>`)
- **Dynamic Time Remaining** - Updates every 30 seconds to show accurate time until due
- **Interactive Checkbox** - Custom styled checkbox with animated checkmark
- **Responsive Design** - Centered card that works on all screen sizes
- **Modern UI** - Polished startup aesthetic with hover effects and smooth transitions

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

## Test IDs

The component includes all required test IDs:

- `test-todo-card` - Card container
- `test-todo-title` - Task title
- `test-todo-description` - Task description
- `test-todo-priority` - Priority badge
- `test-todo-due-date` - Due date display
- `test-todo-time-remaining` - Time remaining display
- `test-todo-status` - Status indicator
- `test-todo-complete-toggle` - Checkbox
- `test-todo-tags` - Categories/tags list
- `test-todo-tag-{tag-name}` - Individual tag (dynamic)
- `test-todo-edit-button` - Edit button
- `test-todo-delete-button` - Delete button

## Design Decisions

1. **Custom Checkbox** - Used `<label>` with CSS peer styling for a better UX instead of default browser checkbox
2. **useMemo for Todo Data** - Wrapped todo object in useMemo to avoid React hooks warnings about impure functions
3. **Separated Helper Functions** - Extracted priority dot class into separate function to avoid nested ternary
4. **Aria Labels** - Added for accessibility on icon-only buttons

## Trade-offs

- Used static demo data instead of props for simplicity in this stage
- Timer updates every 30 seconds as per requirements (could be 60 for less frequent updates)
- Single card only (no list view) to match task requirements

## License

MIT