import './Nav.css'
import { useNavigate,Routes,Route } from 'react-router-dom';
import Login from '../Login/Login';
import { Outlet, Link } from "react-router-dom";


const Home=()=> {
  const navigate=useNavigate()
  const Logout=()=>
  {
      window.localStorage.setItem('Logged',false) 
      
      console.log("first")
      navigate("/login")
      window.location.reload()
  }
  return (
    <div class="Body">
    <header>
    <span class="image-clickable Body">
      <a>
      <img src={require('./images.jpg')} alt="Girl in a jacket" style={{height:50}} />
      </a>
    </span>
    <nav>
      <ul class="nav-links">
        <li style={{"margin":"0px"}} ><Link to="" >Home</Link></li>
        <li><Link to="/problem">Problem</Link></li>
        {/* <li><Link to="/about">About</Link></li> */}
        
           {
            window.localStorage.getItem("Logged")=="true"?
            <li class="dropdown">
             <div class="dropbtn">My Account</div>
             <div class="dropdown-content">
             <div>
              <Link class="setting" to="/account">Account</Link>
              {window.localStorage.getItem("Admin")==='true'?<Link class="setting" to="/homeadmin">Add Contest</Link>:<div></div>}
              <Link class="setting" onClick={Logout}>Logout</Link>
             </div>
             </div>
             </li>
             :
             <li class="dropdown">
             <div class="dropbtn">Login</div>
             <div class="dropdown-content">
             <div>
              <Link class="setting" onClick={Logout}>Login</Link>
             </div>
             </div>
             </li>
             
             }
      </ul>
    </nav>
  </header>
  </div>
  );
}

export default Home;

