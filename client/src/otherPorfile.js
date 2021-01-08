import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            first: '',
            last: '',
            email: '',
            bio: '',
            image: ''
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
                <h1>
                    My name is {this.state.first} {this.state.last}
                </h1>
                <h2>I am another profile</h2>
            </div>
        );
    }
}