import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            seats: [],
            updateSeatData: {id:"", table_number:"", closed:0, closed_reason:"" },
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




    // Delete
    deleteSeat(id) {
        axios.delete("http://127.0.0.1:80/api/adminseat/" + id).then((response) => {
            this.loadSeat()
        });
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
                    {/* for seat.closed, 1 is CLOSED, 0 is Available */}
                    <td> {seat.closed ? 'Closed' : 'Available'} </td>
                    <td>{(seat.closed_reason==null) ? '-' : seat.closed_reason}</td>
                    <td>
                        <Button color="danger" size="sm" outline onClick={this.deleteSeat.bind(this, seat.id)}>
                            {" "} Delete {" "}
                        </Button>
                    </td>
                </tr>
            );
        });


        return(
            <div className="container">   
                 
                {/* Load Table */}
                <div>
                {/* Missing OnClick*/}
                <Button color="primary"  style={{ marginLeft: '95%' }}> {" "} Add {" "}</Button>
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
if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}