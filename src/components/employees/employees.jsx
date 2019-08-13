import React, { Component } from 'react';
import './employees.css';
import axios from 'axios';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/employeeData.json').then(result => {
            this.setState({data: result.data.user});            
        }).catch(e => {
            // return callback(new Error('something went wrong please ry again later'));
            console.log(e);
        })
    }

    generateTable(data) {
        return data.map((elem) => {
            return (
                <tr key={elem.id}>
                    <td>{elem.id}</td>
                    <td>{elem.name}</td>
                    <td>{elem.age}</td>
                    <td>{elem.gender}</td>
                    <td>{elem.email}</td>
                    <td>{elem.phoneNo}</td>
                </tr>
            );
        })
    }
    render() {
        return (
            <div className="table-responsive employeeTable">
                <table className="table">
                    <thead className="thead-dark">
                        <tr className="">
                            <th>ID</th>
                            <th>Name</th>                        
                            <th>age</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>phone No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTable(this.state.data)}
                    </tbody>
                </table>
               
            </div>
        );
    }
}

export default Employees;