import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const LoginContext = React.createContext()

export function useLoginContext() {
    return useContext(LoginContext)
}

export default function LoginProvider({currentId, children}) {
    
    const [users, setUsers] = useLocalStorage('users')

    function getUserInfo() {
        if (users) {
            const currentUser = users.filter(user => user.uuid == currentId)[0]
            return currentUser
        }
    }

    function createUser({name, uuid}) {
        if (users == null) {
            return setUsers([{name, uuid}])
        } else {
            return setUsers(previousUsers => [...previousUsers, {name, uuid}])
        }
    }

    function verifyUser(uuid) {
        if (users == null) return
        return users.find(user => user.uuid === uuid)
    }
    

    return (
        <LoginContext.Provider value={{ getUserInfo, createUser, verifyUser }}>
            {children}
        </LoginContext.Provider>
    )
}
