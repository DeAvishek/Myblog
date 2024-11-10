import React from 'react'
import databaseservice from '../appwrite/database'
import Postcard from '../component/Postcard'
import { useEffect,useState } from 'react'
import Container from '../component/Container'
const Allpost = () => {
    const [posts, setposts] = useState([])

    useEffect(()=>
    {
        databaseservice.getposts([])
        .then((post)=>setposts(post))
    })
      return posts? (
    <div className='py-5'>
      <Container>
        {posts.map((post)=>(
            <Postcard key={post.$id} post={post}/>
        ))}
      </Container>
    </div>
  ):<div><b>No posts are Available</b></div>;
}

export default Allpost
