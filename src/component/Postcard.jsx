import React from 'react'
// import authservice from '../appwrite/auth'
import databaseservice from '../appwrite/database'
import { Link } from 'react-router-dom'

const Postcard = ({$id,title,featuredimage}) => {
  return (
   //for clickable use Link
   <Link to={`/post/${$id}`}>
    <div>
        <div>
            <img src={databaseservice.getfile(featuredimage)} alt={title} />
        </div>
        <h2>{title}</h2>
    </div>
   </Link>
  )
}

export default Postcard
