import {auth , db} from './firebase-config'; 
import {deleteDoc , doc , collection} from 'firebase/firestore'; 
import {Link} from 'react-router-dom'; 


const AnswerPart = ({answers , deleteAnswer}) => { 

    var answerCollection = collection(db,"answers"); 

    return ( 
        <>
        {answers.map(answer => (
            <div className="answer-card" key = {answer.id}> 
                <h3 className = 'answer-text'>{answer.text}</h3>
                <div className = 'user-details'>
                    <Link to = {`/user/${answer.user_id}`}><p>-{answer.user_name}</p></Link>
                    {(answer.user_id == auth?.currentUser?.uid) &&
                        <button type = 'button' className = 'answer-delete' onClick = {() =>{deleteAnswer(answer.id)}}>Delete Answer</button> 
                    }
                </div>
            </div>
        ))}
        </>
    );
}
 
export default AnswerPart;