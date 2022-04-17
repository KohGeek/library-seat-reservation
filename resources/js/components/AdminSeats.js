import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";

export default class AdminSeats extends Component {

    constructor() {
        super();
        this.state = {
            seats: [],
            seatsHasData: true,
            modalType: 0, // 0 for add, 1 for update
            seatData: { id: "", table_number: "", closed: null, closed_reason: "" },
            seatModal: false,
            reasonDisabled: true,

            // Data Validation
            errmsg_tablenum: [],
            errmsg_closed: [],
            errmsg_reason: [],
            spinner: false,
        }
    }

    // Load Seats
    async loadSeat() {
        this.setState({ spinner: true });
        await new Promise(r => setTimeout(r, 500));
        axios.get("http://127.0.0.1:80/api/adminseats").then((response) => {
            this.setState({
                seats: response.data,
                seatsHasData: response.data.length > 0,
            });
        });
        this.setState({ spinner: false });
    }

    // Add a SEAT
    addSeat() {
        axios.post("http://127.0.0.1:80/api/adminseat", this.state.seatData).then((response) => {
            this.setState({
                seatModal: false,
                seatData: { table_number: "", closed: null, closed_reason: "" },
            });
            this.loadSeat();
        }).catch(err => {
            this.setState({
                errmsg_tablenum: err.response.data.errors.table_number,
                errmsg_closed: err.response.data.errors.closed,
                errmsg_reason: err.response.data.errors.closed_reason,
            });
        });

    }

    updateSeat() {
        let { id, table_number, closed, closed_reason } = this.state.seatData
        axios.put("http://127.0.0.1:80/api/adminseat/" + id, { table_number, closed, closed_reason }).then((response) => {
            this.setState({
                seatModal: false,
                seatData: { id: "", table_number: "", closed: null, closed_reason: "" },
            });
            this.loadSeat();
        }).catch(err => {
            this.setState({
                errmsg_tablenum: err.response.data.errors.table_number,
                errmsg_closed: err.response.data.errors.closed,
                errmsg_reason: err.response.data.errors.closed_reason,
            });
        });

    }

    // Delete a SEAT
    deleteSeat(id) {
        axios.delete("http://127.0.0.1:80/api/adminseat/" + id).then((response) => {
            this.loadSeat()
        });
    }

    callAddSeat() {
        this.setState({
            seatData: { id: "", table_number: "", closed: null, closed_reason: "" },
            seatModal: true,
            modalType: 0,

            // Clear Data Validation Error Msgs
            errmsg_tablenum: [],
            errmsg_closed: [],
            errmsg_reason: [],
        });
    }


    // Edit a SEAT
    callUpdateSeat(id, table_number, closed, closed_reason) {
        this.setState({
            seatData: { id, table_number, closed, closed_reason },
            reasonDisabled: !closed_reason,
            seatModal: true,
            modalType: 1,

            // Clear Data Validation Error Msgs
            errmsg_tablenum: [],
            errmsg_closed: [],
            errmsg_reason: [],
        });
    }

    toggleSeatModal() {
        this.setState({
            seatModal: !this.state.seatModal
        })
    }

    // DEFAULT STUFF
    componentDidMount() {
        this.loadSeat();
    }

