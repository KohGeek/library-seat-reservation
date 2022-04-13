import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

export default class AdminLogs extends Component {

    constructor() {
        super();
        this.state = {
            logs: [],
        }
    }

    // Loads All Logs
    loadLog() {
        axios.get("http://127.0.0.1:80/api/adminlogs").then((response) => {
            this.setState({
                logs:response.data,
            });
        });
    }

    // DEFAULT STUFF
    componentWillMount() {
        this.loadLog();
    }


    render() {
        let logs = this.state.logs.map((log) => {

            var createdat_date = new Date(log.created_at);

            return (
                <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.name}</td>
                    <td>{log.purpose}</td>
                    <td>{log.date_time}</td>
                    <td>{log.seat}</td>
                    <td>{dateFormat(createdat_date, "UTC:yyyy-mm-dd HH:MM:ss")}</td>
                </tr>
            );
        });





        return(
            <div className="container">
                {/* Load Table */}
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Person Name </th>
                                <th> Purpose </th>
                                <th> Date & Time </th>
                                <th> Seat </th>
                                <th> Booked At </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs}
                        </tbody>
                    </Table>
                </div>
            </div>
        )

    // render() {
    //     let logs = this.state.logs.map((log) => {

    //         console.log(log.created_at);

    //         return (
    //             <tr key={log.id}>
    //                 <td>{log.id}</td>
    //                 <td>{log.booked_by}</td>
    //                 <td>{log.purpose}</td>
    //                 <td>{log.timeslot}</td>
    //                 <td>{log.seat}</td>
    //                 <td>{log.created_at}</td>
    //             </tr>
    //         );
    //     });





    //     return(
    //         <div className="container">
    //             {/* Load Table */}
    //             <div>
    //                 <Table>
    //                     <thead>
    //                         <tr>
    //                             <th> ID </th>
    //                             <th> Person Name </th>
    //                             <th> Purpose </th>
    //                             <th> Date & Time </th>
    //                             <th> Seat </th>
    //                             <th> Booked At </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {logs}
    //                     </tbody>
    //                 </Table>
    //             </div>
    //         </div>
    //     )

























    }








}

if (document.getElementById("adminlogs")) {
    ReactDOM.render(<AdminLogs />, document.getElementById("adminlogs"));
}