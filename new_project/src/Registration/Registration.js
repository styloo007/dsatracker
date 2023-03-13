import './Registration.css'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Registration =()=>
{
  const navigate = useNavigate();
  const [usererror,setusererror]=useState(false)
  const [user,SetUser]=useState({
    name:"",username:"",email:"",phone_number:"",password:"",passwordc:""
  })

  const [error,seterror]=useState({
    name:true,username:true,email:true,phone_number:true,password:true,passwordc:true
  })
  const [userdetails, setuserdetails] = useState([]);
	const getUserDetail = async () => 
	{
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get("https://dsatracker-1qrg.onrender.com/user", config);
			  setuserdetails(res.data)
		  } catch (err) {
			  console.error("error", err);
		  }
		  
		  console.log(userdetails)
	  };

  const onChange=(event)=>
  {
    
    setusererror(false)
    const name=event.target.name;
    SetUser(
      {...user,[name]:event.target.value}
    ) 
  }

  const onSubmit =(event)=>
  {
    event.preventDefault();
    const f=userdetails.find(d=>{return d.username===user.username})
    console.log(f)
    if(!f)
    {
      setusererror(false)
    const email=(user.phone_number.length===10)
    seterror({...error,phone_number:(user.phone_number.length===10),email:((user.email.includes('@')&user.email.includes('.com')))
    ,passwordc:(user.passwordc===user.password)})
    console.log(error)

    if((user.phone_number.length===10)&&((user.email.includes('@')&user.email.includes('.com'))))
      PostData()
    }
    else
    {
      setusererror(true)
    }
  }
  const PostData =async()=>
  {
    
    const {name,username,email,phone_number,password,passwordc}=user
    var d={
      name:name,
      username:username,
      email:email,
      phone_number:phone_number,
      password:password,
      passwordc:passwordc
    }
    const config={
      headers:
      {
        "Content-Type":"application/json",
      },
    };
    try
    {
      const body=JSON.stringify(d);
      await axios.post("https://dsatracker-1qrg.onrender.com/home",body,config)
      console.log(body)
      window.localStorage.setItem("username",username)
      window.localStorage.setItem("Logged",true)
      navigate("/account")
      // window.location.reload()
    }
    catch(err)
    {
      console.log("there is an error")
    }

  }
  useEffect(()=>
  {
    if(userdetails.length===0)
      getUserDetail();
  },[userdetails])
  return (
      <div class="body">
      <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form action="#" method='POST' >
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input type="text" name="name"  placeholder="Enter your name" onChange={onChange} required />
          </div>
          <div class="input-box">
            <span class="details">Username</span>
            <input type="text" name="username" placeholder="Enter your username" onChange={onChange} required />
            {usererror?
          <div style={{"fontSize":"15px","color":"red"}}>
            username Already Exists
          </div>:<span></span>}
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="text" name="email" style={{borderColor: !error.email ? 'red' : "#9b58b6"}} placeholder="Enter your email" onChange={onChange} required />
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="text" name="phone_number" style={{borderColor: !error.phone_number ? 'red' : "#9b58b6"}} placeholder="Enter your number" onChange={onChange} required />
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" name="password" placeholder="Enter your password" onChange={onChange} required />
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="password" name="passwordc" style={{borderColor: !error.passwordc ? 'red' : "#9b58b6"}} placeholder="Confirm your password" onChange={onChange} required />
          </div>
        </div>
        <div class="gender-details">
          <input type="radio" name="gender" id="dot-1" />
          <input type="radio" name="gender" id="dot-2" />
          <input type="radio" name="gender" id="dot-3" />
          <span class="gender-title">Gender</span>
          <div class="category">
            <label for="dot-1">
            <span class="dot one"></span>
            <span class="gender">Male</span>
          </label>
          <label for="dot-2">
            <span class="dot two"></span>
            <span class="gender">Female</span>
          </label>
          <label for="dot-3">
            <span class="dot three"></span>
            <span class="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Register" onClick={onSubmit}/>
        </div>
      </form>
    </div>
  </div>
      </div>
        
    )
}


export default Registration;