import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => <h1>Pfad des Paradoxons – Web Frontend</h1>

// TypeScript: garantiert, dass das Element existiert (!)
const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(<App />)
