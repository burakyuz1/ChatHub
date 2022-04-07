import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import { IoSend } from 'react-icons/io5'

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return <Form className="send-message-form" onSubmit={handleSubmit}>
        <InputGroup className='row ms-0 me-0'>
            <div className="col-10 col-sm-11 ps-0">
                <FormControl placeholder="Your message..." onChange={handleChange} value={message} />
            </div>
            <div className="col-2 col-sm-1 p-0">
                <Button className="send-button"  variant="success" type="submit" disabled={!message}>
                    <IoSend />
                </Button>
            </div>
        </InputGroup>
    </Form>
}

export default SendMessageForm;