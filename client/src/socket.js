import io from "socket.io-client";
import { postMessage, addRecentMessages } from "./actions";

export let socket;

export const init = store => {
    if(!socket) {
        socket = io.connect();
    }
    //some socket stuff will go here
    //this file will RECEIVE messages from the SERVER
    // socket.on("new message and user", (userAndMessage) => {
    //     //do something
    //     //hand over to redux
    //     //in other words.. we need to dispach an action
    //     store.dispatch(postMessage(userAndMessage));
    // });

    socket.on("Most recent messages", (mostRecents) => {
        //do something
        //this runs when a new user connects (logs in)
        store.dispatch(addRecentMessages(mostRecents));
    });

    // socket.on("someEvent", (payload) => {
    //     //do something
    // });
};