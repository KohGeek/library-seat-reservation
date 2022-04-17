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
            logsHasData: true,
            spinner: false,
        };
    }

    // Loads All Logs
    loadLog() {
        axios.get("http://127.0.0.1:80/api/booking", {}).then((response) => {
            this.setState({
                logs: response.data,
                logsHasData: response.data.length > 0,
            });
        });

    }

    // Delete
    async deleteBooking(id) {
        this.setState({ spinner: id });
        await new Promise(r => setTimeout(r, 500));
        axios.delete("http://127.0.0.1:80/api/booking/" + id);
        this.loadLog();
        this.setState({ spinner: false });
    }

    componentDidMount() {
        this.loadLog();
    }

    // Render
    render() {
        let logs = this.state.logsHasData ? this.state.logs.map((log) => {
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
                    <td className="text-center col-2">
                        <Button color="danger" size="sm" outline onClick={this.deleteBooking.bind(this, log.id)}>
                            {this.state.spinner == log.id ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                            <span>Delete</span>
                        </Button>
                    </td>
                </tr>
            );
        }) : <tr><td colSpan="6" className="text-center">No Booking Data</td></tr>;

        return (
            <div className="container">
                <div>
                    <a className="btn btn-primary mt-2" href="/booking">
                        Add Booking
                    </a>
                    <div className={this.state.spinner ? "mt-2 table-responsive opacity-25" : "mt-2 table-responsive"}>
                        <Table className="table-striped">
                            <thead>
                                <tr>
                                    <th>Booked Date & Time</th>
                                    <th>Booking ID</th>
                                    <th>Person Name</th>
                                    <th>Purpose</th>
                                    <th>Seat</th>
                                    <th>Booked At</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs}
                            </tbody>
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
