import React from 'react'
import Header from './Header'
import EmployeeTable from './EmployeeTable'
import EmployeeTable1 from './EmployeeTable1';

const BASE_URL = 'https://quarkusapi.herokuapp.com/api/v1/employees';

class Employee extends React.Component {
    constructor() {
        super()
        this.state = {
            employeesData: []
        }
    }
    getEmployeeTable = () => {
        return (
            <EmployeeTable1 employeesData={this.state.employeesData}/>
        )
    }
    
    componentDidMount() {
        fetch(BASE_URL).then((data) => data.json())
        .then((data) => {
            this.setState({
                employeesData: data
            })
        })
        //this.getEmployeeTable()
    }
    render() {
        const data =  this.state.employeesData;
        return (
            <>
                <Header/>
                {/* <EmployeeTable employeesData={this.state.employeesData}/> */}
                { this.state.employeesData.length >= 1 ?
                    this.getEmployeeTable() : ''
                }
            </>
        )
    }
}

export default Employee