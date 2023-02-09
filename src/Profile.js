import './profile.css'; 
import {auth} from './firebase-config'; 
import {  Navigate } from 'react-router-dom';
const Profile = () => {

    console.log(auth?.currentUser); 
    return ( 
        <Navigate to = {`/user/${auth?.currentUser?.uid}`} /> 
    )
        {/*<div className = "profile">
            <div className = 'username'>{`Welcome ${auth?.currentUser?.displayName || auth?.email}`}</div> 
            <button 
            className = "logout" 
            type = 'button'
            onClick = {logout}
            >Logout</button>
    </div>*/}
}
 
export default Profile;