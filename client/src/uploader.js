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
                    this.toggleUploader();
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
        return (
            <div className='overlay'>
                <div className="uploadModal formField">
                    <header>
                        <h2>Uploader</h2>
                        {this.state.error && (
                            <p className="errorMessage">
                                Something went wrong. Please try again
                            </p>
                        )}
                    </header>
                    <div className="form">
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="image"
                            placeholder="Profile Picture"
                            type="file"
                            accept="image/*"
                            className="inputfile"
                        />
                        <button onClick={(e) => this.handleUpload(e)}>
                            Update
                        </button>
                        <button
                            className="close"
                            onClick={() => this.props.toggleUploader()}
                        >
                            Close modal
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}