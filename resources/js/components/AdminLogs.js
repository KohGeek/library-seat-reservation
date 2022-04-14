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
var DatePicker = require("reactstrap-date-picker");

export default class AdminLogs extends Component {
    constructor() {
        super();
        this.state = {
            logs: [],
            searchLogData: { seat: "", name: "", date: "", time: "" },
            searchLogModal: false,
            listseat: [],
            datePick: "",

            // Data Validation Example ONLY
            // error_msgs_person:[''],
            // error_msgs_seat:[''],
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

    }

    // Searching Logs
    searchLog() {
        let { seat, name, date, time } = this.state.searchLogData
        axios.get("http://127.0.0.1:80/api/adminlogs/search", { params: { seat, name, date, time } }).then((response) => {
            this.setState({
                logs: response.data,
                //searchLogData: {seat:"", name:"", timeslot:""},
                searchLogModal: false,
            });

            // LOG --- TO see what Param passed to Controller
            //console.log(this.state.searchLogData);
        }).catch(err => {
            // console.log(err);
            // console.log(err.message);
            // console.log(err.response);
            // console.log(err.response.data.message);

            // let {error_msgs_person} = this.state.error_msgs_person;
            // let {error_msgs_seat} = this.state.error_msgs_seat;
            // error_msgs_person = err.response.data.errors.name;
            // error_msgs_seat = err.response.data.errors.seat;
            // this.setState({ error_msgs_person });
            // this.setState({ error_msgs_seat });
            // console.log(error_msgs);
        });
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



    // DEFAULT STUFF
    componentDidMount() {
        this.loadLog();
    }



    componentDidUpdate() {
        // // Access ISO String and formatted values from the DOM.
        // var hiddenInputElement = document.getElementById("from_datepicker");
        // console.log(hiddenInputElement.datePick); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        // console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
        // console.log(dateFormat(hiddenInputElement.datePick, "yyyy-mm-dd"))
    }



    render() {
        let logs = this.state.logs.map((log) => {

            //
            // This is to check what's the data retrive from backend
            //
            // console.log(log.datetime);
            // console.log(log.created_at);

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
        });

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
                <div>
                    {/* Filtering - Person Name */}
                    <FormGroup>
                        <Label > Person Name </Label>
                        {/* <br></br> */}
                        {/* <span style={{color:'#FF0000'}} > {this.state.error_msgs_person} </span> */}
                        <Input id="name"
                            value={this.state.searchLogData.name}
                            onChange={(e) => {
                                let { searchLogData } = this.state
                                searchLogData.name = e.target.value
                                this.setState({ searchLogData })
                            }} />
                    </FormGroup>
                    {/* Filtering - Seat */}
                    <FormGroup>
                        <Label>Seat</Label> <br></br>
                        {/* <span> {this.state.error_msgs_seat} </span> <br></br> */}
                        <Input type="select" id="seats"
                            onChange={(e) => {
                                let { searchLogData } = this.state
                                searchLogData.seat = e.target.value
                                this.setState({ searchLogData })
                            }}>
                            <option></option>
                            {seats} </Input>
                    </FormGroup>
                    {/* Filtering - Date */}
                    <FormGroup>
                        <Label>Booked Date</Label> <br></br>
                        <DatePicker id="from_datepicker"
                            value={this.state.datePick}
                            onChange={(v, f) => this.handleChange(v, f)}
                        />
                    </FormGroup>
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
                                <th> Booking ID </th>
                                <th> Person Name </th>
                                <th> Purpose </th>
                                <th> Seat </th>
                                <th> Booked Date & Time </th>
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
