// Import React library (required for some JSX transforms and to access React APIs)
import React from 'react'
// Import createRoot from the react-dom client entry to mount the React application
import { createRoot } from 'react-dom/client'
// Import the top-level App component which contains the app UI and routing
import App from './App'
// Import global CSS styles for the application
import './index.css'

// Find the DOM node with id "root", create a React root, and render the app into it
createRoot(document.getElementById('root')).render(
  // React.StrictMode enables extra checks and warnings for its children in development
  <React.StrictMode>
    {/* Render the root App component here */}
    <App />
  </React.StrictMode>
)
