import React from 'react'
import { useState,useEffect } from 'react'
import databaseservice from '../appwrite/database'
import Postform from '../component/Postform'
import { useNavigate, useParams } from 'react-router-dom'
import  Container from'../component/Container'
const Editpost = () => {
     const{url}=useParams();
     const [post, setpost] = useState(null)
     const navigate=useNavigate();
     useEffect(()=>{
        if(url){
            databaseservice.getpost(url)
            .then((post)=>setpost(post))
        }else{
            navigate('/')
        }
     },[url])
  return post?(
    <div className='py-5'>
      <Container>
          <Postform post={post}/> 
      </Container>
    </div>
  ):null
}

export default Editpost
