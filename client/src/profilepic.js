import React from "react";

export default function ProfilePic({ first, last, image, toggleUploader }) {
    return (
        <>
            {!image && (
                <div className="img-wrapper">
                    <img
                        onClick={() => toggleUploader()}
                        className="profile-img default"
                        src="../default-img.png"
                        alt={`${first} ${last}`}
                    />
                </div>
            )}
            {image && (
                <div className="img-wrapper">
                    <img
                        onClick={() => toggleUploader()}
                        className="profile-img"
                        src={image}
                        alt={`${first} ${last}`}
                    />
                </div>
            )}
        </>
    );
}
