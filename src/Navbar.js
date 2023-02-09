import './Navbar.css'; 
import {Link} from 'react-router-dom'; 
import {auth} from './firebase-config'; 
import { useAuthState } from 'react-firebase-hooks/auth';


const Navbar = () => {
    var [user , loading , error] = useAuthState(auth); 

    return ( 
        <div className = 'nav'>
            <div className="logo"><Link to = "/login">Ask Qatar</Link></div>  
            {!user&& !loading &&<li className = 'nav-login'><Link to = "/login" >Login / Signup</Link></li>}
            <ul className="routes">
                <li className = 'nav-home'><Link to = "/" >Home</Link></li>
                <li className = 'nav-ask'><Link to = "/ask" >Ask</Link></li>
                <li className = 'nav-abt'><Link to = "/about" >About</Link></li>
                <li className = 'nav-prof'><Link to = {`/profile`} >Profile</Link></li>
            </ul>
        </div>
    );
}
 
export default Navbar;
