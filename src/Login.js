import "./login.css"; 
import { useState , useEffect} from "react"; 
import {useNavigate} from 'react-router-dom'; 
import {auth , db } from './firebase-config'; 
import {useAuthState} from 'react-firebase-hooks/auth'; 
import { addDoc , doc , setDoc , collection} from 'firebase/firestore'; 
import { signInWithPopup , GoogleAuthProvider , createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    
    const navigate = useNavigate(); 
    var [user,loading,error] = useAuthState(auth); 
    if(user){navigate("/")}


    const signInWithGoogle = async ()=>{
        /*var res = await signInWithPopup(auth,provider); 
        console.log(res); */
        const provider = new GoogleAuthProvider(); 
        signInWithPopup(auth,provider)
            .then(res => res.user.uid)
            .then(id => {
                var name = auth?.currentUser?.displayName; 
                setDoc(doc(db,"users",id),{name:name}); 
            })
            .then(() => navigate("/")) 
            .catch(err => {console.log(err)})
    }

    
    var [LoginEmail,setLoginEmail] = useState(""); 
    var [LoginPassword , setLoginPassword] = useState(""); 
    var [RegEmail , setRegEmail] = useState(""); 
    var [RegPassword , setRegPassword] = useState(""); 
    var [confirmPassword , setConfirmPassword] = useState(""); 

    var [hasAccount , setHasAccount] = useState(true);   
    var [invalid,setInvalid] = useState(false);         

    const handleEmailLogin = async (e) => {
        e.preventDefault(); 
        signInWithEmailAndPassword(auth,LoginEmail,LoginPassword)
            .then((res) => {console.log(res);console.log("Successfully Logged in With Email!!")})
            .catch(err =>{ console.log(err);}) 
    }

    const handleReg = async(e) =>{
        e.preventDefault();
        if(!invalid){
            try{
                await createUserWithEmailAndPassword(auth,RegEmail,RegPassword); 
                console.log("Login Successfull"); 
                console.log(auth?.currentUser);  
            }catch(e){
                /*window.alert(e.message);*/  
                console.log(e); 
            }
        } 
    }

    var rotateCard = {
        transform: hasAccount ? "rotateY(0deg)" :"rotateY(180deg)" 
    }; 

    useEffect(()=>{
        if(RegPassword && (RegPassword!==confirmPassword)){
            setInvalid(true)
        }else{
            setInvalid(false); 
        }
    },[confirmPassword,RegPassword]);  

    return ( 
        <div className = 'auth'> 
        <div className = "form" style = {rotateCard}>     
            <form className = 'login-form' onSubmit = {(e) =>{handleEmailLogin(e)}}>
                <h2>LogIn to explore Qatar!</h2>
                {/*<input 
                type="email"  
                placeholder = 'user@example.com'
                value = {LoginEmail} 
                onChange = {(e) =>{setLoginEmail(e.target.value)}} 
                required
                />

                <input 
                type="password"   
                placeholder = 'password'
                value = {LoginPassword} 
                onChange = {(e) =>{setLoginPassword(e.target.value)}} 
                required
                />

                <button type = 'submit'>Login</button>*/}

                <div className = 'google-signin'>
                    {/*<p>Or</p>*/}  
                    <button onClick = {signInWithGoogle}>Continue with Google </button> 
                </div>

                <div className = "option sign-up"> 
                    <div>Don't Have an account?</div> 
                    <button type = 'button' onClick = {() =>{setHasAccount(false); console.log("clicked Don't Have Account")}}>Sign Up</button>  
                </div> 
            </form>

            <form className = 'reg-form' onSubmit = {(e) =>{handleReg(e)}}>
                <h2>SignUp to get started ! </h2>

                {/*<input 
                type="email"  
                placeholder = 'user@example.com'
                value = {RegEmail} 
                onChange = {(e) =>{setRegEmail(e.target.value)}} 
                required
                />

                <input 
                type="password"   
                placeholder = 'Password'
                value = {RegPassword}  
                onChange = {(e) =>{setRegPassword(e.target.value)}} 
                required
                />

                <input 
                type = 'password' 
                placeholder = 'Confirm Password' 
                value = {confirmPassword}  
                onChange = {(e) => {setConfirmPassword(e.target.value)}}  
                required
                />

                {
                    invalid && 
                    <div className = 'no-match'>Confirmation is not valid!</div>    
                }

            <button type = 'submit'>SignIn</button>*/}

                <div className = 'google-signin'>
                    {/*<p>Or</p>*/} 
                    <button onClick = {signInWithGoogle}>Proceed With Google</button>  
                </div>

                <div className = "option sign-in">  
                    <div>Already have an Account?</div> 
                    <button type = 'button' onClick = {() =>{setHasAccount(true);console.log("clicked Already have Account")}}>Log In</button>  
                </div> 


            </form>

        </div>
        </div>
    );
}
 
export default Login;