import { Outlet , Navigate } from 'react-router-dom'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './firebase-config'; 


const PrivateRoutes = () =>{

    var [user , loading , error] = useAuthState(auth); 

    
    return (
        user ? <Outlet /> : <Navigate to = "/login" /> 
    )
}

export default PrivateRoutes; 