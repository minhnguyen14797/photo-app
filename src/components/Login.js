import React, { useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import { useLoginContext } from '../contexts/LoginProvider.js'

export default function Login({onSubmit}) {

    const [uuid, setUuid] = useState('')
    const { createUser, verifyUser } = useLoginContext()
    const uuidRef = useRef()
    const nameRef = useRef()

    function handleCreate(e) {
        e.preventDefault()
        const name = nameRef.current.value
        createUser({uuid, name})
        onSubmit(uuid)
    }

    function handleSubmit(e) {
        e.preventDefault()
        verifyUser(uuidRef.current.value) ? 
            onSubmit(uuidRef.current.value) : 
            console.log('false')
    }

    return (
        <> 
            <Form 
                className='d-flex flex-column align-items-center justify-content-center py-4'
                onSubmit={handleCreate}>
                <h1>Create an account</h1>
                <Form.Group className='w-50'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        ref={nameRef}
                        required />
                    <Form.Text className='text-muted'>
                        Your name will be appear to other people.
                    </Form.Text>
                </Form.Group>
                <Form.Group className='w-50 mt-2'>
                    <Form.Label>UUID</Form.Label>
                    <Form.Control 
                        type='text'
                        value={uuid}
                        disabled
                        required />
                </Form.Group>
                <Form.Group className='mt-3 d-flex flex-row w-50'>
                    <Button 
                        onClick={() => {setUuid(uuidv4())}}
                        variant='secondary'
                        className='me-5'>
                        Generate new UUID
                    </Button>
                    <Button 
                        type='submit' 
                        variant='warning'>
                        Create an Account
                    </Button>
                </Form.Group>
            </Form>

            <Form 
                className='d-flex flex-column align-items-center justify-content-center mt-5 py-4 border-top'
                onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Form.Group className='w-50'>
                    <Form.Label>UUID</Form.Label>
                    <Form.Control 
                        type='password'
                        ref={uuidRef}
                        required />
                </Form.Group>
                <Form.Group className='mt-3 d-flex flex-row w-50'>
                    <Button 
                        type='submit'>
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}
