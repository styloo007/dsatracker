import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { GrAdd,GrCheckboxSelected,GrCheckbox } from "react-icons/gr";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Loading from "../../Account-details/loading/loading";
import "./Favorite.css"
import { set } from "mongoose";
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

const Favorite =()=>
{
    const [userproblem,setuserproblem]=useState([])
    const [count,setcount]=useState(0)
    const [solved,setsolved]=useState(0);
    const [charload,setcharload]=useState(false)
    const [data, setData] = useState({
        datasets: [{
            data: [],
            backgroundColor:[
              'green',
              'red'
            ]
        },
      ],
      labels: [
          'Solved',
          'Unsolved'
      ], 
    })
    const getUserproblem = async () => 
    { 
    
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(`https://dsatracker-1qrg.onrender.com/userproblem/${window.localStorage.getItem('username')}`, config);
            setuserproblem(res.data)
            console.log(userproblem)
            
        } catch (err) {
            console.error("error", err);
        }
    };
    const [fav,setfav]=useState()
    const [loading,setloading]=useState(true)
    const [index,setindex]=useState(0);
    const  Click=(i)=>
    {
        setindex(i)
        setcharload(false)
        var solved1=0;
        var count1=0;
        console.log(fav)
        if(fav[0].Favorite.length>0)
        {
        fav[0].Favorite[i].problems.map(c=>
            {
               if( userproblem[0].solved.find(d=>{return d.problem===c._id} ))
                {
                    solved1=solved1+1;
                    console.log(c)
                }
                count1=count1+1;

            })
            setcount(count1);
            setsolved(solved1);
            const a=data;
            a.datasets[0].data=[solved1,count1-solved1];
            setData(a);
            console.log(data)
            setcharload(true)}
    }
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
            console.log(fav)
            // console.log(res.data)
        } catch (err) {
            console.error("error", err);
        }
    };



    useEffect(()=>
    {
      if(!fav)
        getfavorite();
    getUserproblem();
        
        //   Click(0);
        setTimeout(()=>
        {
            // if(fav&&userproblem)
            console.log(fav+" "+userproblem)
              if(fav&&userproblem)
            {
                Click(0);
                setTimeout(()=>
                {
                     setloading(false)
                },100)
            }
            
        },100)
        
    },[fav])
    return (
        <div>
        {(loading)?
             <Loading> </Loading> :
          <div>
          {fav[0].Favorite.length>0? 
           <div class="con1">
        <div style={{"flexBasis":"30%","margin":"20px"}}><div class="list1"> List {fav[0].Favorite.map((d,i)=>{return (<div class="favitems1" onClick={Click.bind(Click,i)}>{d.name}</div>)})}</div></div>
        <div> <h1 class="header1">{fav[0].Favorite[index].name}</h1>  <ul class="responsive-table1">
        <li class="table-header">
        <div class="col col-10"></div>
      <div class="col col-11">Problem Name</div>
      <div class="col col-21">Difficulty Level</div>
      <div class="col col-31">website</div>
      <div class="col col-41">Status</div>
    </li>
    </ul>
    
      <div>{fav[0].Favorite[index].problems.map(c=>
      {
        return (
            <div class="responsive-table">
            <li class="table-row">
            <div class="col col-10" >{  userproblem[0].solved.find(d=>{return d.problem===c._id} ) ? <GrCheckboxSelected/>:<GrCheckbox/>  }</div>
           <div class="col col-11" >{c.problems}</div>
           <div class="col col-21" >{c.level}</div>
          <div class="col col-31" >{c.website}</div>
          <div class="col col-41" >Solved</div>
          </li>
          </div>

        )
      })}</div>
      </div>
      {
        charload?
      <div  class="chart" style={{width:'20%', height:'20%'}}>
         <Doughnut data={data} options={{responsive:true}} redraw={true}/>
      <span style={{"color":"green"}}>Solved {solved} </span><span style={{"color":"red"}}>Unsolved {count-solved}</span> 
    </div>:<div></div>
      }
    
      
    </div>:<div class="nolist">No list found</div>
          }
    </div>
          
    }
        </div>)
}

export default Favorite

