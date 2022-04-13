import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
    Form,
} from "reactstrap";
import axios from "axios";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            userData: { email: "", password: "" },
        };
    }

    login() {
        // axios.get("http://127.0.0.1:8000/api/users/email/{"+email+"}/password/{"+password+"}");
        axios.get("http://127.0.0.1:8000/api/users", this.state.userData);
    }

    render() {
        const { email } = this.state;
        return (
            <div className="container">
                <div className="top_banner">
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            margin: 20,
                            borderRadius: 100,
                        }}
                        source={require("../../../images/profileicon.png")}
                    />
                </div>
            </div>
        );
    }
}

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
