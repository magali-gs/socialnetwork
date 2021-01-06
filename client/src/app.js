import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        // hard code, make it dynamic with the data from the diMounted
        this.state = {
            first: 'Magali',
            last: 'Silva',
            email: 'email',
            id: 'id',
            uploaderIsVisible: false
        };
    }
    

    componentDidMount() {
        console.log('App mounted!');
    }

    toggleUploader() {
        // console.log('toggle uploader is running');
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
        // if(!this.state.uploaderIsVisible) {
        //     this.setState({
        //         uploaderIsVisible: true,
        //     });
        // } else {
        //     this.setState({
        //         uploaderIsVisible: false,
        //     });
        // }
    }

    setImage(newProfilePic) {
        console.log("newProfilePic", newProfilePic);
        this.setState({
            profilePic: 'whatever the new profile pic is',
        });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <ProfilePic 
                    first={this.state.first} 
                    last={this.state.last} 
                />
                <h2 onClick={() => this.toggleUploader()}>Click here</h2>
                {this.state.uploaderIsVisible && (<Uploader setImage={(e) => this.setImage(e)}/>)}
            </div>
        );
    }
}