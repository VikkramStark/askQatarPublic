import './about.css'; 
import {auth} from './firebase-config'; 
import {useAuthState} from 'react-firebase-hooks/auth'; 

const About = () => {

    var [user,loading,error] = useAuthState(auth);  

    return ( true && 
        <div className = 'about-us'>
            <div className = 'user-header'>
                <p>Greetings {user ? user.displayName : "Anonymous"} !</p>
            </div>
            <div className = "about-content">
                <i className = 'rainbow'>Ask-Qatar</i> is a <i className = 'react-blue'>ReactJS</i> - <i className = 'fire'>FireBase</i> based web application that's being hosted via <i className = 'fire'>Firebase</i>.
                Here we built a Q&A based application where users can post their Questions and answer to others Questions as well. 
                It was built as a part of <i className = 'red'>Webster</i>'s Hackathon problem statement. Hope you enjoy our simple Project  {"; )"} 
            </div>
        </div>
    );
}
 
export default About;