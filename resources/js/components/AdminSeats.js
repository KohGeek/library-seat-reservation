import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";

export default class AdminSeats extends Component {

    constructor() {
        super();
        this.state = {
            seats: [],
            newSeatData: {table_number:"", closed:"", closed_reason:""},
            newSeatModal: false,
            updateSeatData: {id:"", table_number:"", closed:"", closed_reason:"" },
            updateSeatModal: false
        }
    }

    // Load Seats
    loadSeat() {
        axios.get("http://127.0.0.1:80/api/adminseats").then((response) => {
            this.setState({
                seats:response.data,
            });
        });
    }

    // Add a SEAT
    addSeat() {
        axios.post("http://127.0.0.1:80/api/adminseat", this.state.newSeatData).then((response) => {
            let {seats} = this.state
            this.loadSeat()
            this.setState({
                seats,
                newSeatModal : false,
                newSeatData : {table_number:"", closed:"", closed_reason:""},
            });
        });
    }

    
    // Edit a SEAT
    callUpdateSeat(id, table_number, closed, closed_reason) {
        this.setState({
            updateSeatData : {id, table_number, closed, closed_reason},
            updateSeatModal: !this.state.updateSeatModal
        })
    }

    updateSeat() {
        let {id, table_number, closed, closed_reason} = this.state.updateSeatData
        axios.put("http://127.0.0.1:80/api/adminseat/" + id, {table_number, closed, closed_reason}).then((response) => {
            this.loadSeat()
            this.setState({
                updateSeatModal : false,
                updateSeatData : {id:"", table_number:"", closed:"", closed_reason:"" },
            });
        });
    }

    // Delete a SEAT
    deleteSeat(id) {
        axios.delete("http://127.0.0.1:80/api/adminseat/" + id).then((response) => {
            this.loadSeat()
        });
    }


    // Toggles
    toggleNewSeatModal() {
        this.setState({
            newSeatModal:!this.state.newSeatModal
        })
    }

    toggleUpdateSeatModal() {
        this.setState({
            updateSeatModal:!this.state.updateSeatModal
        })
    }


    // DEFAULT STUFF
    componentWillMount() {
        this.loadSeat();
    }


    // Render
    render() {
        let seats = this.state.seats.map((seat) => {
            return (
                <tr key={seat.id}>
                    <td>{seat.id}</td>
                    <td>{seat.table_number}</td>
                    <td>{seat.closed}</td>
                    <td>{seat.closed_reason}</td>
                    <td>
                        <Button color="success" size="sm" outline onClick={this.callUpdateSeat.bind(this, seat.id, seat.table_number, seat.closed, seat.closed_reason)}>
                            {" "} Edit {" "}
                        </Button>
                        <Button color="danger" size="sm" outline onClick={this.deleteSeat.bind(this, seat.id)}>
                            {" "} Delete {" "}
                        </Button>
                    </td>
                </tr>
            );
        });


        return(
            <div className="container">
                
                {/* ADD SEAT Button & Section */}
                <div>
                    <Button color="primary" onClick={this.toggleNewSeatModal.bind(this)}> {" "} Add Seat {" "}</Button>

                    <Modal isOpen={this.state.newSeatModal} toggle={this.toggleNewSeatModal.bind(this)}>
                        <ModalHeader toggle={this.toggleNewSeatModal.bind(this)}> Add New Seat </ModalHeader>
                        <ModalBody>
                            {/* ADD SEAT - Table Number */}
                            <FormGroup>
                                <Label for = "table_number"> Table Number </Label>
                                <Input id = "table_number"
                                    value = {this.state.newSeatData.table_number}
                                    onChange = {(e) => {
                                        let {newSeatData} = this.state
                                        newSeatData.table_number = e.target.value
                                        this.setState({newSeatData})
                                    }}> </Input>
                            </FormGroup>
                            {/* ADD SEAT - Closed */}
                            <FormGroup>
                                <Label for = "closed"> Is it closed? </Label>
                                <Input id = "closed"
                                    value = {this.state.newSeatData.closed}
                                    onChange = {(e) => {
                                        let {newSeatData} = this.state
                                        newSeatData.closed = e.target.value
                                        this.setState({newSeatData})
                                    }}> </Input>
                            </FormGroup>
                            {/* ADD SEAT - Closed Reason */}
                            <FormGroup>
                                <Label for = "closed_reason"> Closed Reason </Label>
                                <Input id = "closed_reason"
                                    value = {this.state.newSeatData.closed_reason}
                                    onChange = {(e) => {
                                        let {newSeatData} = this.state
                                        newSeatData.closed_reason = e.target.value
                                        this.setState({newSeatData})
                                    }}> </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addSeat.bind(this)}> Add </Button>
                            <Button color="secondary" onClick={this.toggleNewSeatModal.bind(this)}> Cancel </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                
                {/* UPDATE SEAT Section */}
                <div>
                    <Modal isOpen={this.state.updateSeatModal} toggle={this.toggleUpdateSeatModal.bind(this)}>
                        <ModalHeader toggle={this.toggleUpdateSeatModal.bind(this)}> Edit Seat </ModalHeader>
                        <ModalBody>
                            {/* EDIT SEAT - Table Number */}
                            <FormGroup>
                                <Label for = "table_number"> Table Number </Label>
                                <Input id = "table_number"
                                    value = {this.state.updateSeatData.table_number}
                                    onChange = {(e) => {
                                        let {updateSeatData} = this.state
                                        updateSeatData.table_number = e.target.value
                                        this.setState({updateSeatData})
                                    }}> </Input>
                            </FormGroup>
                            {/* EDIT SEAT - Closed */}
                            <FormGroup>
                                <Label for = "closed"> Is it closed? </Label>
                                <Input id = "closed"
                                    value = {this.state.updateSeatData.closed}
                                    onChange = {(e) => {
                                        let {updateSeatData} = this.state
                                        updateSeatData.closed = e.target.value
                                        this.setState({updateSeatData})
                                    }}> </Input>
                            </FormGroup>
                            {/* EDIT SEAT - Closed Reason */}
                            <FormGroup>
                                <Label for = "closed_reason"> Closed Reason </Label>
                                <Input id = "closed_reason"
                                    value = {this.state.updateSeatData.closed_reason}
                                    onChange = {(e) => {
                                        let {updateSeatData} = this.state
                                        updateSeatData.closed_reason = e.target.value
                                        this.setState({updateSeatData})
                                    }}> </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateSeat.bind(this)}> Update </Button>
                            <Button color="secondary" onClick={this.toggleUpdateSeatModal.bind(this)}> Cancel </Button>
                    </ModalFooter>
                    </Modal>
                </div>

                {/* Load Table */}
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Table Number </th>
                                <th> Is it closed? </th>
                                <th> Closed Reason </th>
                            </tr>
                        </thead>
                        <tbody>
                            {seats}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

if (document.getElementById("adminseats")) {
    ReactDOM.render(<AdminSeats />, document.getElementById("adminseats"));
}