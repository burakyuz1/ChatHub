import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        joinRoom(user, room);
    }

    return <div className='col-12 offset-0 col-sm-6 offset-sm-3'>
        <Form
            className='lobby'
            onSubmit={handleSubmit}>

            <h2 className='title'>Chat Hub</h2>

            <Form.Group className='input-wrapper'>
                <Form.Control placeholder='Name' onChange={(e) => setUser(e.target.value)} />
                <Form.Control className='mt-1' placeholder='Room' onChange={(e) => setRoom(e.target.value)} />
            </Form.Group>
            <Button className='mt-2 button-join' variant='success' type='submit' disabled={!user || !room}>Join to chat!</Button>
        </Form>
    </div>
}

export default Lobby;