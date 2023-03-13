
import axios from 'axios'
import { useState } from 'react'
import './addproblem.css'

const Addproblem=()=>
{
    const [problem,setproblem]=useState({username:"",email:"",problems:"",website:"",link:"Easy",level:""})
    
      const [error,seterror]=useState({
        username:true,email:true,problems:true,website:true,link:true,level:true
      })


      const onChange=(event)=>
      {
        
        const name=event.target.name;
        setproblem(
          {...problem,[name]:event.target.value}
        )  
      }
      const onSubmit =(event)=>
   {
      event.preventDefault();
      console.log(problem)
     seterror({...error,username:(problem.username.length>0),email:((problem.email.includes('@')&problem.email.includes('.com')))})
       PostData()
   }
const PostData =async()=>
{
  
  const {username,email,problems,website,link,level}=problem
  const d={
    username:username,
    email:email,
    problems:problems,
    website:website,
    link:link,
    level:level
  }
  console.log(d)
  const config={
    headers:
    {
      "Content-Type":"application/json",
    },
  };
  try
  {
    const body=JSON.stringify(d);
    await axios.post("https://dsatracker-1qrg.onrender.com/addproblem",body,config)
    console.log(body)
    window.location.reload()
  }
  catch(err)
  {
    console.log("there is an error")
  }
}
    return (
        <div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper" style={{"padding":"60px"}}>
    <form onSubmit={onSubmit}>
      <div class="formbold-input-group">
        <label for="name" class="formbold-form-label"> UserName </label>
        <input
          type="text"
          name="username"
          id="name"
          placeholder="Enter your username"
          class="formbold-form-input" onChange={onChange}
        />
      </div>

      <div class="formbold-input-group">
        <label for="email" class="formbold-form-label"> Email </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          class="formbold-form-input" onChange={onChange}
        />
      </div>

      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Problem </label>
        <input
          type="text"
          name="problems"
          id="problem"
          placeholder="Problem"
          class="formbold-form-input" onChange={onChange}
        />
      </div>
      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Website </label>
        <input
          type="text"
          name="website"
          id="problem"
          placeholder="Website Name"
          class="formbold-form-input" onChange={onChange}
        />
      </div>
      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Problem Link</label>
        <input
          type="text"
          name="link"
          id="problem"
          placeholder="Paste Link"
          class="formbold-form-input" onChange={onChange}
        />
      </div>
      
      <div class="formbold-input-group">
        <label class="formbold-form-label">
          Difficulty Level
        </label>

        <select class="formbold-form-select" name="level" id="level" onChange={onChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <button class="formbold-btn">Submit</button>
    </form>
  </div>
</div>
    )
}
export default Addproblem