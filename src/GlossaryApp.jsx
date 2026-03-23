import React, { useEffect, useState } from 'react'
import GlossaryCard from './GlossaryCard.jsx'

function GlossaryApp() {
  const [terms, setTerms] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [view, setView] = useState('daily')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

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
        setTerms(sorted)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function handleNextTerm() {
    if (terms.length === 0) return

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      return nextIndex >= terms.length ? 0 : nextIndex
    })
  }

  const categories = ['all', ...new Set(terms.map((term) => term.category))]

  const filteredTerms = terms.filter((term) => {
    const matchesSearch = term.term
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === 'all' || term.category === activeCategory

    return matchesSearch && matchesCategory
  })
  if (loading) {
    return <p>Загрузка термина...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (terms.length === 0) {
    return <p>Термин не найден</p>
  }

  const currentTerm = terms[currentIndex]

  return (
    <div
      className={`glossary_app ${
        view === 'daily' ? 'glossary_app_daily' : 'glossary_app_all'
      }`}
    >
      {view === 'daily' ? (
        <>
          <h2 className="glossary_title">Термин дня</h2>

          <GlossaryCard
            term={currentTerm.term}
            definition={currentTerm.definition}
            category={currentTerm.category}
          />

          <div className="glossary_actions">
            <button
              className="glossary_button_secondary"
              onClick={() => setView('all')}
            >
              Все термины
            </button>

            <button className="glossary_button" onClick={handleNextTerm}>
              Ещё термин
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="glossary_header">
            <h2 className="glossary_title glossary_title_all">Глоссарий</h2>

            <input
              className="glossary_search"
              type="text"
              placeholder="Поиск термина"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="glossary_toolbar">
            <div className="glossary_filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`glossary_filter_button ${
                    activeCategory === category
                      ? 'glossary_filter_button_active'
                      : ''
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'Все' : category}
                </button>
              ))}
            </div>
            <button
              className="glossary_button_secondary"
              onClick={() => setView('daily')}
            >
              Назад к термину дня
            </button>
          </div>
          <div className="glossary_list glossary_list_all">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => (
                <div className="glossary_row" key={term.id}>
                  <div className="glossary_card_term">{term.term}</div>
                  <div className="glossary_card_definition">
                    {term.definition}
                  </div>
                  <div className="glossary_card_category">{term.category}</div>
                </div>
              ))
            ) : (
              <p className="glossary_empty">Ничего не найдено</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default GlossaryApp
