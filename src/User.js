import { useParams , useNavigate } from "react-router-dom";
import {useState , useEffect} from 'react'; 
import { auth , db } from './firebase-config';
import { signOut , onAuthStateChanged } from 'firebase/auth';   
import {where , query , collection, getDocs , getDoc , doc } from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth'; 
import {Link} from 'react-router-dom'; 

import UserQuestions from './UserQuestions'; 

import './user.css';
import UserAnswers from "./UserAnswers";
const User = () => {

    var [user , loading , error] = useAuthState(auth); 

    const {id} = useParams(); 
    var [questions,setQuestions] = useState([]); 
    var questionRef = collection(db,"questions"); 
    var answerRef = collection(db,"answers");  
    var [answers , setAnswers] = useState([]);  
    var [name,setName] = useState(null); 
    var [loadingUserContents , setLoadingUserContents] = useState({question:false,answer:false}); 
    var pronoun = auth?.currentUser?.uid == id ? "You" : name ;  
    
    const navigate = useNavigate(); 

    onAuthStateChanged(auth , (user) =>{
        if(!user){
            navigate("/login");  
        }
    }); 
    
    const getQuestions = async () =>{
        setLoadingUserContents(prev => ({...prev,question:true})); 
        try{
        var data = await getDocs(query(questionRef , where("user_id","==",id))); 
        questions = data.docs.map(doc => ({...doc.data(),id:doc.id})); 
        setQuestions(() => questions); 
        console.log(questions); 
        }catch(err){
            console.log(err); 
            alert(err.message); 
        }finally{
            setLoadingUserContents(prev => ({...prev,question:false})); 
        }
    }

    const getQuestionForAnswer = async (id) =>{ 
        try{
            var res = await getDoc(doc(db,"questions",id)); 
            var data = {...res.data()}; 
            return data; 
        }catch(err){
            console.log(err);  
        }
    }

    const getName = async() =>{
        let res = await getDoc(doc(db,"users",id)); 
        let filteredData = res.data(); 
        let name = filteredData.name; 
        setName(name);  
    }

    const logOutUser = async () => {
        signOut(auth); 
        navigate("/"); 
    }

    const getAnswers = async() =>{

        setLoadingUserContents(prev => ({...prev,answer:true})); 

        try{

        var data = await getDocs(query(answerRef,where("user_id","==",id))); 
        var filteredData =  data.docs.map(doc => ({...doc.data(),id:doc.id}));  

        filteredData.forEach(async answer => {
            /*passing in every question id obtained from answer id to get data abt question*/ 
            let question = await getQuestionForAnswer(answer.question_id); 
            console.log(question.text);
            answer.question_text = question.text;   
        });   

        setAnswers(() => [...filteredData]); 
        console.log(answers);   
        setLoadingUserContents(prev => ({...prev,answer:false}));

        }catch(err){
            console.log(err); 
            alert(err.message); 
        }finally{
            /*setLoadingUserContents(prev => ({...prev,answer:false}));*/
        }
    }

    useEffect(() =>{
        getAnswers();
        getQuestions();  
        getName(); 
    },[]); 




    return ( 
        <div className = 'user-profile'>
            <div className = 'user-header'>
                <div className = 'user-info'>
                    <p>{name}</p>
                </div>
                <div className = 'user-setting'>
                    {auth?.currentUser?.uid == id &&
                        <button className = 'logout-btn' onClick = {logOutUser}>Log out</button>
                    }
                </div>
            </div>
            <div className = 'content-header'>
                <div>Questions Asked by {pronoun}</div>
                <div>Queries Answered by {pronoun}</div> 
            </div>
            <div className = 'user-contents'>
                
                <div className="user-questions">
                    {loadingUserContents.question && 
                        <div className = 'content-loading'><p>Loading Questions...</p></div>
                    }
                    {questions && <UserQuestions questions = {questions} />} 
                    {!questions.length>0 && !loadingUserContents.question && 
                        <div className='no-questions-found'>
                            <p>No Questions Posted by User Yet</p>
                            {id == auth?.currentUser?.uid && 
                                <Link to = '/ask' className = 'ask-question'>Ask a Question</Link>
                            }
                        </div>
                    } 
                </div>
                <div className="user-answers">
                    {
                        loadingUserContents.answer && 
                        <div className = 'content-loading'><p>Loading Answers...</p></div>
                    }
                    {
                        answers.length>0 && !loadingUserContents.answer  &&
                        <UserAnswers answerData = {[...answers]} />   
                    }

                    {
                        !answers.length>0 && !loadingUserContents.answer &&
                        <div className = 'no-questions-found'>
                            <p>No Queries answered by User Yet</p>
                            {id == auth?.currentUser?.uid && 
                                <Link to = '/' className = 'ask-question'>Answer a Question</Link>
                            }
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}
 
export default User;