import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
// import BioEditor from './bioEditor'

export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                image={props.image}
            />
            <div className="bio-cropper">
                <h1>
                    {props.first} {props.last}
                </h1>
                <BioEditor setBio={props.setBio} bio={props.bio} />
            </div>
        </div>
    );
}