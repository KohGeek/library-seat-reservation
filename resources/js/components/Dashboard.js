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

    // login() {
    //     // axios.get("http://127.0.0.1:8000/api/users/email/{"+email+"}/password/{"+password+"}");
    //     axios.get("http://127.0.0.1:8000/api/users", this.state.userData);
    // }

    render() {
        const { email } = this.state;
        return (
            <div className="container">
                <div className="top_banner">
                    <img
                        style={{
                            width: 150,
                            height: 150,
                            //margin: 200,
                            marginRight: 200,
                            //marginRight:0,
                            borderRadius: 100,
                        }}
                        src="{{asset('images/profileicon.png')}}"
                    ></img> 
                    <div className="welcome_msg">
                        <h1 style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "left",
                                margin: 10,
                                color: "black",
                            }}>
                                Welcome 
                            </h1>
                    </div>
                </div>
               
            </div>
        );
    }
}

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
