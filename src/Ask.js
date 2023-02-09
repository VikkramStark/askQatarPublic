import './ask.css'; 
import {useState , useEffect} from 'react'; 
import { db , auth } from './firebase-config'; 
import { collection , addDoc } from 'firebase/firestore'; 
import {useNavigate} from 'react-router-dom'; 

const Ask = () =>{

    var [question,setQuestion] = useState(""); 
    var [keyQuery , setKeyQuery] = useState("");  
    var questionsCollection = collection(db,"questions");
    var [uploaded , setUploaded] = useState(false); 

    const navigate = useNavigate(); 

    var handleSubmit = async(e) =>{ 
        console.log(keyQuery);
        setKeyQuery(prev => prev.trim());  /* To remove trailing spaces */ 
        e.preventDefault(); 
        if(Boolean(auth?.currentUser?.uid)){     /**To Check if The Current user is Logged in ot not */
            try{ 
                var res = await addDoc(questionsCollection,{        
                    keywords:keyQuery,
                    text:question, 
                    user_id:auth?.currentUser?.uid, 
                    user_name:auth?.currentUser?.displayName
                })
                console.log(res); 
                setUploaded(true); 
                setTimeout(() => {
                    setUploaded(false);
                    setKeyQuery("");         /**Clear all the loading values and entred Document Values  */
                    setQuestion("")
                },3000);   
            }catch(err){
                console.log(err); 
            }
        }else{ 
            navigate('/login'); 
        }
    }

    return (
        <form className = 'ask' onSubmit = {(e) => handleSubmit(e)}> 
            <div className = 'header'>
                <h3>Post All your Queries Here!</h3>
            </div>
            <div className="query">
                <div className = "question-field"> 
                    <p>{ uploaded? `<<<<<Successfully Uploaded Question....>>>>>  : ) ` :`Type Something and let the World Answer :` }</p>
                    
                    <textarea name="question" id="question" 
                    value = {question} 
                    onChange = {(e) => {setQuestion(e.target.value)}} 
                    required 
                    />
                    <div className = 'post-div'>
                        <button type = 'submit'>Post Question</button>
                    </div> 
                </div>
                <div className="keywords-field">
                    <p>Keywords : </p> 
                    <input type="text" 
                    alt = "Keywords helps people to find you" 
                    value = {keyQuery} 
                    onChange = {(e) =>{setKeyQuery(e.target.value)}}
                    required/> 
                </div>
            </div>
        </form>
    )
}

export default Ask; 