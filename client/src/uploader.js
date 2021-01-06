import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleClick() {
        console.log('props in uploader', this.props);
        this.props.setImage('I am an argument being passed from Uploader to App (use url for pic)');
    }

    render() {
        console.log('props in uploader', this.props);
        return (
            <div>
                <h1 onClick={() => this.handleClick()}>Uploader</h1>

            </div>
        );
    }
}