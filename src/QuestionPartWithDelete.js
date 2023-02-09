import {Link} from 'react-router-dom'; 
const QuestionPartWithDelete = ({deleteQuestion,question}) => { 
    return ( 
        <div className = 'question-part'> 
            <div className="question-text">
                <p>{question.text}</p>
                    <div className = 'user-details'>
                        <Link to = {`/user/${question.user_id}`}><p> - {question.user_name}</p></Link>     
                                <button type = 'button'  onClick = {deleteQuestion}>  
                                    Delete Question
                                </button> 
                            </div>
                        </div>
                    </div>
    );
}
 
export default QuestionPartWithDelete; 