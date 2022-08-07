import React, { useState } from 'react'
import { Nav, Navbar, Modal } from 'react-bootstrap'
import { usePostsContext } from '../contexts/PostsProvider.js'
import NewPost from './NewPost.js'

export function UserNavbar({ onSignOut }) {

    const { currentUser } = usePostsContext()

    function handleSignOut() {
        onSignOut(null)
    }

    const [modalOpen, setModalOpen] = useState(false)
    function closeModal() {
        setModalOpen(false)
    }

    function NavElements() {
        if (currentUser) {
            return (
                <>
                    <Navbar.Brand>Welcome back, {currentUser.name}</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => setModalOpen(true)}>Add New Post</Nav.Link>
                        <Nav.Link onClick={handleSignOut}>Sign out</Nav.Link>
                    </Nav>

                    <Modal show={modalOpen} onHide={closeModal}>
                        <NewPost closeModal={closeModal} />
                    </Modal>
                </>
            )
        } 
        return (
            <Navbar.Brand>Login</Navbar.Brand>
        )
    }


    return (
        <Navbar 
            bg='dark' 
            variant='dark'
            className='px-5'> 
            <NavElements />
        </Navbar>
    )
}
