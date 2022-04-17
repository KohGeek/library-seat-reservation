import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerStyle = styled.div`
    .react-datepicker__close-icon::after {
        content: "Clear";
        border-radius: 10%;
        padding: 0.5rem;
        background-color: red;
`

export default class AdminLogs extends Component {
    constructor() {
        super();
        this.state = {
            logs: [],
            logsHasData: true,
            searchLogData: { seat: "", name: "", date: "", time: "" },
            searchLogModal: false,
            listseat: [],
            datePick: null,
            spinner: false,
        }
    }

    // Loads All Logs
    loadLog() {
        axios.get("http://127.0.0.1:80/api/adminlogs").then((response) => {
            this.setState({
                logs: response.data,
                logsHasData: response.data.length > 0,
            });
        });
        axios.get("http://127.0.0.1:80/api/adminlogs/seats").then((response) => {
            this.setState({
                listseat: response.data,
            });
        });

    }

    // Searching Logs
    async searchLog() {
        this.setState({ spinner: true });
        await new Promise(r => setTimeout(r, 500));
        let { seat, name, date, time } = this.state.searchLogData
        axios.get("http://127.0.0.1:80/api/adminlogs", { params: { seat, name, date, time } }).then((response) => {
            console.log(response.data)
            this.setState({
                logs: response.data,
                logsHasData: response.data.length > 0,
                searchLogModal: false,
            });
        });
        this.setState({ spinner: false });
    }

    // Toggles
    toggleSearchLogModal() {
        this.setState({
            searchLogModal: !this.state.searchLogModal,
        });
    }

    // To handle DatePicker
    handleChange(datePick, formattedValue) {

        let searchLogData = this.state.searchLogData
        searchLogData.date = datePick ? dateFormat(datePick, "yyyy-mm-dd") : ""

        this.setState({
            datePick: datePick, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            searchLogData
        })
    }

    componentDidMount() {
        this.loadLog();
    }

    render() {
        let logs = this.state.logsHasData ? this.state.logs.map((log) => {
            var datetime_date = new Date(log.datetime);
            var createdat_date = new Date(log.created_at);


            return (
                <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.name}</td>
                    <td>{log.purpose}</td>
                    <td>{log.seat}</td>
                    <td>{dateFormat(datetime_date, "yyyy-mm-dd HH:MM:ss")}</td>
                    <td>
                        {dateFormat(createdat_date, "yyyy-mm-dd HH:MM:ss")}
                    </td>
                </tr>
            );
        }) : <tr><td colSpan="6" className="text-center">No Booking Data</td></tr>;

        let seats = this.state.listseat.map((seat) => {
            return (
                <option key={seat.id} value={seat.id}>
                    {seat.id}
                </option>
            );
        });

        return (
            <div className="container">

                {/* Searching Log Section */}
                <div className="row">
                    <div className="col">
                        {/* Filtering - Person Name */}

                        <FormGroup>
                            <Label > Person Name </Label>
                            <Input id="name"
                                value={this.state.searchLogData.name}
                                onChange={(e) => {
                                    let { searchLogData } = this.state
                                    searchLogData.name = e.target.value
                                    this.setState({ searchLogData })
                                }} />
                        </FormGroup>
                    </div>
                    <div className="col">
                        {/* Filtering - Seat */}
                        <FormGroup>
                            <Label>Seat</Label> <br></br>
                            <Input type="select" id="seats"
                                onChange={(e) => {
                                    let { searchLogData } = this.state
                                    searchLogData.seat = e.target.value
                                    this.setState({ searchLogData })
                                }}>
                                <option></option>
                                {seats} </Input>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {/* Filtering - Date */}
                        <FormGroup>
                            <Label>Booked Date</Label> <br></br>
                            <DatePickerStyle>
                                <DatePicker
                                    className="form-control"
                                    id="from_datepicker"
                                    selected={this.state.datePick}
                                    isClearable={true}
                                    onChange={(v) => this.handleChange(v)}
                                />
                            </DatePickerStyle>
                        </FormGroup>
                    </div>
                    <div className="col">
                        {/* Filtering - Time */}
                        <FormGroup>
                            <Label>Booked Time</Label> <br></br>
                            <Input type="select" id="times"
                                onChange={(e) => {
                                    let { searchLogData } = this.state
                                    searchLogData.time = e.target.value
                                    this.setState({ searchLogData })
                                }}>
                                <option></option>
                                <option key="01:00:00" value="01:00:00"> 09:00 </option>
                                <option key="02:00:00" value="02:00:00"> 10:00 </option>
                                <option key="03:00:00" value="03:00:00"> 11:00 </option>
                                <option key="04:00:00" value="04:00:00"> 12:00 </option>
                                <option key="05:00:00" value="05:00:00"> 13:00 </option>
                                <option key="06:00:00" value="06:00:00"> 14:00 </option>
                                <option key="07:00:00" value="07:00:00"> 15:00 </option>
                                <option key="08:00:00" value="08:00:00"> 16:00 </option>
                                <option key="09:00:00" value="09:00:00"> 17:00 </option>
                                <option key="10:00:00" value="10:00:00"> 18:00 </option>
                                <option key="11:00:00" value="11:00:00"> 19:00 </option>
                                <option key="12:00:00" value="12:00:00"> 20:00 </option>
                            </Input>
                        </FormGroup>
                    </div>
                </div>
                <div className="mt-2">
                    <Button color="primary" onClick={this.searchLog.bind(this)}>
                        {this.state.spinner ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                        <span>Search</span>
                    </Button>
                </div>

                {/* Load Table */}
                <div className={this.state.spinner ? "mt-2 table-responsive opacity-25" : "mt-2 table-responsive"}>
                    <Table className="table-striped">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Person Name</th>
                                <th>Purpose</th>
                                <th>Seat</th>
                                <th>Booked Date & Time</th>
                                <th>Booked At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs}
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

if (document.getElementById("adminlogs")) {
    ReactDOM.render(<AdminLogs />, document.getElementById("adminlogs"));
}
