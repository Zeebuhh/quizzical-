import Question from './components/Question'
import {useState, useEffect} from 'react'
import he from 'he'
import './App.css'

/* TODO 
 - Work out the score and render it onto the screen
 - When restarting the game the function to get the question data needs to be called again
*/ 

function App() {

  const [quizData, setQuizData] = useState([])
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [inQuiz, setInQuiz] = useState(false)
  const [restart, setRestart] = useState(false)
  const [score, setScore] = useState(0)

  function loadQuestions()  {
    fetch("https://opentdb.com/api.php?amount=5&category=11")
      .then(res => {
          if(!res.ok) {
              throw Error("Something went wrong")
          }
          return res.json()
      })
      .then(data => {

          setQuizData(() => {
            const organisedData = data.results.map((question) => (
            {
              ...question,
              question: he.decode(question.question),
              answers: [...question.incorrect_answers, question.correct_answer].sort() }
            ))
          return organisedData
          })

      })
      .catch(err => console.error("Something went wrong", err))
    }

  useEffect(loadQuestions, [restart])
  useEffect(() => {
    if (isSubmitted) {
      calcScore()
    }
  }, [isSubmitted])
  

  const questionElements = quizData.map((question, index) => (
  <Question 
    key={(index + 1) * 10}
    id={(index + 1) * 10}
    questionData={question}
    answerSelected={answers ? answers[(index + 1) * 10] : ""}
    isSubmitted={isSubmitted} 
  />
))

  function formSubmitted(event) {
    event.preventDefault()
    if (restart) {
      setRestart(false)
      setAnswers([])
      setIsSubmitted(false)
      setScore(0)
      return
    }
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    setAnswers(formObject)
    setIsSubmitted(true)
  }

  function calcScore() {
    let newScore = 0
    quizData.forEach((question, index) => {
      if (answers[(index + 1) * 10] == question.correct_answer)
      {
        newScore += 1
      }
    })
      setScore(newScore)
    }
    

  return (
    <>
      {inQuiz ?
      <form onSubmit={formSubmitted}>
        {questionElements}

        {
        isSubmitted ?
        <>
          <button className="submit" onClick={() => setRestart(true)}>Restart</button>
          <h2 className="score">{score} / 5</h2>
        </> :
        <button className="submit">Check answers</button>
        }
      </form> :
      <div className="card">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button onClick={() => setInQuiz(true)}>Start quiz</button>
      </div>}
    </>
  )
}

export default App