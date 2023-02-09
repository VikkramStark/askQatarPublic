import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom'; 
import Navbar from './Navbar';  
import Login from './Login.js'; 
import Ask from './Ask';
import Profile from './Profile'; 
import Home from './Home';  
import Question from './Question'; 
import User from './User';
import PrivateRoutes from './PrivateRoutes';
import PageNotFound from './PageNotFound'; 
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className = 'navbar'> 
          <Navbar /> 
        </div>
        <div className = 'container'>
          <Routes>
             
            <Route element = {<PrivateRoutes />}> 
              <Route exact path = "/ask" element = {<Ask />}/>
              <Route path ="/question/:id" element = {<Question />}/>
              <Route  path = "/user/:id" element = {<User />}/> 
              <Route path = "/profile" element = {<Profile />} />
            </Route>
            <Route exact path = "/" element = {<Home />}/>
            <Route exact path = "/about" element = {<About />}/>
            <Route exact path = "/login" element = {<Login />} />  
               
            {/*<Route path = "/user/id" element = {<>Specific User id</>} />*/}

            <Route path = "*" element = {<PageNotFound />}></Route>
               
          </Routes>
        </div>
      </div>
    </BrowserRouter> 
  );
}

export default App;
