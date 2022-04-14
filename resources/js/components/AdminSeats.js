import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";

export default class AdminSeats extends Component {

    constructor() {
        super();
        this.state = {
            seats: [],
            newSeatData: { table_number: "", closed: 0, closed_reason: "" },
            newSeatModal: false,
            updateSeatData: { id: "", table_number: "", closed: 0, closed_reason: "" },
            updateSeatModal: false,

            // Data Validation
            errmsg_tablenum_add: [],
            errmsg_tablenum_update: [],
        }
    }

    // Load Seats
    loadSeat() {
        axios.get("http://127.0.0.1:80/api/adminseats").then((response) => {
            this.setState({
                seats: response.data,
            });
        });
    }

    // Add a SEAT
    addSeat() {
        axios.post("http://127.0.0.1:80/api/adminseat", this.state.newSeatData).then((response) => {
            let { seats } = this.state
            this.loadSeat()
            this.setState({
                seats,
                newSeatModal: false,
                newSeatData: { table_number: "", closed: 0, closed_reason: "" },

                // Clear Data Validation Error Msgs
                errmsg_tablenum_add: [],
                errmsg_tablenum_update: [],
            });
        }).catch(err => {

            console.log(err.response);

            // Data Validation
            let { errmsg_tablenum_add } = this.state.errmsg_tablenum_add;
            errmsg_tablenum_add = err.response.data.errors.table_number;
            this.setState({ errmsg_tablenum_add });
        });
    }


    // Edit a SEAT
    callUpdateSeat(id, table_number, closed, closed_reason) {
        this.setState({
            updateSeatData: { id, table_number, closed, closed_reason },
            updateSeatModal: !this.state.updateSeatModal
        })
    }

    updateSeat() {
        let { id, table_number, closed, closed_reason } = this.state.updateSeatData
        axios.put("http://127.0.0.1:80/api/adminseat/" + id, { table_number, closed, closed_reason }).then((response) => {
            this.loadSeat()
            this.setState({
                updateSeatModal: false,
                updateSeatData: { id: "", table_number: "", closed: 0, closed_reason: "" },

                // Clear Data Validation Error Msgs
                errmsg_tablenum_add: [],
                errmsg_tablenum_update: [],
            });
        }).catch(err => {

            // Data Validation
            let { errmsg_tablenum_update } = this.state.errmsg_tablenum_update;
            errmsg_tablenum_update = err.response.data.errors.table_number;
            this.setState({ errmsg_tablenum_update });
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
            newSeatModal: !this.state.newSeatModal
        })
    }

    toggleUpdateSeatModal() {
        this.setState({
            updateSeatModal: !this.state.updateSeatModal
        })
    }


    // DEFAULT STUFF
    componentDidMount() {
        this.loadSeat();
    }


    // Render
    render() {
        let seats = this.state.seats.map((seat) => {
            return (
                <tr key={seat.id}>
                    <td>{seat.id}</td>
                    <td>{seat.table_number}</td>
                    {/* for seat.closed, 1 is CLOSED, 0 is Available */}
                    <td> {seat.closed ? 'Closed' : 'Available'} </td>
                    <td>{(seat.closed_reason == null) ? '-' : seat.closed_reason}</td>
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

        let errmsg_tablenum_add = this.state.errmsg_tablenum_add.map((eta) => {
            return (
                <div key={eta} style={{ color: '#FF0000' }} > {eta} </div>
            )
        });

        let errmsg_tablenum_update = this.state.errmsg_tablenum_update.map((etu) => {
            return (
                <div key={etu} style={{ color: '#FF0000' }} > {etu} </div>
            )
        });


        return (
            <div className="container">

                {/* ADD SEAT Button & Section */}
                <div>
                    <Button color="primary" onClick={this.toggleNewSeatModal.bind(this)}> {" "} Add Seat {" "}</Button>

                    <Modal isOpen={this.state.newSeatModal} toggle={this.toggleNewSeatModal.bind(this)}>
                        <ModalHeader toggle={this.toggleNewSeatModal.bind(this)}> Add New Seat </ModalHeader>
                        <ModalBody>
                            {/* ADD SEAT - Table Number */}
                            <FormGroup>
                                <Label for="table_number"> Table Number </Label> <br></br>
                                {/* Data Validation for Table Number - Adding */}
                                {errmsg_tablenum_add}
                                <Input id="table_number"
                                    value={this.state.newSeatData.table_number}
                                    onChange={(e) => {
                                        let { newSeatData } = this.state
                                        newSeatData.table_number = e.target.value
                                        this.setState({ newSeatData })
                                    }}> </Input>
                            </FormGroup>
                            {/* ADD SEAT - Closed */}
                            <FormGroup>
                                <Label for="closed"> Status </Label> <br></br>
                                <Input type="radio"
                                    name="closed"
                                    id="closed"
                                    value={0}
                                    onChange={(e) => {
                                        let { newSeatData } = this.state
                                        newSeatData.closed = e.target.value
                                        this.setState({ newSeatData })
                                    }}
                                > </Input>
                                <Label for="closed">Available</Label>  <br></br>
                                <Input type="radio"
                                    name="closed"
                                    id="closed"
                                    value={1}
                                    onChange={(e) => {
                                        let { newSeatData } = this.state
                                        newSeatData.closed = e.target.value
                                        this.setState({ newSeatData })
                                    }}> </Input>
                                <Label for="closed">Closed</Label>
                            </FormGroup>
                            {/* ADD SEAT - Closed Reason */}
                            <FormGroup>
                                <Label for="closed_reason"> Closed Reason </Label>
                                <Input id="closed_reason"
                                    value={this.state.newSeatData.closed_reason}
                                    onChange={(e) => {
                                        let { newSeatData } = this.state
                                        newSeatData.closed_reason = e.target.value
                                        this.setState({ newSeatData })
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
                                <Label for="table_number"> Table Number </Label> <br></br>
                                {/* Data Validation for Table Number - Updating */}
                                {errmsg_tablenum_update}
                                <Input id="table_number"
                                    value={this.state.updateSeatData.table_number}
                                    onChange={(e) => {
                                        let { updateSeatData } = this.state
                                        updateSeatData.table_number = e.target.value
                                        this.setState({ updateSeatData })
                                    }}> </Input>
                            </FormGroup>
                            {/* EDIT SEAT - Closed */}
                            <FormGroup>
                                <Label for="closed"> Status </Label> <br></br>
                                <Input type="radio"
                                    name="closed"
                                    id="closed"
                                    value={0}
                                    onChange={(e) => {
                                        let { updateSeatData } = this.state
                                        updateSeatData.closed = e.target.value
                                        this.setState({ updateSeatData })
                                    }}
                                > </Input>
                                <Label for="closed">Available</Label>  <br></br>
                                <Input type="radio"
                                    name="closed"
                                    id="closed"
                                    value={1}
                                    onChange={(e) => {
                                        let { updateSeatData } = this.state
                                        updateSeatData.closed = e.target.value
                                        this.setState({ updateSeatData })
                                    }}> </Input>
                                <Label for="closed">Closed</Label>
                            </FormGroup>
                            {/* EDIT SEAT - Closed Reason */}
                            <FormGroup>
                                <Label for="closed_reason"> Closed Reason </Label>
                                <Input id="closed_reason"
                                    value={this.state.updateSeatData.closed_reason}
                                    onChange={(e) => {
                                        let { updateSeatData } = this.state
                                        updateSeatData.closed_reason = e.target.value
                                        this.setState({ updateSeatData })
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
                                <th> Status </th>
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