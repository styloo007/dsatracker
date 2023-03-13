import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Loading from "../../../Account-details/loading/loading"
import "./Discussion.css"

const Discussion =()=>
{
    const d = new Date();
    const [problem,setproblem]=useState([])
    const [text,settext]=useState()
    const [loading,setloading]=useState(true)
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    useEffect(()=>
    {
        const getProblem = async () => 
	    { 
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get(`https://dsatracker-1qrg.onrender.com/problem/${name}`, config);
			  setproblem(res.data)
              setloading(false)
		  } catch (err) {
			  console.error("error", err); 
              window.location.reload()
		  }
		  console.log(problem)
	   };
       getProblem()
       const interval=setInterval(() => {
        getProblem()
        console.log(problem.length)
        setloading(false)
      },1000*1000)
      return () => {
        clearInterval(interval)
      }
    },[])
    const onChange=(event)=>
    {
        settext(event.target.value)
        console.log(text)
    }
    const Clicked=async ()=>
    {          
      const a=problem[0].Discussion
      a.push({username:window.localStorage.getItem('username'),text:text,time:d.toLocaleString('en-US', { hour: 'numeric', hour12: true }),date:(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate())})
      console.log(d)
      console.log(a) 
    //   const {_id,username}=userproblem[0]
      setproblem({...problem,Discussion:a})
      console.log(problem)
      
      const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`https://dsatracker-1qrg.onrender.com/problem/${name}`,problem,config);
  } catch (err) {
    console.error("error", err);
  }
      window.location.reload()
    }
    return (
        <div>
            {(loading)?
                 <Loading> </Loading>:<div>
                   <h2>Discussion Form</h2>
                   <h2>{problem[0].problems}</h2>
                   <div class="container">
                    {
                        problem[0].Discussion.map(c=>
                        {
                            return <div class="outset"> 
                                      <div>
                                        <span class="username">{c.username}</span> 
                                        
                                        <span class="username">{c.time}</span>
                                        <span class="username">{c.date}</span>
                                        </div>
                                        <div class="Discont">
                                        <div>Discuss : -</div>
                                        <div class="Discuss Discont">{c.text}</div>
                                        </div>
                                        
                                   </div>
                        })
                    }
                    <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={onChange} placeholder="Discussion..."></textarea>
                    <div> <button onClick={Clicked}> Post Disccussion </button> </div>
                    </div>
                 </div>
            }
        </div>
    )
}

export default Discussion