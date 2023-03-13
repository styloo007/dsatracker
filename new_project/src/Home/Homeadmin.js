import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../Account-details/loading/loading"
import "./Homeadmin.css"

const Homeadmin=()=>
{
    const [contest,setcontest]=useState([])
    const [con,setcon]=useState({username:null,link:null,website:null,date:String,time:null,name:null})
    const [error,seterror]=useState({
      username:true,website:true,link:true,name:true
    })
    const date=new Date()
    const navigate= useNavigate()
    const [loading,setloading]=useState(true)
    const today=(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" 5:30")
    const y=new Date(today)

    const getProblem = async () => 
	  { 
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get("https://dsatracker-1qrg.onrender.com/contest", config);
			  setcontest(res.data)
        console.log(res.data)
		  } catch (err) {
			  console.error("error", err);
		  }
		  console.log(contest)
	  };
    
    const onChange=(event)=>
    {
      
      const name=event.target.name;
      setcon(
        {...con,[name]:event.target.value}
        
      ) 
      // console.log(con) 
    }
    useEffect(()=>
    {
      if(window.localStorage.getItem("Logged")=='false')
        navigate("/login")
      console.log(contest)
     if(contest.length===0)
      getProblem()
     if(contest.length>0)
      { 
        setloading(false)
      }
    },[contest])
    const submit= async (event)=>
    {
        event.preventDefault()
        const x=new Date(con.date)
        console.log("first")
        console.log(con)
        const a=contest[0].Contest
        a.push(con)
        setcontest({...contest,Contest:a})
        const d={
          _id:"6388c59e90d40853d85ad6be",
          Contest:a

        }
        console.log(d)
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          await axios.put('https://dsatracker-1qrg.onrender.com/contest',d,config);
        } catch (err) {
          console.error("error", err);
        }
        
        navigate("/account")
    }
    return (
      <div>
      {(loading)?
           <Loading>  </Loading>:
    <div class="upcome12">
    {window.localStorage.getItem("Admin")==='true'?
      <div>
      
        <div class="upcome">
        <h1 style={{"textAlign":"center"}}> Today Contest</h1>
            {
              
              contest[0].Contest.map((d,index)=>
                {
                    const x=new Date(d.date)
                    
                    
                    if(!(x<y)){
                        
                     if(!(x>y)){
                        
                        return(
                          <Link class="upcome1"  to={d.link} >
                            <div  class="contestt col1"> {d.name} </div>
                            <div  class="contestt col1"> {d.website} </div>
                            <div  class="contestt col1"> {d.time} </div>
                          </Link>
                        );
                     }
                     }
                })
              }
                
            
        </div>
        <div class="upcome">
        <h1 style={{"textAlign":"center"}}>  Upcoming Contest</h1>
            {
                contest[0].Contest.map(d=>
                {
                    const x=new Date(d.date)
                    if(x>y)
                      return (
                        <div class="upcome1">
                            <div  class="contestt col1"> {d.name} </div>
                            <div  class="contestt col1"> {d.website} </div>
                            <div  class="contestt col1"> {d.date} </div>
                        </div>
                      )
                })
            }
        </div>
        <div>
            <h1 class="title">Add Contest</h1>
            <div class="formbold-form-wrapper" style={{"padding":"60px","borderRadius":"20px"}}>
            <form onSubmit={submit}>
      <div class="formbold-input-group" >
        <label for="username" class="formbold-form-label"> UserName </label>
        <input
          type="text"
          onChange={onChange}
          name="username"
          id="name"
          placeholder="Enter your username"
          class="formbold-form-input" 
        />
      </div>
      <div class="formbold-input-group">
        <label for="username" class="formbold-form-label"> Contest Name </label>
        <input
          type="text"
          onChange={onChange}
          name="name"
          id="name"
          placeholder="Enter your username"
          class="formbold-form-input" 
        />
      </div>

      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Website </label>
        <input
          type="text"
          onChange={onChange}
          name="website"
          id="problem"
          placeholder="Website Name"
          class="formbold-form-input" 
        />
      </div>
      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Contest Link</label>
        <input
          type="text"
          onChange={onChange}
          name="link"
          id="problem"
          placeholder="Paste Link"
          class="formbold-form-input" 
        />
      </div>
      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Contest Date</label>
        <input
          type="date"
          name="date"
          onChange={onChange}
          id="problem"
          placeholder="Paste Link"
          class="formbold-form-input" 
        />
      </div>
      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Contest Time</label>
        <input
          type="time"
          onChange={onChange}
          name="time"
          id="problem"
          placeholder="Paste Link"
          class="formbold-form-input" 
        />
      </div>
      
      <button class="formbold-btn">Submit</button>
    </form>
    </div>
        </div>
        </div>:<div style={{"textAlign":"center","color":"red","fontSize":"20px","height":"20em"}}>You are not authorized to this page</div>
    }
    </div>
      }
    </div>
    )
}
export default Homeadmin