import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from './profile';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            email: "",
            bio: "",
            image: "",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/profile").then(({ data }) => {
            this.setState({
                id: data.id,
                first: data.first_name,
                last: data.last_name,
                email: data.email,
                bio: data.bio,
                image: data.profile_pic,
            });
            console.log(this.state);
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            image: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <ProfilePic
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    image={this.state.image}
                    toggleUploader={() => this.toggleUploader()}
                />
                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    image={this.state.image}
                    toggleUploader={() => this.toggleUploader()}
                    bio={this.state.bio}
                    setBio={(e) => this.setBio(e)}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={(e) => this.setImage(e)} />
                )}
            </div>
        );
    }
}