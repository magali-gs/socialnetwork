import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from './profile';
import OtherProfile from "./otherPorfile";
import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            email: "",
            bio: "",
            image: "",//definir a default image aqui!!
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/profile.json")
            .then(({ data }) => {
                this.setState({
                    id: data.id,
                    first: data.first_name,
                    last: data.last_name,
                    email: data.email,
                    bio: data.bio,
                    image: data.profile_pic,
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
            image: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        //online for test purposes
        if(!this.state.id) {
            return null;
        }

        return (
            <BrowserRouter>
                <div>
                    {/* <Logo /> */}
                    <h1>App</h1>
                    <ProfilePic
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        image={this.state.image}
                        toggleUploader={() => this.toggleUploader()}
                    />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                toggleUploader={() => this.toggleUploader()}
                                bio={this.state.bio}
                                setBio={(e) => this.setBio(e)}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                match={props.match}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
                    />

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            image={this.state.image}
                            setImage={(e) => this.setImage(e)}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}