import { userSelector } from "react-redux";
import { socket } from './socket';

export default function Chat() {
    //1. retrieve chat messages from Redux and render them
    //be mindful that you might not have 'chatMessages' in redux.
    const chatMessages = userSelector => (state && state.chatMessages);

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
        <>
            <h1>Welcome to chatroom</h1>
            <div className="chat-container">
                <p>dummy message...</p>
                <p>dummy message...</p>
                <p>dummy message...</p>
                <p>dummy message...</p>
            </div>
            <textarea onKeyDown={handleKeyDown}/>
        </>
    );
}