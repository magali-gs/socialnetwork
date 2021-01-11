import React from "react";

export default function ProfilePic({ first, last, image, toggleUploader }) {
    return (
        <>
            {!image && (
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src="../default-img.png"
                    alt={`${first} ${last}`}
                />
            )}
            {image && (
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src={image}
                    alt={`${first} ${last}`}
                />
            )}
        </>
    );
}
