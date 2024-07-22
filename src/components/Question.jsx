import Answers from './Answers'
import { useState } from 'react'

export default function Question(props) {

    //const [selectedAnswer, setSelectedAnswer] = useState()

    // if (props.selectedAnswer) {
    //     console.log(props.selectedAnswer)
    //     if (props.selectedAnswer === props.questionData.correct_answer)
    //     {
    //         setSelectedAnswer(true)
    //     }
    // }

    const answerElements = props.questionData.answers.map((answer, index) => <Answers key={props.id + index + 1} 
        id={props.id + index + 1} name={props.id} value={answer} correctAnswer={props.questionData.correct_answer} 
        isSelected={props.answerSelected === answer ? true : false} isSubmitted={props.isSubmitted} />
    
    )

    console.log(`Answer selected: ${props.answerSelected}`)

    return (
        <>
            <h2>{props.questionData.question}</h2>
            <div className="answers">
                {answerElements}
            </div>
        </>
    )
} 