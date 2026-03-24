import React, { useEffect, useState } from 'react'

function QuizListApp({ onSelectQuiz, onBackToDaily }) {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/quizzes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить квизы')
        }
        return response.json()
      })
      .then((data) => {
        setQuizzes(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const categories = ['all', 'базовый', 'средний', 'сложный']
  const filteredQuizzes = quizzes.filter((quiz) => {
    return activeCategory === 'all' || quiz.category === activeCategory
  })

  if (loading) return <p>Загрузка квизов...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="quiz_list_app quiz_app_all">
      <h2 className="quiz_title">Все квизы</h2>

      <div className="quiz_toolbar">
        <div className="quiz_filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`quiz_filter_button ${
                activeCategory === category ? 'quiz_filter_button_active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'Все' : category}
            </button>
          ))}
        </div>
        <button className="quiz_button_secondary" onClick={onBackToDaily}>
          Назад к квизу дня
        </button>
      </div>

      <div className="quiz_list">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="quiz_list_card"
            onClick={() => onSelectQuiz(quiz.id)}
          >
            <div className="quiz_list_card_title">{quiz.title}</div>
            <div className="quiz_list_card_description">{quiz.description}</div>
            <div className="quiz_list_card_category">{quiz.category}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizListApp
