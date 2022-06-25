import axios from "axios";
import React from "react";
import  { useState ,useEffect} from 'react';


export default function Attendance() {
  const result=localStorage.getItem('rollno');
  const[rollno,setrollno]=useState(result);
  const [post, setPost] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    localStorage.getItem("rollno");
   },[rollno]);
 useEffect(()=>{
   axios.get(`https://att.nbkrist.org/attendance/Apps_ren/getSubwiseAttAsJSONGivenRollNo.php?q=${rollno}`).then((response) => {
     const { data } = response
     if(data) {
         setPost(response.data);
     
      } else {
         setError("NO data found")
     }
 
   }).catch(error=>{
     setPost({"percent":"No data found"}.data)
   })
 })
  const attendance=()=>{
    axios.get(`https://att.nbkrist.org/attendance/Apps_ren/getSubwiseAttAsJSONGivenRollNo.php?q=${rollno}`).then((response) => {
      const { data } = response
      if(data) {
          setPost(response.data);
      
       } else {
          setError("NO data found")
      }

    }).catch(error=>{
      setPost({"percent":"No data found"}.data)
    })
  }
 
  

  return (
    <>

    <div className="container-fluid">
    <h3>NBKRIST Attendance</h3><h3>{rollno}</h3>
      </div>
      <br/>
    <div className="container1">
      
      <label>
        RollNo:
      </label>
      
<input type="text" required size={10} value={rollno} onChange={(event)=>{
  setrollno(event.target.value.toLowerCase());
}} /> 
<div>
  <br>
  </br>
  <div   className="new"  onClick={()=>{localStorage.setItem("rollno",rollno);

          }}>

  <input
            type="checkbox"
           
            name="tripType"
           
          />Remember Me
          </div>
         
<button class="btn btn-primary" onClick={attendance}>Submit</button>
</div>
<br></br>


{post?.percent &&<h3> Your Percentage:{post.percent}</h3>}
   {error?.percent && <h1>{error.percent} <br>
   </br>Your classesInfo: {post.percent_breakup}</h1>
   }
   
    </div>
    <div className="help">
    <a href="https://www.hitwebcounter.com">
<img className="counter"src="https://hitwebcounter.com/counter/counter.php?page=8007496&style=0036&nbdigits=7&type=page&initCount=0" title="Free Counter" Alt="web counter"   border="0" /></a>                                    
                                    
    
    </div>
    
    </>
  );
  
}