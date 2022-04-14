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
    constructor() {
        super();


        this.state = {
            slots: [],

            searchViewData: {seat:"", tableNo:"", date:"", time:""},
            
            searchBy: "seatID",
            searchInput: "",

            seats: [],
            bookingData:[],

            dateValue: new Date().toISOString(),
            formattedValue: "",
            
        };
    }
    
    handleChange(dateValue, formattedValue){
        
        let searchViewData = this.state.searchViewData
        searchViewData.date = dateValue ? dateFormat(dateValue, "yyyy-mm-dd"): ""
        
        this.setState({
            dateValue: dateValue,
            formattedValue: formattedValue,
            searchViewData
        })
        console.log("ISO Date: " + this.state.dateValue)
        console.log("String Date: " + this.state.searchViewData.date)


    }

    

    getSeats(){
        axios.get("http://127.0.0.1:80/api/viewseats").then((response) => {
            this.setState({
                seats: response.data,
            });
        });
    }

    getBookingData(){
        axios.get("http://127.0.0.1:80/api/viewbookingData").then((response) => {
            this.setState({
                bookingData: response.data,
            });
        });
    }

    seatGeneration() {
        this.getSeats();
        this.getBookingData();
        var seats = this.state.seats;
        var bookingData = this.state.bookingData;
        var availableTime = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

        var tempSeats = [];

        seats.forEach(element => {
            var seat = { "id": element.id, "tableNo": element.table_number, "availableTime": availableTime }
            tempSeats.push(seat);
        });

        var tempSeats2 = [];

        bookingData.forEach(element => {
            var seat = tempSeats.find(x => x.id === element.seat);

            seat.availableTime = seat.availableTime.remove(dateFormat(element.datetime, "H"));
            tempSeats2.push(seat);
        });

        this.setState({
            slots: tempSeats2
        })

    }

    searchBy(){
        let {seat, tableno, date, time} = this.state.searchViewData
        axios.get("http://127.0.0.1:80/api/viewbookingData",{params: {seat, tableno, date, time}}).then((response) => {
            this.setState({
                bookingData: response.data,
            });
            this.seatGeneration();
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
                <tr key={slot.seatID}>
                    <td>{slot.seatID}</td>
                    <td>{slot.tableNo}</td>
                    <td>{slot.time}</td>
                    <td>Action</td>
                </tr>
            );
        });
        return (
            <div className="container" >


                <FormGroup tag="fieldset">
                    <h1>Search By</h1>
                    <FormGroup check>
                    <Label>Date</Label> <br/><br/>
                        <DatePicker id = "datepicker"
                                    value = {this.state.dateValue}
                                    onChange = {(v,f) => this.handleChange(v, f)}/>
                    </FormGroup>

                    <FormGroup check>
                    <Label>Time</Label> <br/><br/>
                    <Input type="select" for="times" id="times"
                            onChange={(e) => {
                                let { searchViewData } = this.state
                                searchViewData.time = e.target.value
                                this.setState({ searchViewData })
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
                    
                    <Button type="submit" onClick={this.searchBy.bind(this)}>Search</Button>
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
