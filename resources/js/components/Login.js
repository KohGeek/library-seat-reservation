import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form } from "reactstrap";
import axios from "axios";

export default class Login extends Component{

    constructor(){
        super();
        this.state ={
            userData:{email:"", password:""}
        }
    }



  

    login(){
        
        // axios.get("http://127.0.0.1:8000/api/users/email/{"+email+"}/password/{"+password+"}");
        axios.get("http://127.0.0.1:8000/api/users", this.state.userData);

    }

    render(){
        const { email } = this.state;
        return (
            <div className="container">
               

                <div className="login">
                    <h2>Login</h2>
                    <Form className="form">
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type = "email"
                                name = "email"
                                id   = "email"
                                placeholder = "example@example.com"
                                value ={this.state.userData.email}
                                onChange = {(e) => {
                                    let {userData} = this.state
                                    userData.email = e.target.value
                                    this.setState({userData})
                                }}
                                />
                        </FormGroup>
                        <FormGroup>
                        <Label for="password">Password</Label>
                            <Input
                                type = "password"
                                name = "password"
                                id   = "password"
                                placeholder = "*********"
                                value ={this.state.userData.password}
                                onChange = {(e) => {
                                    let {userData} = this.state
                                    userData.password = e.target.value
                                    this.setState({userData})
                                }}
                                />
                        </FormGroup>
                        <Button onClick={this.login.bind(this)}>Login</Button>
                    </Form>
                </div>


            </div>
            
        );
    }
}



if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
