import React, { useEffect, useState } from 'react'
import QuizListApp from './QuizListApp.jsx'

function QuizApp() {
  const [view, setView] = useState('daily')
  const [dailyQuiz, setDailyQuiz] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [questions, setQuestions] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

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
        if (data.length > 0) {
          loadQuizById(data[0].id, true)
        } else {
          setLoading(false)
        }
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function loadQuizById(id, isDaily = false) {
    setLoading(true)

    fetch(`http://localhost:3000/api/v1/quizzes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить квиз')
        }
        return response.json()
      })
      .then((data) => {
        if (isDaily) {
          setDailyQuiz(data)
          setView('daily')
        } else {
          setSelectedQuiz(data)
          setView('quiz')
        }

        setQuestions(data.quiz_questions || [])
        resetQuizState()
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  function resetQuizState() {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setIsFinished(false)
  }

  function handleAnswerClick(answerKey) {
    if (showResult) return

    setSelectedAnswer(answerKey)
    setShowResult(true)

    if (answerKey === questions[currentIndex].correct_answer) {
      setScore((prev) => prev + 1)
    }
  }

  function handleNextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true)
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  if (loading) return <p>Загрузка квиза...</p>
  if (error) return <p>{error}</p>
  if (questions.length === 0) return <p>Вопросы не найдены</p>

  const currentQuestion = questions[currentIndex]

  const answers = currentQuestion
    ? [
        { key: 'a', text: currentQuestion.option_a },
        { key: 'b', text: currentQuestion.option_b },
        { key: 'c', text: currentQuestion.option_c },
        { key: 'd', text: currentQuestion.option_d }
      ]
    : []

  if (view === 'all') {
    return (
      <QuizListApp
        onSelectQuiz={(id) => loadQuizById(id, false)}
        onBackToDaily={() => {
          if (dailyQuiz) {
            setQuestions(dailyQuiz.quiz_questions || [])
            resetQuizState()
            setView('daily')
          }
        }}
      />
    )
  }

  if (isFinished) {
    return (
      <div className="quiz_app quiz_app_daily">
        <h2 className="quiz_title">
          {view === 'daily' ? 'Квиз дня завершён' : 'Квиз завершён'}
        </h2>

        <p className="quiz_result_text">
          Ваш результат: {score} из {questions.length}
        </p>

        <div className="quiz_actions">
          <button className="quiz_button" onClick={resetQuizState}>
            Пройти заново
          </button>

          <button
            className="quiz_button_secondary"
            onClick={() => setView('all')}
          >
            Все квизы
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz_app quiz_app_daily">
      <h2 className="quiz_title">
        {view === 'daily'
          ? `Квиз дня: ${dailyQuiz?.title || ''}`
          : selectedQuiz?.title}
      </h2>

      <div className="quiz_progress">
        Вопрос {currentIndex + 1} из {questions.length}
      </div>

      <div className="quiz_question_card">
        <div className="quiz_question">{currentQuestion.question}</div>

        <div className="quiz_answers">
          {answers.map((answer) => {
            let buttonClass = 'quiz_answer'

            if (showResult && answer.key === currentQuestion.correct_answer) {
              buttonClass += ' quiz_answer_correct'
            } else if (
              showResult &&
              answer.key === selectedAnswer &&
              answer.key !== currentQuestion.correct_answer
            ) {
              buttonClass += ' quiz_answer_wrong'
            }

            return (
              <button
                key={answer.key}
                className={buttonClass}
                onClick={() => handleAnswerClick(answer.key)}
              >
                {answer.text}
              </button>
            )
          })}
        </div>
      </div>
      <div className="quiz_actions">
        <button
          className="quiz_button_secondary"
          onClick={() => setView('all')}
        >
          Все квизы
        </button>

        <button
          className="quiz_button"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          Следующий вопрос
        </button>
      </div>
    </div>
  )
}

export default QuizApp
