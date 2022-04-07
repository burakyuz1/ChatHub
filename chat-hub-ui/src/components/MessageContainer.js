import { useEffect, useRef } from "react";

const MessageContainer = ({ messages }) => {

    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0,
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages])
    return <div ref={messageRef} className="message-container col-9">
        {messages.map((message, index) =>
            <div key={index} className={`${message.user === 'ChatHub Bot' ? 'bot-message-center' : message.fromMe ? ' user-message-right' : 'user-message-left'}`}>
                <div className={"message"}>
                    {message.message}
                </div>
                <div className="from-user">
                    {message.user}
                </div>
            </div>
        )}
    </div>
}

export default MessageContainer;