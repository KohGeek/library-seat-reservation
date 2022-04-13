import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form
} from "reactstrap";
import axios from "axios";

export default class Registration extends Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            userData: { name: "", username: "", email: "", password: "", role: "" },
            dropdownOpen: false,
        }
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }



    register() {
        axios.post("http://127.0.0.1:80/api/user", this.state.userData).then((response) => {
            console.log(response)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="register">
                    <h2>Login</h2>
                    <Form className="form">
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                value={this.state.userData.name}
                                onChange={(e) => {
                                    let { userData } = this.state
                                    userData.name = e.target.value
                                    this.setState({ userData })
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                value={this.state.userData.username}
                                onChange={(e) => {
                                    let { userData } = this.state
                                    userData.username = e.target.value
                                    this.setState({ userData })
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@example.com"
                                value={this.state.userData.email}
                                onChange={(e) => {
                                    let { userData } = this.state
                                    userData.email = e.target.value
                                    this.setState({ userData })
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*********"
                                value={this.state.userData.password}
                                onChange={(e) => {
                                    let { userData } = this.state
                                    userData.password = e.target.value
                                    this.setState({ userData })
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Role</Label>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Role
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Select your Role</DropdownItem>
                                    <DropdownItem>
                                        <div>
                                            Student
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <div>
                                            Staff
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        <Button onClick={this.register.bind(this)}>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}



if (document.getElementById('registration')) {
    ReactDOM.render(<Registration />, document.getElementById('registration'));
}
