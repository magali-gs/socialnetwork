//Registration will be a class component, because it will need to do some logic
//Add logic (input) and state (store) will work together

import { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        //it takes the user input and store it in state
        // console.log("event object: ", e);
        // console.log("event object: e.target.value", e.target.value);
        // console.log("event object: e.target.name", e.target.name);

        //add the input's info to state
        this.setState({
            //name of input field: user input field
            [e.target.name]: e.target.value,
        }, 
        () => console.log("this.state in handleChange: ")
        );
    }

    handleClick(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios
            .post("/registration", this.state)
            .then(() => {
                location.replace("/");
            })
            .catch((error) => {
                console.log("error on axios.post /registration: ", error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Registration</h1>
                {this.state.error && <p>Something went wrong. Please try again</p>}
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    placeholder="First name"
                    type="text"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    placeholder="Last name"
                    type="text"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="Email"
                    type="text"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <button onClick={(e) => this.handleClick(e)}>Submit</button>
            </div>
        );
    }
}