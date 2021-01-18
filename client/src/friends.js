import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList, acceptFriend, unfriend } from "./actions";


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

    console.log(wannabes);
    console.log(friends);

    useEffect(() => {
        dispatch(getList());
    }, []);

    if (!friends && !wannabes) {
        return null;
    }

    return (
        <>
            <div className="container">
                <h1>Friends</h1>
                {friends.length > 0 && (
                    <div className="sub-container">
                        {friends.map((friend) => (
                            <div className="card" key={friend.id}>
                                <img
                                    src={
                                        friend["profile_pic"] ||
                                            "../default-img.png"
                                    }
                                    alt={`${friend["full_name"]}}`}
                                />
                                <h2>
                                    {`${friend["full_name"]}`}
                                </h2>
                                <button
                                    className="friendship"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="container">
                <h1>Wannabes</h1>
                {wannabes.length > 0 && (
                    <div className="sub-container">
                        {wannabes.map((wannabe) => (
                            <div className="card" key={wannabe.id}>
                                <img
                                    src={
                                        wannabe["profile_pic"] ||
                                        "../default-img.png"
                                    }
                                    alt={`${wannabe["first_name"]} ${wannabe["last_name"]}`}
                                />
                                <h2>
                                    {`${wannabe["first_name"]} ${wannabe["last_name"]}`}
                                </h2>
                                <button
                                    className="friendship"
                                    onClick={() =>
                                        dispatch(acceptFriend(wannabe.id))
                                    }
                                >
                                    Accept friend
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}