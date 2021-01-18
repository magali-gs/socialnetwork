import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                image={props.image}
            />
            <div className="bio-cropper">
                <h1>
                    {props.full_name}
                </h1>
                <BioEditor setBio={props.setBio} bio={props.bio} />
            </div>
        </div>
    );
}