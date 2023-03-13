import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from '../Login/Login';
import Registration from '../Registration/Registration'
import Account from "../Account-details/Account";
import Nav from '../Nav/Nav'
import Problem from "../problem/Problem";
import Addproblem from "../problem/addproblem/addproblem";
import Discussion from '../problem/addproblem/Discussion/Discussion';
import { useState } from "react";
import Favorite from "../problem/favorite/Favorite";
import Home from "../Home/Home";
import Homeadmin from "../Home/Homeadmin";
  const L =()=>
  {

    const [message, setMessage] = useState("Hello World");

    const store =async (value)=>
    {
      setMessage(value)
      console.log(message)
    }
  
    return(
      <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login function={store} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/account" element={<Account />} />
          <Route path="/problem" element={<Problem  username={message}/>} />
          <Route path="/addproblem" element={<Addproblem />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/viewfav" element={<Favorite />} />
          <Route path="" element={<Home />} />
          <Route path="/homeadmin" element={<Homeadmin/>} />
        </Routes>
      </div>
      </BrowserRouter>
    )
    
  }
  
  export default L;