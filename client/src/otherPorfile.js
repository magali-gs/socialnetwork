import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        axios.get("/member/" + this.props.match.params.id).then(({ data }) => {
            console.log("res", data);
            if (this.props.match.params.id == data.loggedId) {
                this.props.history.push("/");
            } else {
                this.setState({
                    id: data.id,
                    first: data.first_name,
                    last: data.last_name,
                    email: data.email,
                    bio: data.bio,
                    image: data.profile_pic,
                });
            }
        });
  
    }

    render() {
        return (
            <div>
                <h1>Other profile</h1>
                <h2>I am another profile</h2>
            </div>
        );
    }
}