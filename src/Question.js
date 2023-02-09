import {useState,useEffect} from 'react'; 
import { useParams , useNavigate } from "react-router-dom";

import { doc , collection , getDoc , getDocs ,query, where , deleteDoc , addDoc } from 'firebase/firestore'; 
import { db , auth } from './firebase-config'; 

import './question.css'; 

import QuestionPartWithDelete from './QuestionPartWithDelete';
import QuestionPart from './QuestionPart';
import AnswerPart from './AnswerPart';


const Question = () => {


    const navigate = useNavigate(); 
    var questionCollection = collection(db,"questions");  
    var answerCollection = collection(db,"answers"); 
    const {id} = useParams(); 
    var [question,setQuestion] = useState([]); 
    var questionRef = collection(db,"questions"); 
    var [isLoading , setLoading] = useState(false);  
    var [answer , setAnswer] = useState("");  
    var [isDeletingAnswer , setDeletingAnswer] = useState(false); 

    var [existingAnswers , setExistingAnswers] = useState([]);  

    var userPostedThisQuestion = question.user_id == auth?.currentUser?.uid; 

    useEffect(() =>{
        getQuestion(); 
        getAnswers(); 
    },[]); 


    const getAnswers = async () => { 
        try{
            var data = await getDocs(query(answerCollection , where("question_id","==",id))); 
            var existingAnswers = data.docs.map(doc => ({...doc.data(), id:doc.id }));  
            setExistingAnswers(prev => existingAnswers); 
            console.log(existingAnswers);  
        }catch(err){
            console.log(err.message);  
        }
    }


    const deleteQuestion = async () => {
        try{
            var res = await deleteDoc(doc(db,"questions",id)); 
            if(existingAnswers.length > 0){
                existingAnswers.forEach(async answer =>{
                    await deleteDoc(doc(db,"answers",answer.id)); 
                });  
                console.log("All Associated Answers Deleted!");  
            } 
            console.log(res); 
            /*window.alert('Successfully Deleted'); */
            navigate("/"); 
        }catch(err){
            console.log(err);
            alert(err.message);   
        }
    }

    const deleteAnswer = async (id) =>{
        setDeletingAnswer(true); 
        try{
            await deleteDoc(doc(db,"answers",id)); 
            console.log("Successfully Deleted"); 
            alert("Deleted Answer");  
        }catch(err){
            console.log(err); 
            window.alert(err); 
        }finally{
            setDeletingAnswer(false); 
            navigate(`/`);   
        }
    }

    const postAnswer = async () =>{
        if(answer.trim() === ""){
            return; 
        }
        try{
            var res = await addDoc(answerCollection,{
                user_id:auth?.currentUser?.uid,
                question_id : id, 
                text : answer, 
                user_name : auth?.currentUser?.displayName 
            }); 
            console.log(res); 
            window.alert("Successfully uploaded!!"); 
            setAnswer(""); 
            navigate("/");    
        }catch(err){
            console.log(err); 
            alert(err.message); 
        }

    }

    const getQuestion = async() => {  
        try{
            setLoading(true); 
            console.log("Requesting Fetch..."); 
            var data = await getDoc(doc(db,"questions",id));   
            var question = {...data.data(),id:data.id} 
            setQuestion(prev => question) ;  
            console.log(question); 
            if(question == []){
                alert("No Question Found, Try Refreshing"); 
                navigate("/"); 
            }
        }catch(err){
            console.log(err); 
        }finally{
            setLoading(false); 
        }
    }


    return ( 
        <div className="specific-question">
            {isLoading && <div className = 'loading'>Loading....</div>}
            {question != [] && !isLoading &&
            <>
                <div className = 'user-inter'>  
                    {
                        userPostedThisQuestion ? <QuestionPartWithDelete question = {question} deleteQuestion = {deleteQuestion} />
                        : <QuestionPart question = {question} />
                    }

                    {true /*!userPostedThisQuestion*/ && 
                        <div className = 'post-answer'> 
                            <div className = 'help'>{userPostedThisQuestion ? `Share your answer if you found one`:`Help ${question.user_name} find the answer : `}</div> 
                            <div className = 'input'>
                                <input 
                                type = 'text'
                                value = {answer} 
                                placeholder = "Tell people something that you know..." 
                                onChange = {(e) => { setAnswer(e.target.value)}}
                                />
                            </div>
                            <div className = 'btn'>
                                <button type = 'button' onClick = {postAnswer}>Post Answer</button>
                            </div>
                        </div>
                    }

                </div>


                <div className = 'answer-part'>
                    <div className = 'answer-header'>
                        <p>{ isDeletingAnswer ? "Deleting Answer...." : "Answers:"}</p>
                    </div>
                    <div className = 'answer-container'>
                        {existingAnswers && <AnswerPart answers = {existingAnswers} deleteAnswer = {deleteAnswer}/>} 
                        {!existingAnswers.length>0 &&  
                            <div className = 'no-answers'>
                                <p>No Answers for this one yet.</p> 
                            </div>}
                    </div>
                </div>
            </>
            }
        </div>
    );
}
 
export default Question;