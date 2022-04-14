import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Form,
    Button,
    Modal,
    ModalHeader,
    Select,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    FormText,
    Label,
} from "reactstrap";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
var DatePicker = require("reactstrap-date-picker");

export default class ViewSlot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slots: [],

            searchViewData: { date: dateFormat(new Date(), "yyyy-mm-dd"), time: "" },

            seats: [],
            bookingData: [],

            dateValue: new Date().toISOString(),
            formattedValue: "",
        };

    }

    handleChange(dateValue, formattedValue) {
        let searchViewData = this.state.searchViewData;
        searchViewData.date = dateValue
            ? dateFormat(dateValue, "yyyy-mm-dd")
            : "";

        this.setState({
            dateValue: dateValue,
            formattedValue: formattedValue,
            searchViewData,
        });
        console.log("ISO Date: " + this.state.dateValue);
        console.log("String Date: " + this.state.searchViewData.date);
    }

    componentDidMount() {
        this.getSeats();
        this.searchBy();
    }

    getSeats() {
        axios.get("http://127.0.0.1:80/api/viewseats").then((response) => {
            this.setState({
                seats: response.data,
            });
        });
    }


    searchBy() {
        let { date, time } = this.state.searchViewData;
        let bookingData = [];

        axios
            .get("http://127.0.0.1:80/api/viewbookingData", {
                params: { date, time },
            })
            .then((response) => {
                this.setState({
                    bookingData: response.data,
                });
                bookingData = response.data;
            });

        let seats = this.state.seats;
        let availableTime = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

        let tempSeats = [];

        seats.forEach((element) => {
            availableTime.forEach((time) => {
                var seat = {
                    id: element.id,
                    tableNo: element.table_number,
                    time: time,
                };
                tempSeats.push(seat);
            });
        });

        console.log(tempSeats);

        this.setState({
            slots: tempSeats,
        });

    }

    // loadSlot() {
    //     axios.get("http://127.0.0.1:80/api/slots").then((response) => {
    //         this.setState({
    //             slots: response.data,
    //         });
    //     });
    // }

    render() {
        let slots = this.state.slots.map((slot) => {
            var datetime_date = new Date(slot.date_time);

            return (
                <tr key={slot.id + "." + slot.time}>
                    <td>{slot.id}</td>
                    <td>{slot.tableNo}</td>
                    <td>{slot.time}</td>
                    <td>Action</td>
                </tr>
            );
        });
        return (
            <div className="container">
                <FormGroup tag="fieldset">
                    <h1>Search By</h1>
                    <FormGroup check>
                        <Label>Date</Label> <br />
                        <br />
                        <DatePicker
                            id="datepicker"
                            value={this.state.dateValue}
                            onChange={(v, f) => this.handleChange(v, f)}
                        />
                    </FormGroup>

                    <FormGroup check>
                        <Label>Time</Label> <br />
                        <br />
                        <Input
                            type="select"
                            id="times"
                            onChange={(e) => {
                                let { searchViewData } = this.state;
                                searchViewData.time = e.target.value;
                                this.setState({ searchViewData });
                            }}
                        >
                            <option></option>
                            <option key="01:00:00" value="01:00:00">
                                {" "}
                                09:00{" "}
                            </option>
                            <option key="02:00:00" value="02:00:00">
                                {" "}
                                10:00{" "}
                            </option>
                            <option key="03:00:00" value="03:00:00">
                                {" "}
                                11:00{" "}
                            </option>
                            <option key="04:00:00" value="04:00:00">
                                {" "}
                                12:00{" "}
                            </option>
                            <option key="05:00:00" value="05:00:00">
                                {" "}
                                13:00{" "}
                            </option>
                            <option key="06:00:00" value="06:00:00">
                                {" "}
                                14:00{" "}
                            </option>
                            <option key="07:00:00" value="07:00:00">
                                {" "}
                                15:00{" "}
                            </option>
                            <option key="08:00:00" value="08:00:00">
                                {" "}
                                16:00{" "}
                            </option>
                            <option key="09:00:00" value="09:00:00">
                                {" "}
                                17:00{" "}
                            </option>
                            <option key="10:00:00" value="10:00:00">
                                {" "}
                                18:00{" "}
                            </option>
                            <option key="11:00:00" value="11:00:00">
                                {" "}
                                19:00{" "}
                            </option>
                            <option key="12:00:00" value="12:00:00">
                                {" "}
                                20:00{" "}
                            </option>
                        </Input>
                    </FormGroup>

                    <Button type="submit" onClick={this.searchBy.bind(this)}>
                        Search
                    </Button>
                </FormGroup>

                <Table>
                    <thead>
                        <tr>
                            <th>Seat ID</th>
                            <th>Table Number</th>
                            <th>Time</th>
                            <th>Action</th>
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
