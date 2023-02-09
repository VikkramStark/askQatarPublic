import {Link} from 'react-router-dom';
import {useState} from 'react'; 
const UserAnswers = ({answerData}) => {
    console.log("Running Answer Component",answerData) ; 
    return ( 
        <>
            { answerData && answerData.map((answer) => (
                <Link className = 'user-answer-card' to = {`/question/${answer.question_id}`} key = {answer.id} > 
                    <p className = 'answer-question'>{answer.question_text}</p>
                    <div className = 'sep-line'></div> 
                    <h2>{answer.text}</h2>
                </Link>
            ))}
        </>
    );
}
 
export default UserAnswers;