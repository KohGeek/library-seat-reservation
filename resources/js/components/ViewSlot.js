import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Form,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
} from "reactstrap";
import axios from "axios";

export default class ViewSlot extends Component {
    constructor() {
        super();
        this.state = {
            slots: [],
            slotData: {
                seatID: "",
                tableNo: "",
                status: "",
                date: "",
                time: "",
            },
            searchBy:"seatID",
            searchInput:"",
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(event) {
        console.log(event.target.value);
    }

    loadSlot() {
        axios.get("http://127.0.0.1:80/api/slots").then((response) => {
            this.setState({
                slots: response.data,
            });
        });
    }

    render() {
        let slots = this.state.slots.map((slot) => {
            return (
                <tr key={slot.seatID}>
                    <td>{slot.tableNo}</td>
                    <td>{slot.status}</td>
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                </tr>
            );
        });
        return (
            <div className="container">
               

                <FormGroup tag="fieldset">
                    <legend>Search By</legend>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="searchBy" onClick= {() =>{
                            this.setState({
                                searchBy:"seatID"
                            })
                        }} /> Seat ID
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="searchBy" onClick= {() =>{
                            this.setState({
                                searchBy:"tableNo"
                            })
                        }}/> Table Number
                    </Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="searchBy" id="searchBy" placeholder={this.state.searchBy}
                            onChange = {(e) =>{
                                this.setState({
                                    searchInput:e.target.value
                                })
                            }}
                        />
                    </FormGroup>
                    <Button type="submit">Search</Button>
                </FormGroup>

                <Table>
                    <thead>
                        <tr>
                            <th>Seat ID</th>
                            <th>Table Number</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>{slots}</tbody>
                </Table>
            </div>
        );
    }
}

if (document.getElementById("viewslot")) {
    ReactDOM.render(<ViewSlot />, document.getElementById("viewslot"));
}
