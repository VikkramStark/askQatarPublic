import './pagenotfound.css'; 
import { Link } from 'react-router-dom';
const PageNotFound = () => {
    return ( 
        <div className = 'page-not-found'>
            <div className = 'left'>
                <div className="spin-box"></div>
            </div>
            <div className="middle">
                <h1>404</h1>
                <h2>That Doesn't seem to exist <br /> {"( : | )"}</h2>   
                <Link to = "/">Get Back to Home</Link> 
            </div>
            <div className="right">
                <div className="upper-container">
                    <div className="element1"></div>
                </div>
                <div className="lower-container">
                    <div className="element2"></div>
                </div>
            </div>
        </div>
    );
}
 
export default PageNotFound;