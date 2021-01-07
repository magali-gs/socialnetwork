import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";
// import BioEditor from './bioEditor'

export default function Profile(props) {
    console.log('props in profile component', props);
    return (
        <div>
            <h1>USER PROFILE COMPONENTE</h1>
            <h3>
                Hello my name is {props.first} {props.last}
            </h3>
            <ProfilePic 
                toggleUploader={props.toggleUploader} 
                image={props.image} 
            />
            <BioEditor 
                setBio={props.setBio}
                bio={props.bio} 
            />
        </div>
    );
}