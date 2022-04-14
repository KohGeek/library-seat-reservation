import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
    NavItem,
} from "reactstrap";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { toInteger } from "lodash";

export default class AdminLogs extends Component {
    constructor() {
        super();
        this.state = {
            logs: [],
            searchLogData: { seat: "", name: "", timeslot: "" },
            searchLogModal: false,
            listseat: [],
            listtimeslot: [],
        }
    }

    // Loads All Logs
    loadLog() {
        axios.get("http://127.0.0.1:80/api/adminlogs", {}).then((response) => {
            this.setState({
                logs: response.data,
            });
        });
        axios.get("http://127.0.0.1:80/api/adminlogs_listseat", {})
            .then((response) => {
                this.setState({
                    listseat: response.data,
                });
            });

        axios.get("http://127.0.0.1:80/api/adminlogs_listtimeslot", {}).then((response) => {
            this.setState({
                listtimeslot: response.data,
            });
        });
    }

    // Searching Logs
    searchLog() {
        let { seat, name } = this.state.searchLogData
        axios.get("http://127.0.0.1:80/api/adminlogs/search", { params: { seat, name } }).then((response) => {
            this.setState({
                logs: response.data,
                //searchLogData: {seat:"", name:"", timeslot:""},
                searchLogModal: false,
            });

            console.log(this.state.searchLogData);
        });
    }

    // Toggles
    toggleSearchLogModal() {
        this.setState({
            searchLogModal: !this.state.searchLogModal,
        });
    }

    // DEFAULT STUFF
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
                    <td>
                        {dateFormat(createdat_date, "UTC:yyyy-mm-dd HH:MM:ss")}
                    </td>
                </tr>
            );
        });

        let seats = this.state.listseat.map((seat) => {
            return (
                <option key={seat.id} value={seat.id}>
                    {seat.id}
                </option>
            );
        });

        let timeslots = this.state.listtimeslot.map((timeslot) => {

            var dt_date = new Date(timeslot.date_time);
            console.log(timeslot.date_time)
            console.log(dt_date)

            return (
                <option key={timeslot.id}
                    value={timeslot.id}
                >{dateFormat(dt_date.getTime(), "yyyy-mm-dd HH:MM:ss")}</option>
            );
        });


        return (
            <div className="container">
                {/* Searching Log Section */}
                <div>
                    {/* Filtering - Person Name */}
                    <FormGroup>
                        <Label > Person Name </Label>
                        <Input id="name"
                            value={this.state.searchLogData.name}
                            onChange={(e) => {
                                let { searchLogData } = this.state
                                searchLogData.name = e.target.value
                                this.setState({ searchLogData })
                            }}> </Input>
                    </FormGroup>
                    {/* Filtering - Seat */}
                    <FormGroup>
                        <Label>Seat</Label> <br></br>
                        <select for="seats" id="seats"
                            onChange={(e) => {
                                let { searchLogData } = this.state
                                searchLogData.seat = e.target.value
                                this.setState({ searchLogData })
                            }}
                        >
                            <option></option>
                            {seats} </select>
                    </FormGroup>
                    {/* Filtering - Timeslot */}
                    <FormGroup>
                        <Label>Time & Date</Label> <br></br>
                        <select for="timeslots" id="timeslots"
                            onChange={(e) => {
                                let { searchLogData } = this.state
                                searchLogData.timeslot = e.target.value
                                this.setState({ searchLogData })
                            }}
                        >
                            <option></option>
                            {timeslots} </select>
                    </FormGroup>
                    <Button color="primary" onClick={this.searchLog.bind(this)}> Search </Button>
                </div>

                {/* Load Table */}
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
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
                        <tbody>{logs}</tbody>
                    </Table>
                </div>

                {/* {checkSearch} */}
            </div>
        );
    }
}

if (document.getElementById("adminlogs")) {
    ReactDOM.render(<AdminLogs />, document.getElementById("adminlogs"));
}
