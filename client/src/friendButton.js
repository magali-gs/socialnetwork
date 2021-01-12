import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId, userId }) {
    console.log("props in friend button  props.otherUserId", otherUserId, userId);
    // const [otherUserId, setOtherUserId] = useState(props);
    const [buttonTxt, setButtonTxt] = useState("Friend Button");

    function handleClick(e) {
        console.log("handleClick", e.target.formAction);
        e.preventDefault();
    }

    useEffect(() => {
        axios.get("/friendship-status/" + otherUserId)
            .then(({ data }) => {
                console.log("get request /friendship", data);
                const text = friendshipStatusButtonTxt(data, userId);

                setButtonTxt(text);

            }).catch((error) => {
                console.log("error in /friendship-status/", error);
            });
    }, [otherUserId]);


    return <button 
        onClick={(e) => handleClick(e)}
        name='test'>
        {buttonTxt}</button>;
}

function friendshipStatusButtonTxt(friendshipStatus, userId) {
    const { senderId, recipientId, accepted } = friendshipStatus;
    if (friendshipStatus.length == 0) {
        return "Make friend request";
    } else if (accepted) {
        return "Unfriend";
    } else if (!accepted && recipientId == userId) {
        return "Cancel friend request";
    } else if (!accepted && !recipientId == userId) {
        return "Accept friend request";
    }
}
