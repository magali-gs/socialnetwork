// import React from "react";

//with descontructor
export default function ProfilePic({ first, last, profilePic }) {
    console.log("props in ProfilePic: ", first, last, profilePic);
    let picUrl;
    if(!profilePic) {
        picUrl = "../default-img.png";
    } else {
        picUrl = profilePic;
    }

    return (
        <div>
            <h1>
                ProfilePic: {first} {last}
            </h1>
            <img
                className={picUrl}
                src="../default-img.png"
                alt={`${first} ${last}`}
            />
        </div>
    );
}
