import { Button } from "react-bootstrap";
import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import { MdExitToApp } from 'react-icons/md'
import { BsGithub } from 'react-icons/bs'
import { BiMenu } from 'react-icons/bi'
import { useState } from "react";

const Chat = ({ messages, sendMessage, closeConnection, users, room }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = () => {
        closeConnection();
    }

    const handleToggleMenuClick = (e) => {
        setOpenMenu(!openMenu);
    }
    return (
        <div>
            <div className="d-flex justify-content-between mb-2">
                <div>
                    <Button className='toggle-menu' variant='danger' onClick={handleToggleMenuClick}>
                        <BiMenu />
                    </Button>
                </div>
                <div>
                    <a target='_blank' href="https://github.com/burakyuz1/ChatHub" className="github-link">
                        <BsGithub />
                    </a>
                    <Button className="leave-button" variant="danger" onClick={handleClick} >
                        <MdExitToApp />
                    </Button>

                </div>
            </div>
            <div className="chat row">
                <ConnectedUsers users={users} room={room} openMenu={openMenu} />
                <MessageContainer messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;