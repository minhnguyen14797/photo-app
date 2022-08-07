import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { useLoginContext } from '../contexts/LoginProvider.js'
import { usePostsContext } from '../contexts/PostsProvider.js'


export default function Posts() {
  
  const { getUserInfo } = useLoginContext()
  const currentUser = getUserInfo()
  const { posts, addLike } = usePostsContext()


  function handleLike(postIndex) {
    addLike(postIndex)
  }

  function checkLikeStatus(postIndex) {
    const status = posts[postIndex].like.findIndex(e => e.uuid === currentUser.uuid)
    if (status != -1) {
      return 'danger'
    } return 'outline-secondary'
  }
  

  return (
    <div className='p-5'>
      {posts.map((post, index) => {
        return (
          <div key={index} 
            className='d-flex flex-column border-bottom 
            justify-content-center align-items-center'> 

            <div className='w-25 d-flex flex-column'
            style={{minWidth: '400px'}}>
              <Image 
                src={post.photoUrl}
                className='fuild'
              />

              <div>
                <p>Posted by {post.author.name}</p>
                <Button 
                    variant={`${checkLikeStatus(index)}`} 
                    className='btn-sm'
                    onClick={() => handleLike(index)}>
                    Like
                </Button>
                <span className='mx-2'>
                  {post.like.length} {post.like.length >= 2 ? 'likes' : 'like'}
                </span>
                <p className='text-muted'>{post.caption}</p>
                <p className='text-muted'>{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        )
      }).reverse()}

    </div>
    
  )
}

function formatDate(date) {
  const e = new Date(date)
  const options = { weekday: 'long', year: 'numeric', month: 'long', 
                    day: 'numeric', hour: 'numeric', minute: 'numeric',
                    timeZoneName: 'short'
                  };
  return `${e.toLocaleDateString(undefined, options)}`
}