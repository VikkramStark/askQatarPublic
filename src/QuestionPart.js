import {Link} from 'react-router-dom'; 
const QuestionPart = ({question}) => {
    return ( 
        <div className = 'question-part'> 
                <div className="question-text">
                    <p>{question.text}</p>
                    <div className = 'user-details'>
                        <Link to = {`/user/${question.user_id}`}><p> - {question.user_name}</p></Link> 
                    </div>
                </div>
        </div>
    );
}
 
export default QuestionPart;