    // Render
    render() {
        let seats = this.state.seatsHasData ? this.state.seats.map((seat) => {
            return (
                <tr key={seat.id}>
                    <td className="col-1">{seat.id}</td>
                    <td>{seat.table_number}</td>
                    {/* for seat.closed, 1 is CLOSED, 0 is Available */}
                    <td> {seat.closed ? 'Closed' : 'Available'} </td>
                    <td> {(seat.closed_reason == null) ? '-' : seat.closed_reason}</td>
                    <td className="col-3 text-center">
                        <Button color="success" className="m-1" size="sm" outline onClick={this.callUpdateSeat.bind(this, seat.id, seat.table_number, seat.closed, seat.closed_reason)}>
                            Edit
                        </Button>
                        <Button color="danger" className="m-1" size="sm" outline onClick={this.deleteSeat.bind(this, seat.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        }) : <tr><td colSpan="5" className="text-center">Empty Seats Data</td></tr>;

        let errmsg_tablenum = this.state.errmsg_tablenum ? this.state.errmsg_tablenum.map((et) => {
            return (
                <div key={et} style={{ color: '#FF0000' }} > {et} </div>
            )
        }) : null;

        let errmsg_closed = this.state.errmsg_closed ? this.state.errmsg_closed.map((ec) => {
            return (
                <div key={ec} style={{ color: '#FF0000' }} > {ec} </div>
            )
        }) : null;

        let errmsg_reason = this.state.errmsg_reason ? this.state.errmsg_reason.map((er) => {
            return (
                <div key={er} style={{ color: '#FF0000' }} > {er} </div>
            )
        }) : null;


        return (
            <div className="container">

                {/* Add seat button */}
                <div>
                    <Button color="primary" onClick={this.callAddSeat.bind(this)}> Add Seat </Button>
                </div>

                {/* UPDATE SEAT Section */}
                <div>
                    <Modal isOpen={this.state.seatModal} toggle={this.toggleSeatModal.bind(this)}>
                        <ModalHeader toggle={this.toggleSeatModal.bind(this)}> {this.state.modalType ? "Edit Seat" : "Add Seat"} </ModalHeader>
                        <ModalBody>
                            {/* Table Number */}
                            <FormGroup>
                                <Label for="table_number"> Table Number </Label> <br></br>
                                {/* Data Validation for Table Number */}
                                {errmsg_tablenum}
                                <Input id="table_number"
                                    value={this.state.seatData.table_number}
                                    onChange={(e) => {
                                        let { seatData } = this.state
                                        seatData.table_number = e.target.value
                                        this.setState({ seatData })
                                    }} />
                            </FormGroup>
                            {/* Closed */}
                            <FormGroup>
                                <Label for="closed"> Status </Label> <br></br>
                                {/* Data Validation for Closed */}
                                {errmsg_closed}
                                <div className="form-check">
                                    <Input type="radio"
                                        name="closed"
                                        id="closed"
                                        className="form-check-input"
                                        checked={this.state.seatData.closed == 0}
                                        value={0}
                                        onChange={(e) => {
                                            let { seatData } = this.state
                                            seatData.closed = e.target.value
                                            this.setState({
                                                seatData,
                                                reasonDisabled: true,
                                            })
                                        }}
                                    />
                                    <Label for="closed" className="form-check-label">Available</Label>  <br></br>
                                    <Input type="radio"
                                        name="closed"
                                        id="closed"
                                        className="form-check-input"
                                        checked={this.state.seatData.closed == 1}
                                        value={1}
                                        onChange={(e) => {
                                            let { seatData } = this.state
                                            seatData.closed = e.target.value
                                            this.setState({
                                                seatData,
                                                reasonDisabled: false,
                                            })
                                        }} />
                                    <Label for="closed" className="form-check-label">Closed</Label>
                                </div>
                            </FormGroup>
                            {/* Closed Reason */}
                            <FormGroup>
                                <Label for="closed_reason"> Closed Reason </Label>
                                {/* Data Validation for Closed Reason */}
                                {errmsg_reason}
                                <Input id="closed_reason"
                                    value={this.state.seatData.closed_reason ? this.state.seatData.closed_reason : ""}
                                    disabled={this.state.reasonDisabled}
                                    onChange={(e) => {
                                        let { seatData } = this.state
                                        seatData.closed_reason = e.target.value
                                        this.setState({ seatData })
                                    }} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.state.modalType ? this.updateSeat.bind(this) : this.addSeat.bind(this)}> {this.state.modalType ? "Update" : "Add"} </Button>
                            <Button color="secondary" onClick={this.toggleSeatModal.bind(this)}> Cancel </Button>
                        </ModalFooter>
                    </Modal>
                </div>

                {/* Load Table */}
                <div className="d-flex justify-content-center">
                    {this.state.spinner ? <span className="spinner-border"></span> : null}
                </div>
                <div className={this.state.spinner ? "mt-2 table-responsive opacity-25" : "mt-2 table-responsive"}>
                    <Table className="table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Table Number</th>
                                <th>Status</th>
                                <th>Closed Reason</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {seats}
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

if (document.getElementById("adminseats")) {
    ReactDOM.render(<AdminSeats />, document.getElementById("adminseats"));
}