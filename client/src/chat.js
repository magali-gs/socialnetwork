import { useSelector,  } from "react-redux";
import { socket } from './socket';
import { useRef, useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";


export default function Chat() {
    const elemRef = useRef();
    //1. retrieve chat messages from Redux and render them
    const chatMessages = useSelector((state) => state && state.chatMessages);
    //2. post new messages
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            //send message off to server using sockets instead of axios
            //socket.emit will send a message to the server
            socket.emit("New message", e.target.value);
        }
    };

    // useEffect(() => {
    // }, []);

    function scrollTop() {
        elemRef.current.scrollTop;
        console.log("elemRef.current.scrollTop", elemRef.current.scrollTop);
    }

    if (!chatMessages) {
        return null;
    }

    return (
        <>
            <h1 ref={elemRef}>Welcome to chatroom</h1>
            <div id="chat-container">
                {chatMessages &&
                    chatMessages.map((msg) => (
                        <div key={msg.id} className="message-container">
                            <img
                                className="profile-img"
                                src={msg["profile_pic"] || "../default-img.png"}
                                alt={`${msg["full_name"]}`}
                            />
                            <p className="user">
                                {`${msg["full_name"]}`}{" "}
                                <span className="timestamp">
                                    {msg["create_at"]}
                                </span>
                            </p>
                            <p>{msg.message}</p>
                        </div>
                    ))}
                <textarea 
                    onKeyDown={handleKeyDown} />
                <FaArrowCircleUp onClick={scrollTop} className="scrollTop" />
            </div>
        </>
    );
}