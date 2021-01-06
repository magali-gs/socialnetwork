import React from "react";

export default function ProfilePic({ first, last, profilePic, toggleUploader }) {
    return (
        <div>
            <h1>
                ProfilePic: {first} {last}
            </h1>
            {!profilePic && (
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src="../default-img.png"
                    alt={`${first} ${last}`}
                />
            )}
            {profilePic && (
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src={profilePic}
                    alt={`${first} ${last}`}
                />
            )}
        </div>
    );
}
