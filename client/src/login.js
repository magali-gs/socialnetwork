import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ")
        );
    }

    handleClick(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios.post("/welcome/login", this.state)
            .then(({ data }) => {
                console.log("data ", data);
                if (data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            }).catch((error) => {
                console.log("error on axios.post /login: ", error);
            });
    }

    render() {
        return (
            <div className="loginField">
                <h1>Login</h1>
                {this.state.error && (
                    <p className="errorMessage">
                        Something went wrong. Please try again
                    </p>
                )}
                <div className="formField">
                    <label>
                        Email
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            placeholder="Email"
                            type="text"
                        />
                    </label>
                    <label>
                        Password
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                    </label>
                    <button onClick={(e) => this.handleClick(e)}>Submit</button>
                </div>
                {/* create a Link to reset-password */}
                <Link to="/">Click here to Register!</Link>
                <Link to="/reset-password">Reset password!</Link>
            </div>
        );
    }
}