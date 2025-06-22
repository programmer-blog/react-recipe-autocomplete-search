# React Recipe Autocomplete Search

A production-ready recipe search autocomplete component with keyboard navigation, responsive design, and intelligent API caching.

## ✨ Features

### Core Functionality
- Real-time recipe search as you type
- Keyboard navigation (↑/↓ arrows, Enter, Esc)
- Mobile-responsive layout
- Loading indicators during API calls

### Enhanced UX
- Intelligent API debouncing (300ms)
- Proper error handling
- "No results" state display
- Visual feedback for active selections
- Recipe metadata display (cooking time)

### Technical Features
- React hooks (useState, useEffect, useRef)
- CSS transitions and animations
- Clean component architecture
- ESLint-compliant code
- PropTypes validation (recommended addition)

## 🛠 Technologies

| Category        | Technologies Used |
|----------------|------------------|
| Core           | React 18, JavaScript ES6+ |
| Styling        | CSS3, Flexbox, CSS Variables |
| API            | Fetch API, DummyJSON Recipes |
| Development    | Create React App, ESLint |

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm (v7+ recommended)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/programmer-blog/react-recipe-autocomplete-search

# Navigate to project
cd recipe-autocomplete

# Install dependencies
npm install

# Start development server
npm start

The app will open at http://localhost:3000

📂 Project Structure

recipe-autocomplete/
├── src/
│   ├── components/        # (Recommended for expansion)
│   ├── App.js            # Main component
│   ├── App.css           # Component styles
│   ├── index.js          # App entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Project manifest
└── README.md            # Documentation

🔧 Configuration

const API_ENDPOINT = "https://dummyjson.com/recipes/search";
const DEBOUNCE_TIME = 300; // milliseconds
const RESULTS_LIMIT = 5; // Max results to show

🌐 API Usage

The component uses DummyJSON's free recipe API:

    Endpoint: GET https://dummyjson.com/recipes/search?q={query}&limit={limit}

    Returns: Array of recipe objects with:

    `{
        "id": Number,
        "name": String,
        "cookTimeMinutes": Number,
        // ...other recipe properties
    }`
