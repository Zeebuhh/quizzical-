import he from 'he'

export default function Answers(props) {

    const styles = {
        backgroundColor: props.isSubmitted && props.value == props.correctAnswer ? "#94D7A2" : props.isSelected && props.value != props.correctAnswer ? "#F8BCBC" : "none",
        border: props.isSubmitted && props.value == props.correctAnswer ? "none" : props.isSelected && props.value != props.correctAnswer ? "none" : "1px solid #4D5B9E",
        color: props.isSubmitted && props.value == props.correctAnswer ? "#293264" : props.isSelected && props.value != props.correctAnswer ? "#929ac3" : "#293264"
    }

    console.log(`Is submitted: ${props.isSubmitted}`)
    // if selected and correct = green
    // if not selected but correct = green
    // if selected but wrong = red
    // else: none

    function randomFunc(e) {
        console.log(e.target)
    }

    return (
        <>
            <input className="radio-field" id={props.id} type="radio" defaultChecked={props.isSelected} name={props.name} value={props.value}/>
            <label style={styles} className="radio-label" htmlFor={props.id}>{he.decode(props.value)}</label>
        </>
    )
}