import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Form,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Dropdown
} from "reactstrap";
import axios from "axios";
import dateFormat, { masks } from "dateformat";


export default class ViewSlot extends Component {
    constructor() {
        super();

        this.toggle = this.toggle.bind(this);

        this.state = {
            slots: [],
            
            searchBy: "seatID",
            searchInput: "",

            seats: [],
            bookingData:[],

            dropdownOpen:false,
            
        };
    }

    toggle(){
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    componentWillMount() {
        this.loadSlot();
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
            var seat = { "id": element.id, "tableNo": element.tableNo, "availableTime": availableTime }
            tempSeats.push(seat);
        });

        

        bookingData.forEach(element => {
            var seat = tempSeats.find(x => x.id === element.seatID);
            seat.availableTime = seat.availableTime.remove(element.time);
        });
    }

    searchBy(){

    }


    loadSlot() {
        axios.get("http://127.0.0.1:80/api/slots").then((response) => {
            this.setState({
                slots: response.data,
            });
        });
    }

    render() {
        let slots = this.state.slots.map((slot) => {

            var datetime_date = new Date(slot.date_time);

            return (
                <tr key={slot.seatID}>
                    <td>{slot.tableNo}</td>
                    <td>{slot.status}</td>
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                </tr>
            );
        });
        return (
            <div className="container" >


                <FormGroup tag="fieldset">
                    <legend>Search By</legend>
                    <FormGroup check>
                        <Label check>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                            Year
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Pick Year</DropdownItem>
                                <DropdownItem>2018</DropdownItem>
                                <DropdownItem>2019</DropdownItem>
                                <DropdownItem>2020</DropdownItem>
                                <DropdownItem>2021</DropdownItem>
                                <DropdownItem>2022</DropdownItem>
                                <DropdownItem>2023</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="searchBy" onClick={() => {
                                this.setState({
                                    searchBy: "tableNo"
                                })
                            }} /> Table Number
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="searchBy" id="searchBy" placeholder={this.state.searchBy}
                            onChange={(e) => {
                                this.setState({
                                    searchInput: e.target.value
                                })
                            }}
                        />
                    </FormGroup>
                    <Button type="submit">Search</Button>
                </FormGroup>

                <Table>
                    <thead>
                        <tr>
                            <th>Seat ID</th>
                            <th>Table Number</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
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
