import React from "react";

export default function ProfilePic({ first, last, image, toggleUploader }) {
    return (
        <div className='image-cropper'>
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
        </div>
    );
}
