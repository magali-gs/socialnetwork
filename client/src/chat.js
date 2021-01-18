import { useSelector } from "react-redux";
import { socket } from './socket';
import { useRef } from "react";
import { FaArrowCircleUp } from "react-icons/fa";


export default function Chat() {
    //1. retrieve chat messages from Redux and render them
    const chatMessages = useSelector(
        (state) =>
            state &&
            state.chatMessages);
    
    //2. post new messages
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            //send message off to server using sockets instead of axios
            //socket.emit will send a message to the server
            socket.emit('New message', e.target.value);
        }
    };

    const elemRef = useRef();


    if (!chatMessages) {
        return null;
    }

    return (
        <div id="chat-messages" ref={elemRef}>
            <h1>Welcome to chatroom</h1>
            {chatMessages &&
                chatMessages.map((msg) => (
                    <div key={msg.id}>
                        <p>{`${msg["full_name"]}`}</p>
                        <img
                            className="profile-img"
                            src={msg["profile_pic"] || "../default-img.png"}
                            alt={`${msg["full_name"]}`}
                        />
                        <p>{msg.message}</p>
                        <p>{msg["create_at"]}</p>
                    </div>
                ))}
            <textarea onKeyDown={handleKeyDown} />
            <FaArrowCircleUp className="scrollTop" />
        </div>
    );
}