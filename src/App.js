import React from 'react'
import Posts from './components/Posts.js';
import Login from './components/Login.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import LoginProvider from './contexts/LoginProvider.js';
import { UserNavbar } from './components/UserNavbar.js';
import PostsProvider from './contexts/PostsProvider.js';



function App() {
  const [currentId, setCurrentId] = useLocalStorage('currentId')
  const [users, setUsers] = useLocalStorage('users')
  

  return (
    <>
      <LoginProvider currentId={currentId}>
        <PostsProvider currentId={currentId}>
          <UserNavbar onSignOut={(e) => setCurrentId(e)}/>
          {
            currentId ? 
            <Posts /> : 
            <Login onSubmit={setCurrentId}/>
          }

        </PostsProvider>
        
      </LoginProvider>

    </>
    
      
  );
}

export default App;
