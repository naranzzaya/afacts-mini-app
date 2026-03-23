import React from 'react'
import { createRoot } from 'react-dom/client'
import GlossaryApp from './GlossaryApp.jsx'
import QuizApp from './QuizApp.jsx'

const glossaryRoot = document.getElementById('glossary-root')
const quizRoot = document.getElementById('quiz-root')

if (glossaryRoot) {
  const root = createRoot(glossaryRoot)
  root.render(<GlossaryApp />)
}

if (quizRoot) {
  const root = createRoot(quizRoot)
  root.render(<QuizApp />)
}
