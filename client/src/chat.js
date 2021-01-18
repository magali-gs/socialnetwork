import { useSelector } from "react-redux";
import { socket } from './socket';

export default function Chat() {
    //1. retrieve chat messages from Redux and render them
    //be mindful that you might not have 'chatMessages' in redux.

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
            socket.emit('my new chat message', e.target.value);
        }
    };

    return (
        <div>
            <h1>Welcome to chatroom</h1>
            {chatMessages && chatMessages.map((msg) => (
                <p key={msg.id}>{msg.message}</p>
            ))}
            <textarea onKeyDown={handleKeyDown} />
        </div>
    );
}