import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useLoginContext } from './LoginProvider.js'


const PostsContext = React.createContext()

export function usePostsContext() {
    return useContext(PostsContext)
}

export default function PostsProvider({children}) {

    const [posts, setPosts] = useLocalStorage('posts', [])
    const { getUserInfo } = useLoginContext()
    const currentUser = getUserInfo()

    function addLike(postIndex) {
        const tempPosts = [...posts]
        let editPost = tempPosts[postIndex]
        if (editPost.like.length > 0) {
            const likeIndex = editPost.like.findIndex(e => e.uuid === currentUser.uuid)
            if (likeIndex != -1) {
                editPost.like.splice(likeIndex, 1)
            } else {
                editPost.like.push(currentUser)
            }} else {
            editPost.like.push(currentUser)
        }
        setPosts(tempPosts)
    }
    

    function addNewPost( url, caption ) {
        setPosts((prev) => [
            ...prev,
          {
            author: currentUser,
            photoUrl: url,
            like: [],
            caption: caption,
            date: Date.now()
          }
          
        ])
      }

    return (
        <PostsContext.Provider value={{ currentUser, addNewPost, posts, addLike }}>
            {children}
        </PostsContext.Provider>
    )
}