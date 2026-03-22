import React from 'react'
import { createRoot } from 'react-dom/client'
import GlossaryApp from './GlossaryApp.jsx'

const rootElement = document.getElementById('glossary-root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<GlossaryApp />)
}
