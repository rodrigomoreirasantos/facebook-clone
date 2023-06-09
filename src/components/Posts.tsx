import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { db } from '../../firebase'
import Post from './Post'

function Posts() {
  const [realtimePost] = useCollection(
    collection(db, 'posts')
  )
  
    return (
    <div>
        {realtimePost?.docs.map(post => (
            <Post 
                key={post.id} 
                name={post.data().name}
                message={post.data().message}
                email={post.data().email}
                timestamp={post.data().timestamp}
                image={post.data().image}
                postImage={post.data().postImage}
            />
        ))}
    </div>
  )
}

export default Posts