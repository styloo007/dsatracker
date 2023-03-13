import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import "./Account.css"
import { GrAdd,GrCheckboxSelected,GrCheckbox } from "react-icons/gr";
import { AiOutlineStar } from "react-icons/ai";
import Loading from "./loading/loading";
import { Doughnut } from 'react-chartjs-2';
import Login from "../Login/Login";
ChartJs.register(
    Tooltip, Title, ArcElement, Legend
  );
const Account =()=>
{
    const [userdata,setuserdata]=useState([])
    const d = new Date();
    const [solved,setsolved]=useState({easy:0,medium:0,hard:0})
    const [loading,setloading]=useState(true)
    const [platform,setplatform] =useState({leetcode:0,codechef:0,GFG:0,other:0})
    const [errorskills,seterrorskills]=useState(false)
    const [charload,setcharload]=useState(false)
    const [duplicate,setduplicate]=useState("")
    const [userproblem,setuserproblem]=useState([])
    const [addskills,setaddskills]=useState(false)
    const [chart,setchart]=useState(false)
    const navigate=useNavigate()
    const [length,setlength]=useState(10);
    const [data, setData] = useState({
        datasets: [{
            data: [],
            backgroundColor:[
              'orange',
              'red',
              'green',
              'gray'
            ]
        },
      ],
      labels: [
          'leetcode',
          'codechef',
          'GFG',
          'other'
      ], 
    })
    useEffect(function a ()
    {
      console.log(!window.localStorage.getItem("Logged"))
        if(window.localStorage.getItem("Logged")==='false')
          {
            console.log(window.localStorage.getItem("Logged")+" l")
            navigate("/login")
          }
        else{
        async function getUserDetail()
        {
            console.log("called")
              const config = {
                  headers: {
                      "Content-Type": "application/json",
                  },
              };
              try {
                  const res = await axios.get(`https://dsatracker-1qrg.onrender.com/user/${window.localStorage.getItem("username")}`, config);
                  setuserdata(res.data)
                //   setloading(false)
                //   console.log(res.data)
              } catch (err) {
                  console.error("error", err);
                  window.location.reload()
              }
              
            //   console.log(user)
        };
        getUserDetail()
        
        if(userdata.length>0){
        setTimeout(()=>
        {
              if(userproblem.length>=0)
              {
                if(userproblem[0].solved.length<length)
                  setlength(userproblem[0].solved.length)
                Clicked();
                setTimeout(()=>
                {
                     setloading(false)
                },100)
                console.log(length)
            }
            
        },100)
        
    }else{getUserproblem()}
    
    console.log(window.localStorage.getItem("Logged"))
    
    }},[userproblem])
    const getUserproblem = async () => 
    { 
    
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(`https://dsatracker-1qrg.onrender.com/userproblem1/${window.localStorage.getItem('username')}`, config);
            setuserproblem(res.data)
            console.log(res.data)
            
        } catch (err) {
            console.error("error", err);
        }
    };
    const addClicked=()=>
    {
      
      seterrorskills(false)
      seterrorskills(false)
      console.log(userdata[0].Skills)
      if(duplicate.length==0)
        setaddskills(!addskills)
      if(userdata[0].Skills.find(d=>{return d===duplicate}))
         {
           seterrorskills(true)
           setaddskills(!addskills)
           console.log(errorskills)
         }
      else if(addskills&&duplicate.length!=0)
       {
        setaddskills(!addskills)
        put()
       }
       setduplicate("")
    }
    const Clicked =()=>
    {
        var easy=0,medium=0,hard=0
        var leetcode=0,codechef=0,GFG=0,other=0;
        console.log(userproblem)
        userproblem[0].solved.map(d=>{
            if(d.problem.level==="Easy")
              easy=easy+1;
            else if(d.problem.level==='Medium')
              medium=medium+1;
            else
              hard=hard+1;

            if(d.problem.website==="LeetCode")
              leetcode=leetcode+1;
            else if(d.problem.website==="codechef")
                codechef=codechef+1;
            else if(d.problem.website==="GFG")
                GFG=GFG+1;
            else 
               other=other+1;

        })

        setsolved({easy:easy,medium:medium,hard:hard})
        setplatform({leetcode:leetcode,codechef:codechef,GFG:GFG,other:other});
        const a=data;
        a.datasets[0].data=[leetcode,codechef,GFG,other];
        setData(a);
        console.log(solved)
        console.log(easy+" "+medium+" "+hard)
        setchart(false);
        setcharload(true)
    }

    const onChange=(event)=>
    {
        setduplicate(event.target.value) 
    }
    const put=async ()=>
    {
        userdata[0].Skills.push(duplicate)
        const {_id,name,username,email,phone_number,password,passwordc,Favorite,Skills}=userdata[0]
        const d=[{
            _id:_id,
            name:name,
            username:username,
            email:email,
            phone_number:phone_number,
            password:password,
            passwordc:passwordc,
            Favorite:Favorite,
            Skills:Skills
        }]
        

        console.log(d)
        
        const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			await axios.put(`https://dsatracker-1qrg.onrender.com/account`,d,config);
		} catch (err) {
			console.error("error", err);
            window.location.reload(false)
		}
    }
    
    return (
        <div>{
          
            (loading)?<div>
        <Loading> </Loading>
       </div>:
       <div class="con-main">
        <div class="con-acc ">
           <div class="con-det box-acc"><img src={require('./download (1).jpg')} alt="Girl in a jacket" style={{height:116}} /> 
           <div class="con-det1">
             <div>{userdata[0].name}</div>
             <div>{userdata[0].username}</div>
            </div>
           <div class="Skill">
             <h1 style={{"fontSize":"20px"}}>Skills </h1>
             {
              userdata[0].Skills.length>0?
              <div class="overflow">
              {
              userdata[0].Skills.map(d=>
              {
                return <div class="skillsitems">{d}</div>
              })
              }
              </div>:<div></div>
             }
             <div>
             
              <div>{
              addskills?
              <div>
              <input class="addskillsinput" onChange={onChange}/>
              </div>
              :<div></div>
              }
              {
                errorskills?
               <div style={{"textAlign":"center","fontSize":"10px","color":"red"}}>{duplicate} Already Exists </div>:<div></div>
              }
              </div>
             
             
             
              <div class="addskills"><button onClick={addClicked}>Add Skills</button></div>
             </div>
           </div>
           </div>
           <div>
              {
                (chart)?<div></div>:
                <div class="solved box-acc">
                  <svg height="100" width="100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" strokeLinecap="round" fill="white" />
                    <circle cx="50" cy="50" r="40" stroke="red" stroke-width="3" strokeLinecap="round"  strokeDasharray={`${(solved.easy+solved.hard+solved.medium)*5.8} ${360-(solved.easy+solved.hard+solved.medium)*5.8}`} strokeDashoffset="0" fill="none" >asdasd </circle>
                    
                </svg>
                <div class="nosol">{(solved.easy+solved.hard+solved.medium)}</div>
                    <div>
                    <div>Easy {solved.easy}/20</div>
                    <div class="">
                    <div class="Easy"></div>
                    <div class="Easy1" style={{width:solved.easy*10}}></div>
                    </div>
                    <div>Medium {solved.medium}/20 </div>
                    <div class="">
                    <div class="Medium" ></div>
                    <div class="Medium1" style={{width:solved.medium*10}}></div>
                    </div>
                    <div>Hard {solved.hard}/20</div>
                    <div class="">
                    <div class="Hard" ></div>
                    <div class="Hard1" style={{width:solved.hard*10}}></div>
                    </div>
                    </div>
                </div>
              }
           </div>
           <div class="box-acc">
                    {
                                   charload?
                                  <div  class="chart" >
                                  <Doughnut data={data} />
                                  </div>:<div></div>
                    }
                    </div>
         </div>
          <div class="recent box-acc">
             <h1 style={{"textAlign":"center"}}>Recent opened Problem</h1>
             {
              userproblem[0].solved.length>0?
             <div>
                {
                    userproblem[0].solved.slice(0,length).map((d, index)=>
                    {
                        return(
                            <li class="table-row"  style={{"padding":"1px 45px"}}>
                                  <div class="col col-1" >{d.date}   {d.time}</div>
                                  <div class="col col-2" >{d.problem.problems}</div>
                                  <div class="col col-3" >{d.problem.level}</div>
                                  <div class="col col-4"><a  class="link">{d.problem.website}</a></div>
                         </li>)
                    })
                }
             </div>:<div style={{"textAlign":"center","fontSize":"20px"}}>No record Found</div>
             }
          </div>
         </div>
    }
  </div>

    )
}
export default Account