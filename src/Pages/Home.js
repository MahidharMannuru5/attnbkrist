import React, { useEffect } from 'react'
import {collection,query,orderBy,onSnapshot,deleteDoc,doc} from "firebase/firestore"
import {auth,db} from "../ConfigFirebase/Firebase"
import {useState} from "react"
import {Button} from "react-bootstrap"
import { GoTrashcan} from 'react-icons/go';
import { FiEdit} from 'react-icons/fi';
import {useNavigate,Link} from "react-router-dom"


const Home = () => {
  const navigate=useNavigate();
  const user=auth.currentUser
  const[contentpost,setcontentpost]=useState([]);
  const collectionReference=collection(db,"ContentPosts");
  const q=query(collectionReference,orderBy("timestamp","desc"));
  useEffect(() => {
    const FetchData = onSnapshot(q,(snapshot) => {
    const data = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {...data,Title: data.Title,timestamp: data.timestamp, Body: data.Body,username: data.username,Docid:doc.id};
    });
    console.log(data);
    setcontentpost(data);
    });
    return () => FetchData();
    }, []);
    const deletePost=async(id)=>{
      const delReference=doc(db,"ContentPosts",id)
      await deleteDoc(delReference)
    }
    

  return (
    <>
  
    
   
    <div className="Blog-post">
    {contentpost.map((post) => (
      <div  key={post.id} className="Blog-family">
      <div className="Blog-post-header">
    <h5 >{post.Title.slice(0,45)}..</h5>

   
     
    </div>    
    <img className="Blog-Image" src={post.ImageUrl} />
    <p>{post.Body.slice(0,100)}...</p>
    <h6> {post.username}<br/>{post.timestamp && post.timestamp.toDate().toLocaleString()}</h6>

    <div className="Blog-foot">
    <Link to={`/SinglePost/${post.Docid}`}>
    <Button variant="success" >ReadMore</Button>

    </Link>
    {user && user.uid===post.userIdName ? 
         <h3 className='DeleteButton'> <GoTrashcan  onClick={() => {deletePost(post.Docid)}} /></h3>
       : null}
    <Link  to={`/UpdateBlog/${post.Docid}`}>

      {user && user.uid===post.userIdName ? 

        <h3 className="EditButton"><FiEdit /></h3>  
         : null} 
    </Link>
    </div>
  </div>
  
 
))}
  </div>
   </>
       )
 
}

export default Home