import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    Input,
    FormGroup,
    Label,
} from "reactstrap";
import axios from "axios";
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class Booking extends Component {
    constructor() {
        super();

        this.state = {
            slots: [],
            searchViewData: { date: dateFormat(new Date(), "yyyy-mm-dd"), time: "" },

            dateValue: new Date(),
        };

        console.log(this.state.dateValue);

    }

    convertTimetoDate(time) {
        let date = new Date();
        date.setUTCHours(time.substring(0, 2));
        date.setUTCMinutes(time.substring(3, 5));
        return date;
    }

    handleChange(dateValue) {
        let searchViewData = this.state.searchViewData;
        searchViewData.date = dateValue
            ? dateFormat(dateValue, "yyyy-mm-dd")
            : "";

        this.setState({
            dateValue,
            searchViewData,
        });
    }

    componentDidMount() {
        this.getSeats();
    }

    getSeats() {
        let { date, time } = this.state.searchViewData;
        axios.get("http://127.0.0.1:80/api/slots", { params: { date, time } }).then((response) => {
            this.setState({
                slots: response.data
            });
        });
    }

    render() {
        let slots = this.state.slots.map((slot) => {
            return (
                <tr key={slot.id + "." + slot.time}>
                    <td>{slot.id}</td>
                    <td>{slot.table_number}</td>
                    <td>{slot.date}</td>
                    <td>{dateFormat(this.convertTimetoDate(slot.time), "HH:MM")}</td>
                    <td>Action</td>
                </tr>
            );
        });

        return (
            <div className="container">
                <div>

                    {/* <h1>Search By</h1> */}
                    <FormGroup>
                        <Label>Date</Label> <br />
                        <DatePicker
                            className="form-control"
                            id="datepicker"
                            selected={this.state.dateValue}
                            onChange={(v) => this.handleChange(v)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Time</Label> <br />
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
                            <option key="01:00:00" value="01:00:00">09:00</option>
                            <option key="02:00:00" value="02:00:00">10:00</option>
                            <option key="03:00:00" value="03:00:00">11:00</option>
                            <option key="04:00:00" value="04:00:00">12:00</option>
                            <option key="05:00:00" value="05:00:00">13:00</option>
                            <option key="06:00:00" value="06:00:00">14:00</option>
                            <option key="07:00:00" value="07:00:00">15:00</option>
                            <option key="08:00:00" value="08:00:00">16:00</option>
                            <option key="09:00:00" value="09:00:00">17:00</option>
                            <option key="10:00:00" value="10:00:00">18:00</option>
                            <option key="11:00:00" value="11:00:00">19:00</option>
                            <option key="12:00:00" value="12:00:00">20:00</option>
                        </Input>
                    </FormGroup>


                    <Button color="primary" type="submit" onClick={this.getSeats.bind(this)}>
                        Search
                    </Button>
                </div>

                <div className="mt-2">
                    <Table>
                        <thead>
                            <tr>
                                <th>Seat ID</th>
                                <th>Table Number</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{slots}</tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

if (document.getElementById("booking")) {
    ReactDOM.render(<Booking />, document.getElementById("booking"));
}
