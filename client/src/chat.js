import { useSelector } from "react-redux";
import { socket } from './socket';

export default function Chat() {
    //1. retrieve chat messages from Redux and render them
    const chatMessages = useSelector(
        (state) =>
            state &&
            state.chatMessages);
    
    console.log("chatMessages", chatMessages);        

    //2. post new messages
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            console.log('user pressed enter key');
            //send message off to server using sockets instead of axios
            //socket.emit will send a message to the server
            socket.emit('New message', e.target.value);
        }
    };

    return (
        <div>
            <h1>Welcome to chatroom</h1>
            {chatMessages &&
                chatMessages.map((msg) => (
                    <div key={msg.id}>
                        <p>{`${msg["first_name"]} ${msg["last_name"]}`}</p>
                        <img
                            className="profile-img"
                            src={msg["profile_pic"] || "../default-img.png"}
                            alt={`${msg["first_name"]} ${msg["last_name"]}`}
                        />
                        <p>{msg.message}</p>
                        <p>{msg["create_at"]}</p>
                    </div>
                ))}
            <textarea onKeyDown={handleKeyDown} />
        </div>
    );
}