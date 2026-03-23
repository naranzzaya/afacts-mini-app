import React, { useEffect, useState } from 'react'

function QuizListApp({ onSelectQuiz }) {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (loading) return <p>Загрузка квизов...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="quiz_list_app">
      <h2 className="quiz_title">Все квизы</h2>

      <div className="quiz_list">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="quiz_card"
            onClick={() => onSelectQuiz(quiz.id)}
          >
            <div className="quiz_card_title">{quiz.title}</div>
            <div className="quiz_card_description">{quiz.description}</div>
            <div className="quiz_card_category">{quiz.category}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizListApp
