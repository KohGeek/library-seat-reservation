import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form } from "reactstrap";
import axios from "axios";

export default class Login extends Component{

    constructor(){
        super();
        this.state ={
            email :'',
            password:'',
            validate:{
                emailState:'',
                passwordState:'',
            }
        }
    }



    componentWillMount(){
        this.setState({
            userDatas: [],
            loginUserData: {email:"", password:""},

        })
    }

    login(){
        
        axios.get("http://127.0.0.1:8000/api/users").then((response) => {
           
        });
    }

    render(){
        const { email } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login Component</div>

                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>

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
                                />
                        </FormGroup>
                        <FormGroup>
                        <Label for="password">Password</Label>
                            <Input
                                type = "password"
                                name = "password"
                                id   = "password"
                                placeholder = "*********"
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
