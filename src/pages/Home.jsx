import React from 'react'
import { useEffect, useState } from 'react'
import databaseservice from '../appwrite/database'
// import Container from '../component/Container'
import Container from '../component/Container'
import Postcard from '../component/Postcard'
const Home = () => {
    const [posts, setposts] = useState(null)

    useEffect(() => {
        databaseservice.getposts().then((post) => setposts(post))
    }, [])
    if (posts.length === 0) {
        return (
            <div className='py-5'>
                <container>
                    <div>
                        No post Avialable
                    </div>
                </container>
            </div>
        )
    }
    else {
        <div className='py-5'>
            <Container>
                <div className='d flex'>
                    {posts.map((post)=>(
                        <Postcard key={post.$id} post={post}/>
                    ))}
                </div>
            </Container>
        </div>
    }
}

export default Home
