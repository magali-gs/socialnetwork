import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                image: e.target.files[0],
            },
            () => console.log("this.state in handleChange: ", e.target.files[0])
        );
    }

    handleUpload(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("image", this.state.image);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                console.log("data", data);
                if (data.sucess) {
                    this.props.setImage(data.url);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            }).catch((error) => {
                console.log('error ', error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        console.log("props in uploader", this.props);
        return (
            <div>
                <h1>Uploader</h1>
                {this.state.error && (
                    <p className="errorMessage">
                        Something went wrong. Please try again
                    </p>
                )}
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="image"
                    placeholder="Profile Picture"
                    type="file"
                    accept="image/*"
                />
                <button onClick={(e) => this.handleUpload(e)}>Update</button>
            </div>
        );
    }
}