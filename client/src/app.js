import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        // hard code, make it dynamic with the data from the diMounted
        this.state = {
            profilePic: null,
            uploaderIsVisible: false
        };
    }
    
    componentDidMount() {
        console.log('App mounted!');
        axios.get('/profile').then(({ data }) => {
            console.log('data', data);
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
        // console.log('toggle uploader is running');
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        console.log("newProfilePic", newProfilePic);
        this.setState({
            profilePic: 'whatever the new profile pic is',
        });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <ProfilePic 
                    first={this.state.first} 
                    last={this.state.last} 
                />
                <h2 onClick={() => this.toggleUploader()}>Click here</h2>
                {this.state.uploaderIsVisible && (<Uploader setImage={(e) => this.setImage(e)}/>)}
            </div>
        );
    }
}