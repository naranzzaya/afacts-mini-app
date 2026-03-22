import React, { useEffect, useState } from 'react'
import GlossaryCard from './GlossaryCard.jsx'

function GlossaryApp() {
  const [terms, setTerms] = useState([])
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
        setTerms(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Загрузка глоссария...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="glossary_app">
      <h2 className="glossary_title">Глоссарий</h2>

      <div className="glossary_list">
        {terms.map((term) => (
          <GlossaryCard
            key={term.id}
            term={term.term}
            definition={term.definition}
            category={term.category}
          />
        ))}
      </div>
    </div>
  )
}

export default GlossaryApp
