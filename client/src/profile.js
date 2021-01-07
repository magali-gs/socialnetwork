import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
// import BioEditor from './bioEditor'

export default function Profile(props) {
    console.log('props in profile component', props);
    return (
        <div className="profile-container">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                image={props.image}
            />
            <h3>
                {props.first} {props.last}
            </h3>
            <BioEditor setBio={props.setBio} bio={props.bio} />
        </div>
    );
}