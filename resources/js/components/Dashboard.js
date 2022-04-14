import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, NavItem } from "reactstrap";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

export default class Dashboard extends Component {
    
    constructor() {
        super();
        this.state = {
            logs: [],
            searchLogData: {seat:"", name:""},
            searchLogModal: false,
            listseat:[]
        }
    }

      // Loads All Logs
      loadLog() {
        axios.get("http://127.0.0.1:80/api/adminlogs", {}).then((response) => {
            this.setState({
                logs:response.data,
            });
        });
        axios.get("http://127.0.0.1:80/api/adminlogs_listseat", {}).then((response) => {
            this.setState({
                listseat:response.data,
            });
        });

        axios.get("http://127.0.0.1:80/api/adminlogs_listtimeslot", {}).then((response) => {
            this.setState({
                listtimeslot: response.data,
            });
        });
    }

    componentWillMount() {
        this.loadLog();
    }

    render() {
      
        let logs = this.state.logs.map((log) => {

            // console.log(log.created_at);
            // console.log(log.date_time);

            var createdat_date = new Date(log.created_at);
            var datetime_date = new Date(log.date_time);
                      

            return (
                <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.name}</td>
                    <td>{log.purpose}</td>
                    <td>{log.seat}</td>
                    <td>{dateFormat(datetime_date, "yyyy-mm-dd HH:MM:ss")}</td>
                    <td>{dateFormat(createdat_date, "UTC:yyyy-mm-dd HH:MM:ss")}</td>
                </tr>
            );
        });

    


        return (
                    
            <div className="container">
                
               

                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Person Name </th>
                                <th> Purpose </th>
                                <th> Seat </th>
                                <th> Date & Time </th>
                                <th> Booked At </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs}
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
