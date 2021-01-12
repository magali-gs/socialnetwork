import { Component } from "react";
import axios from "./axios";
import FriendButton from './friendButton';

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {
            otherUserId: "",
            first: "",
            last: "",
            email: "",
            bio: "",
            image: "",
            userId: ""

        };
    }

    componentDidMount() {
        axios.get("/member/" + this.props.match.params.id)
            .then(({ data }) => {
                if (this.props.match.params.id == data.loggedId) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        otherUserId: data.id,
                        first: data.first_name,
                        last: data.last_name,
                        email: data.email,
                        bio: data.bio,
                        image: data.profile_pic,
                        userId: data.loggedId,
                    });
                }
            }).catch((error) => {
                console.log('error', error);
                //redirecionar para pagina de error customizada
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <div className="profile">
                {!this.state.image && (
                    <img
                        className="profile-img"
                        src="../default-img.png"
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                )}
                {this.state.image && (
                    <img
                        className="profile-img"
                        src={this.state.image}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                )}
                <div className="bio-cropper">
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <p>{this.state.bio}</p>
                </div>
                <FriendButton
                    otherUserId={this.state.otherUserId}
                    userId={this.state.userId}
                />
            </div>
        );
    }
}