import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { usePostsContext } from '../contexts/PostsProvider.js'

export default function NewPost({ closeModal }) {

    const photoUrl = useRef()
    const caption = useRef()
    const { addNewPost } = usePostsContext()

    function handleSubmit(e) {
        e.preventDefault()
        addNewPost(photoUrl.current.value, caption.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body className='py-4'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Photo URL</Form.Label>
                        <Form.Control placeholder='URL' ref={photoUrl} required />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Caption</Form.Label>
                            <Form.Control
                                as='textarea'
                                style={{resize: 'none', 
                                        height: '200px'}}
                                placeholder='Enter a caption (optional)'
                                ref={caption} />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type='submit'
                        className='mt-2 float-end w-25'>
                        Post
                    </Button>       
                </Form>
            </Modal.Body>
        </>
  )
}
