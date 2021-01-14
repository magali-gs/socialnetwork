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
            {friends.length > 0 && (
                <div className="friends">
                    <h1>Friends</h1>
                    {friends.map((friend) => (
                        <div className="friend" key={friend.id}>
                            {friend["profile_pic"] && (
                                <img
                                    src={friend["profile_pic"]}
                                    alt={`${friend["first_name"]} ${friend["last_name"]}`}
                                />
                            )}
                            {!friend["profile_pic"] && (
                                <img
                                    src="../default-img.png"
                                    alt={`${friend["first_name"]} ${friend["last_name"]}`}
                                />
                            )}
                            <p>
                                {`${friend["first_name"]} ${friend["last_name"]}`}
                            </p>
                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {wannabes.length > 0 && (
                <div className="wannabes">
                    <h1>Wannabes</h1>
                    {wannabes.map((wannabe) => (
                        <div className="wannabe" key={wannabe.id}>
                            {wannabe["profile_pic"] && (
                                <img
                                    src={wannabe["profile_pic"]}
                                    alt={`${wannabe["first_name"]} ${wannabe["last_name"]}`}
                                />
                            )}
                            {!wannabe["profile_pic"] && (
                                <img
                                    src="../default-img.png"
                                    alt={`${wannabe["first_name"]} ${wannabe["last_name"]}`}
                                />
                            )}
                            <p>
                                {`${wannabe["first_name"]} ${wannabe["last_name"]}`}
                            </p>
                            <button
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
        </>
    );
}