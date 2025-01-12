import React from 'react'
import { getAllPosts } from '../../lib/golfforum'

export default async function golforum() {

  const response = await fetch('http://localhost:3000/api/golfforum')
  const golfPosts = await response.json()
  const golfPostArray = golfPosts.data

  console.log(golfPosts.data);
    
  

  return (
    <div>
        <h1>Golf Forum</h1>
        <p>Here are the latest posts:</p>
        <div>
            {golfPostArray.map((post) => (
              
            <div key={post.id} className='flex flex-col border p-4 my-4'>
                <strong>{post.name}</strong> - {post.date}
                <p>{post.text}</p>
            </div>
            ))}
        </div>
    </div>
  )
}
