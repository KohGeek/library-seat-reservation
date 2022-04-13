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
                <h2>Search by</h2>

                <form onSubmit={this.formSubmit}>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value="seatID"
                                checked={this.state.selectedOption === "seatID"}
                                onChange={this.onValueChange}
                            />
                            Seat ID
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value="tableNo"
                                checked={
                                    this.state.selectedOption === "tableNo"
                                }
                                onChange={this.onValueChange}
                            />
                            Table Number
                        </label>
                    </div>

                    <button className="btn btn-default" type="submit">
                        Submit
                    </button>
                </form>

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
