//Registration will be a class component, because it will need to do some logic
//Add logic (input) and state (store) will work together

import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        //it takes the user input and store it in state
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
        // e.preventDefault();
        axios
            .post("/registration", this.state)
            .then(( { data }) => {
                console.log("data", data);
                if(data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
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
            <div className="formField">
                <div className="form">
                    <header>
                        <h2>Registration</h2>
                        <p>
                            join millions of artisans sharing their experiences
                        </p>
                        {this.state.error && (
                            <p>
                                <span className="errorMessage">
                                    Something went wrong. Please try again
                                </span>
                            </p>
                        )}
                    </header>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        placeholder="First Name"
                        type="text"
                        required
                    />

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        placeholder="Last Name"
                        type="text"
                        required
                    />

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="Email"
                        type="text"
                        required
                    />

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <button onClick={(e) => this.handleClick(e)}>
                        Sign Up
                    </button>
                    <p>If you are already a member</p>
                    <Link to="/login">
                        <button className="log-in">Log In</button>
                    </Link>
                </div>
            </div>
        );
    }
}