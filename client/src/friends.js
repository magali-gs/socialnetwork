import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "./actions";


export default function Friends() {
    const dispatch = useDispatch();
    const wannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((wannabe) => wannabe.accepted == false)
    );

    const friends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friend) => friend.accepted == true)
    );

    console.log(friends);

    useEffect(() => {
        dispatch(getList());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <>
            <div className="friends">
                <h1>Friends</h1>
                {friends.map((friend) => (
                    <div className="friend" key={friend.id}>
                        {friend["profile_pic"] && (
                            <img src={friend["profile_pic"]} />
                        )}
                        {!friend["profile_pic"] && (
                            <img src="../default-img.png" />
                        )}
                        <p>
                            {friends[0]["first_name"]} {friends[0]["last_name"]}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}