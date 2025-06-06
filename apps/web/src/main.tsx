import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Falls du react-router nutzt:
import { BrowserRouter as Router } from 'react-router-dom'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found!')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
