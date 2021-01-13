import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId, userId }) {
    const [buttonTxt, setButtonTxt] = useState("Friend Button");

    useEffect(() => {
        axios.get("/friendship-status/" + otherUserId)
            .then(({ data }) => {
                const text = friendshipStatusButtonTxt(data, userId);
                setButtonTxt(text);
            }).catch((error) => {
                console.log("error in /friendship-status/", error);
            });
    }, [otherUserId]);

    function handleClick(e) {
        console.log("handleClick", e.target.name);
        e.preventDefault();
        axios.post("/friendship-action", {action: buttonTxt, otherUserId: otherUserId})
            .then(() => {
                console.log("post requets to /friendship-action");
            });
    }

    return (
        <button onClick={(e) => handleClick(e)} name={buttonTxt}>
            {buttonTxt}
        </button>
    );
}

function friendshipStatusButtonTxt(friendshipStatus, userId) {
    if (friendshipStatus.length === 0) {
        return "Make friend request";
    } else {
        const { recipient_id, accepted } = friendshipStatus[0];
        if (accepted) {
            return "Unfriend";
        } else if (!accepted && recipient_id == userId) {
            return "Accept friend request";
        } else if (!accepted && recipient_id !== userId) {
            return "Cancel friend request";
        }
    }
}
