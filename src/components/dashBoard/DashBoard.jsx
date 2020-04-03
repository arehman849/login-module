import React, { Component } from 'react';
import './dashBoard.css';
import { connect } from 'react-redux';
import { getDashboardData } from '../redux/reducer';

class DashBoard extends Component {
    componentDidMount() {
        this.props.getDashboardData();
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
                        {this.props.dashboardData && this.generateTable(this.props.dashboardData)}
                    </tbody>
                </table>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      dashboardData: state.data,
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        getDashboardData: () => dispatch(getDashboardData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);