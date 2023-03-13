
import { useState ,useEffect} from "react";
import './problem.css'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { GrAdd,GrCheckboxSelected,GrCheckbox } from "react-icons/gr";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import Loading from "../Account-details/loading/loading";
const Problem =(props)=>
{
     const d = new Date();
    const [problem,setproblem]=useState([])
    const [solved,setsolved]=useState([])
    const [Add,setAdd]=useState(true)
    const [favi,setfavi]=useState()
    const [fav,setfav]=useState()
    const [errfav,seterrfav]=useState(false)
    const [loading,setloading]=useState(true)
    const [userproblem,setuserproblem]=useState([])
    const navigation=useNavigate();
    const getProblem = async () => 
	  { 
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get("https://dsatracker-1qrg.onrender.com/problem", config);
			  setproblem(res.data)
		  } catch (err) {
			  console.error("error", err);
		  }
		  console.log(problem)
	  };
    const getfavorite = async () => 
	  { 
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get(`https://dsatracker-1qrg.onrender.com/favorite/${window.localStorage.getItem("username")}`, config);
			  setfav(res.data)
        console.log(res.data)
		  } catch (err) {
			  console.error("error", err);
		  }
	  };
    const getUserproblem = async () => 
	  { 
      
		  const config = {
			  headers: {
				  "Content-Type": "application/json",
			  },
		  };
		  try {
			  const res = await axios.get(`https://dsatracker-1qrg.onrender.com/userproblem/${window.localStorage.getItem('username')}`, config);
        setloading(false)
        console.log(loading)
			  setuserproblem(res.data)
		  } catch (err) {
			  console.error("error", err);
		  }
      console.log("first")
		  console.log(userproblem)
      setsolved(userproblem[0].solved)
	  };
    const Discuss=(value)=>
    {
      navigation({pathname: '/discussion',search: `?name=${value}`,});
    }
    const ClickedFav=()=>
    {
      navigation({pathname:'/viewfav'})
    }
    const favorite=(value)=>
    {
      if(errfav.length>0&&errfav===value)
        seterrfav("")
      else
        seterrfav(value)
      
      // console.log("callled")
    }
    const additems=async()=>
    {
      const config={
        headers:
        {
          "Content-Type":"application/json",
        },
      };
      try
      {
        const body=JSON.stringify({name:favi,problems:[]});
        const res=await axios.post(`https://dsatracker-1qrg.onrender.com/favorite/${window.localStorage.getItem("username")}`,body,config)
        console.log(res)
        getfavorite();
        setAdd(true)
        // await axios.put('/account',body,config);
        // console.log(body)
        // window.location.reload()
      }
      catch(err)
      {
        console.log("there is an error")
      }
    }
    const addfav= async (c,d)=>
    {
      const index=fav[0].Favorite.findIndex(favo=>{
        return favo._id===d;
      })

      fav[0].Favorite[index].problems.push(c)
      setfav(fav)
      console.log(fav)
      const config={
        headers:
        {
          "Content-Type":"application/json",
        },
      };
      try
      {
        const body=JSON.stringify(fav[0].Favorite[index]);
        await axios.put(`https://dsatracker-1qrg.onrender.com/favorite/${d}`,body,config)
        // console.log(body)
        // window.location.reload()
      }
      catch(err)
      {
        console.log("there is an error")
      }
    }

    const Clicked=async (value)=>
    {          
      const a=userproblem[0].solved
      a.unshift({problem:value,time:d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),date:(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate())})

      console.log(a) 
      const {_id,username}=userproblem[0]
      const da=[{
          _id:_id,
          username:username,
          solved:a
      }]
      console.log(userproblem)
      
      const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`/userproblem/${window.localStorage.getItem('username')}`,da,config);
    window.location.reload(true)
  } catch (err) {
    console.error("error", err);
  }
      // window.location.reload()
    }

      useEffect(()=>
      {
        if(window.localStorage.getItem("Logged")=="false")
           navigation("/login")
        getUserproblem()
        getProblem()
        getfavorite()
      },[])

    return (
      <div>
            {(loading)?
                 <Loading>  </Loading>:
  <div class="container1">
  <h2>Problem <small></small></h2>
  {window.localStorage.getItem("Admin")=='true'?
  <button class="button" onClick={()=>{navigation("/addproblem")}}>Add problem</button>:<div></div>}
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">SI no</div>
      <div class="col col-2">Problem Name</div>
      <div class="col col-3">Difficulty Level</div>
      <div class="col col-4">website</div>
      <div class="col col-5">Status</div>
      <div class="col col-5"></div>
      <div class="col col-6">Discussion</div>
    </li>
    {
      problem.map((c,index)=>
      {
        return  (  <div><li class="table-row">
           <div class="col col-1" >{index}</div>
           <div class="col col-2" >{c.problems}</div>
          <div class="col col-3" >{c.level}</div>
           <div class="col col-4" onClick={Clicked.bind(Clicked,c._id)} ><a  class="link" href={c.link} target="_blank" rel="noopener noreferrer">{c.website}</a></div>
           <div class="col col-5" >{  userproblem[0].solved.find(d=>{return d.problem===c._id})?<GrCheckboxSelected/>:<GrCheckbox/>  }</div>
           <div class="col col-5" onClick={favorite.bind(favorite,c._id)}> <AiOutlineStar class="favicon"/></div>
           <div class="col col-6 dec" onClick={Discuss.bind(Discuss,c.problems)}>Disccussion</div>
       </li>
       
       {errfav===c._id?
        <div class="favorite">
        {fav[0].Favorite.map(d=>{return <div class="fav"><div class="con"><span class="favitems">{d.name}</span><button class="add" onClick={addfav.bind(addfav,c._id,d._id)}>Add</button></div></div>})}
        {Add?<div class="addnew" onClick={()=>{setAdd(false)}}>Addnew</div>:<div style={{"textAlign":"center"}}><input class="input1" onChange={(event)=>{setfavi(event.target.value)}}/><button style={{"margin":"10px 20px"}} onClick={additems}>Add</button></div>}
        <div class="mylist" onClick={ClickedFav}>View my list</div>
        </div>:<span></span>    
       }
       </div>
       
       )

      })
    }
  </ul>
</div>}</div>
    )
}

export default Problem