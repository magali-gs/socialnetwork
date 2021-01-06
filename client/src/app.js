import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            profilePic: null,
            uploaderIsVisible: false
        };
    }
    
    componentDidMount() {
        axios.get('/profile').then(({ data }) => {
            this.setState({
                id: data.id,
                first: data.first_name,
                last: data.last_name,
                email: data.email,
                profilePic: data.profile_pic,
            });
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    toggleUploader={() => this.toggleUploader()}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={(e) => this.setImage(e)} />
                )}
            </div>
        );
    }
}