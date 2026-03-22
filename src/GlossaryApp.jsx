// import React, { useEffect, useState } from 'react'
// import GlossaryCard from './GlossaryCard.jsx'

// function GlossaryApp() {
//   const [terms, setTerms] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     fetch('http://localhost:3000/api/v1/glossary_terms')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Не удалось загрузить термины')
//         }
//         return response.json()
//       })
//       .then((data) => {
//         const sorted = [...data].sort((a, b) => a.term.localeCompare(b.term))
//         setTerms(sorted)
//         setLoading(false)
//       })
//       .catch((err) => {
//         setError(err.message)
//         setLoading(false)
//       })
//   }, [])

//   function handleNextTerm() {
//     if (terms.length === 0) return

//     const randomIndex = Math.floor(Math.random() * terms.length)
//     setCurrentIndex(randomIndex)
//   }

//   if (loading) {
//     return <p>Загрузка термина...</p>
//   }

//   if (error) {
//     return <p>{error}</p>
//   }

//   if (terms.length === 0) {
//     return <p>Термин не найден</p>
//   }

//   const currentTerm = terms[currentIndex]

//   return (
//     <div className="glossary_app">
//       <h2 className="glossary_title">Термин дня</h2>

//       <GlossaryCard
//         term={currentTerm.term}
//         definition={currentTerm.definition}
//         category={currentTerm.category}
//       />

//       <div className="glossary_actions">
//         <a href="/all-glossary.html" className="glossary_button_secondary">
//           Все термины
//         </a>

//         <button className="glossary_button" onClick={handleNextTerm}>
//           Ещё термин
//         </button>
//       </div>
//     </div>
//   )
// }

// export default GlossaryApp

import React, { useEffect, useState } from 'react'
import GlossaryCard from './GlossaryCard.jsx'

function GlossaryApp() {
  const [terms, setTerms] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [view, setView] = useState('daily')
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
    <div className="glossary_app">
      <h2 className="glossary_title">
        {view === 'daily' ? 'Термин дня' : 'Все термины'}
      </h2>

      {view === 'daily' ? (
        <>
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

          <div className="glossary_actions">
            <button
              className="glossary_button"
              onClick={() => setView('daily')}
            >
              Назад к термину дня
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default GlossaryApp
