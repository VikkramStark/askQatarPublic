import './home.css'; 
import {useState , useEffect} from 'react'; 
import { auth , db } from './firebase-config'; 
import {getDocs , collection } from 'firebase/firestore'; 
import {Link} from 'react-router-dom'; 
const Home = () => {

    var [questions , setQuestions] = useState(null); 
    var questionsCollection = collection(db,"questions");
    var [name,setName] = useState("");  
    var [isLoading , setLoading] = useState(false);  

    var [searchQuery,setSearchQuery] = useState("");   
    var [filtered,setFiltered] = useState([]);   

    const getQuestions = async () =>{
        setLoading(true); 
        try{
            var data = await getDocs(questionsCollection); 
            console.log(data.id);  
            var filteredData = data.docs.map(doc => ({ ...doc.data() , id : doc.id })).slice(0,6);   
            console.log(filteredData); 
            setQuestions(prev => filteredData);  
        }catch(err){
            console.log(err); 
            alert(err.message); 
        }finally{
            setLoading(false); 
        }
    }

    useEffect(() =>{
        getQuestions(); 
        var name = auth?.currentUser?.displayName || null;
        setName(name);  
    },[]); 

    useEffect(() => {
        if(!questions){return}
        else if(searchQuery === ""){
            filtered = questions.slice(0,10)
        }  
        filtered = questions.filter(q => q.text.toLowerCase().includes(searchQuery.trim().toLowerCase()) || q.keywords.toLowerCase().includes(searchQuery.trim().toLowerCase())); 
        setFiltered(prev => filtered); 
    } ,[searchQuery,questions]);  

    return ( 
        <div className = 'home'>
            <div className = 'title'>
                <p>Welcome to Qatar</p>
                <p>Explore Qatar With Questions</p>
                </div> 
            <div className="input-query">

                <input type="text" 
                value = {searchQuery} 
                placeholder = 'Search Questions'
                onChange = {(e) => { setSearchQuery(e.target.value)}}
                />
            </div>
            <div className="search-indicator">
                {searchQuery && <p>{`Search Results for : ${searchQuery} `}</p>}
            </div>
            <div className="home-question-container"> 
                {isLoading && <div className = 'loading'>Loading...</div>}
                {/*Home Question Card*/}


                {filtered.length == 0 && !isLoading && 
                    <div className = 'no-results'>
                        <p>No Questions Found...</p>
                        <div><p>Try Posting One....</p><Link to = '/ask' className = 'ask-new'>Post New Question</Link></div>
                    </div>
                }


                {filtered && 
                filtered.map(question => (
                    <div className = 'home-question-card' key = {question.id}>
                        <Link to = {"/question/"+question.id}><h3 className = 'home-question-text'>{question.text}</h3></Link>
                        <div className = 'asker-name'>
                            <Link to = {`/user/${question.user_id}`}><p> - {question.user_name}</p></Link> 
                        </div>
                    </div> 
                )) 
        }  
            </div> 
        </div>
    );
}
 
export default Home;