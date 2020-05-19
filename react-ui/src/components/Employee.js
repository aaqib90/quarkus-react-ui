import React from 'react'
import Header from './Header'
import EmployeeTable from './EmployeeTable'
import EmployeeTable1 from './EmployeeTable1';

class Employee extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <EmployeeTable1 />
            </>
        )
    }
}

export default Employee