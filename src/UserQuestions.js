import {Link} from 'react-router-dom'; 
const UserQuestions = ({questions}) => { 
    return ( 
        <>
        {questions.map(question => (
            <Link to = {`/question/${question.id}`} className = 'user-question-card' key = {question.id} >  
                <h2>{question.text}</h2>
            </Link>
        ))}
        </>
    );
}
 
export default UserQuestions;