import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../Account-details/loading/loading"
import "./Homeadmin.css"
import { HiDesktopComputer } from "react-icons/hi";
const Home=()=>
{
    const [contest,setcontest]=useState([])
    const [con,setcon]=useState({username:null,link:null,website:null,date:String,time:null,name:null})
    const date=new Date()
    const [loading,setloading]=useState(true)
    const today=(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" 5:30")
    const y=new Date(today)
    const navigate = new useNavigate()
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
        setloading(false)
		  } catch (err) {
			  console.error("error", err);
        window.location.reload(true)
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
      console.log(contest)
     if(contest.length===0)
      getProblem()
    },[contest])
    const submit= async (event)=>
    {
        event.preventDefault()
        const x=new Date(con.date)
        
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
          setloading(true)
          window.location.reload(true)
        } catch (err) {
          console.error("error", err);
        }
    }
    return (
      <div>
      {(loading)?
           <Loading>  </Loading>:
    <div>
    <div class="upcome12 flex">
       <div style={{"flexBasis":"54%"}}>
             <h1 class="p"> Practice</h1>
             <div>
                <div class="p1"> <HiDesktopComputer />Problems for everyone</div>
                <div class="p2">Includes Beginners to Experienced programmers</div>
             </div>
             <div>
                 <div class="p1"> <HiDesktopComputer />3000+ Problems.</div>
                 <div class="p2">Practice more than 3000 problems across varying Difficulty ratings and Popular topics</div>  
             </div>
             <div>
               <div class="p1"> <HiDesktopComputer />Problem From top website</div>
               <div class="p2">LeetCode GFG codechef CodeForce</div>
             </div>
             <button style={{"margin":"48px 179px"}} onClick={()=>{navigate("/problem")}}>solve problem</button>
        </div>
      <div style={{"flexBasis":"54%"}}>
        <div class="upcome" style={{"margin":"56px 158px"}} >
        <h1 style={{"textAlign":"center"}}> Today Contest</h1>
            {
              
              contest[0].Contest.map((d,index)=>
                {
                    const x=new Date(d.date)
                    
                    
                    if(!(x<y)){
                        
                     if(!(x>y)){
                        
                        return(
                          
                          <a  class="link" href={d.link} target="_blank" rel="noopener noreferrer">
                          <div class="upcome1"  >
                            <div  class="contestt col1"> {d.name} </div>
                            <div  class="contestt col1"> {d.website} </div>
                            <div  class="contestt col1"> {d.time} </div>
                          </div>
                          </a>

                          
                        );
                     }
                     }
                })
              }
                
            
        </div>
        <div class="upcome" style={{"margin":"56px 158px"}}>
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
        
        </div>

    </div>
    </div>
      }
    </div>
    )
}
export default Home