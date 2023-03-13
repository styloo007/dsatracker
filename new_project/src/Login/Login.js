
import './Login.css'
import { useNavigate } from "react-router-dom";
import Account from '../Account-details/Account';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Login =(props)=>
{
	const [user, setuser] = useState([]);
	const [login,setlogin]=useState({username:"",password:""})
	const [error,seterror]=useState({username:false,password:false})
	const navigation=useNavigate()
	const getUserDetail = async () => 
	{
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get("https://dsatracker-1qrg.onrender.com/user", config);
			  setuser(res.data)
		  } catch (err) {
			  console.error("error", err);
		  }
		  
		  console.log(user)
	  };
	const Validate =()=>
	{
		// 
		const User=user.filter((c,index)=>
			{
				return (c.username===login.username&&c.password===login.password)
			})
		console.log(User)
		
		window.localStorage.setItem('username', User[0].username);
		window.localStorage.setItem('Logged', true);
		window.localStorage.setItem('Admin', User[0].Admin);
		navigation("/account")
		// navigate('/account', {state:User})  
	}
	const onChange=(event)=>
	{
		if(user.length==0)
		   getUserDetail()
		const name=event.target.name;
		setlogin(
		  {...login,[name]:event.target.value}
		)  
		
		console.log(login)
	}
	const Clicked =(event)=>
	{
		event.preventDefault()
		const u=user.findIndex((d,index)=>{
			return d.username===login.username
		})
		const userr=(u===-1)?true:false
		seterror({username:userr,password:false});
		// console.log(error.username+" u")
		console.log(u)
		if(user)
		{
			console.log("inside")
			const passr = (login.password===user[u].password)?false:true
			seterror({username:false,password:passr});

			if(!userr&&!passr)
		    {
				console.log("inside 1")
				Validate()
			}
		}
		
		console.log(error)
	}
    return (
		<div>
		<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" onSubmit={Clicked}>
					<span class="login100-form-title p-b-34 p-t-27">
						Log in
					</span>
					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input class="input100" type="text" name="username" placeholder="Username" onChange={onChange}/>
						<span class="focus-input100" data-placeholder="&#xf207;"></span>
					</div>
					{error.username?
						<div style={{"fontSize":"15px","color":"red"}}>username doesn't exists</div>:<div></div>}
					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="password" placeholder="Password" onChange={onChange} />
						<span class="focus-input100" data-placeholder="&#xf191;"></span>
					</div>
					{error.password?
						<div style={{"fontSize":"15px","color":"red"}}>password doesn't not match</div>:<div></div>}
					<div class="contact100-form-checkbox">
					</div>
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
						<button class="login100-form-btn" onClick={()=>{navigation("/register")}} >Registration </button>
					</div>
				</form>
			</div>
		</div>
	</div>
	</div>
    )
}

export default Login;