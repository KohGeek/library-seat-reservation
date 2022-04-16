import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button } from "reactstrap";
import axios from "axios";
import dateFormat from "dateformat";


export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            logs: [],

        };
    }

    // Loads All Logs
    loadLog() {
        axios.get("http://127.0.0.1:80/api/booking", {}).then((response) => {
            this.setState({
                logs: response.data,
            });
        });

    }

    // Delete
    deleteBooking(id) {
        axios.delete("http://127.0.0.1:80/api/booking/" + id)
            .then((response) => {
                this.loadLog();
            });
    }

    // DEFAULT STUFF
    componentDidMount() {
        this.loadLog();
    }

    // Render
    render() {
        let logs = this.state.logs.map((log) => {
            var datetime_date = new Date(log.datetime);
            var createdat_date = new Date(log.created_at);

            return (
                <tr key={log.id}>
                    <td>{dateFormat(datetime_date, "yyyy-mm-dd HH:MM:ss")}</td>
                    <td>{log.id}</td>
                    <td>{log.name}</td>
                    <td>{log.purpose}</td>
                    <td>{log.seat}</td>

                    <td>
                        {dateFormat(createdat_date, "yyyy-mm-dd HH:MM:ss")}
                    </td>
                    <td>
                        <Button
                            color="danger"
                            size="sm"
                            outline
                            onClick={this.deleteBooking.bind(this, log.id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="container">
                {/* Load Table */}
                <div>
                    {/* Missing OnClick*/}
                    <a className="btn btn-primary mt-4" href="/booking">
                        Add
                    </a>
                    <div className="table-responsive">
                        <Table>
                            <thead>
                                <tr>
                                    <th> Booked Date & Time </th>
                                    <th> Booking ID </th>
                                    <th> Person Name </th>
                                    <th> Purpose </th>
                                    <th> Seat </th>
                                    <th> Booked At </th>
                                </tr>
                            </thead>
                            <tbody>{logs}</tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
