import React, { useEffect, useState } from 'react'
import GlossaryCard from './GlossaryCard.jsx'

function GlossaryApp() {
  const [termOfDay, setTermOfDay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/glossary_terms')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить термины')
        }
        return response.json()
      })
      .then((data) => {
        const sorted = [...data].sort((a, b) => a.term.localeCompare(b.term))

        setTermOfDay(sorted[0])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Загрузка термина...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!termOfDay) {
    return <p>Термин не найден</p>
  }

  return (
    <div className="glossary_app">
      <h2 className="glossary_title">Термин дня</h2>

      <GlossaryCard
        term={termOfDay.term}
        definition={termOfDay.definition}
        category={termOfDay.category}
      />

      <div className="glossary_actions">
        <a href="/all-glossary.html" className="glossary_button">
          Все термины
        </a>

        <button className="glossary_button glossary_button_secondary">
          Ещё термин
        </button>
      </div>
    </div>
  )
}

export default GlossaryApp
