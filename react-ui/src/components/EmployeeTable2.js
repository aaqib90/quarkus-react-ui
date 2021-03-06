import React from 'react';
import MaterialTable from 'material-table';

import { MYSQL_EMPLOYEE_BASE_URL } from '../config/config';
import { CircularProgress } from '@material-ui/core';

const spinnerStyle = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
}

export default class EmployeeTable2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Id', field: 'id' },
        { title: 'Name', field: 'employee_name' },
        { title: 'Age', field: 'employee_age' },
      ],
      data: []
    }
    // console.log("props data", this.props.employeesData)
  }



  loadSpinner = () => {
    return (
      <div style={spinnerStyle}>
        <CircularProgress />
      </div>
    );
  }

  componentDidMount() {
    fetch(MYSQL_EMPLOYEE_BASE_URL).then((data) => data.json())
    .then((data) => {
        this.setState({
            data: data.data
        })
    }).catch((err) => {
      alert("Error!, while retrieving record");
    })
    //this.getEmployeeTable()
  }

  addEmployeeRecord = (newData) => {
    console.log("row add triggered with ", newData);
    return new Promise((resolve, reject) => {
      fetch(MYSQL_EMPLOYEE_BASE_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData),
        },
      )
      // .then((res)=> res.json())
      .then((res) => {
        resolve();
      }).catch((err) => {
          console.log(err)
          reject(err);
      })
    })
  }

  updateEmployeeRecord = (id, newData) => {
    console.log("row update triggered with ", newData);
    return new Promise((resolve, reject) => {
      fetch(MYSQL_EMPLOYEE_BASE_URL+'/'+id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData),
        },
      )
      // .then((res)=> res.json())
      .then((res) => {
        resolve();
      }).catch((err) => {
          console.log(err)
          reject(err);
      })
    })
  }

  deleteEmployeeRecord = (id) => {
    console.log("row delete triggered with id", id);
    return new Promise((resolve, reject) => {
      fetch(MYSQL_EMPLOYEE_BASE_URL+'/'+id,
        {
          method: 'DELETE',
        }
      )
      .then((res)=> res.text())
      .then((res) => {
        resolve();
      }).catch((err) => {
          console.log(err)
          reject(err);
      })
    })
  }

  render() {
    return (
      (this.state.data && this.state.data.length>=1) ?
        <MaterialTable
        title="Employee List"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
            onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                
                this.addEmployeeRecord(newData).then((data) => {
                    resolve();
                    this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                    });
                }).catch((err) => {
                    reject(err);
                })
                }, 600);
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve,reject) => {
                setTimeout(() => {
                if (oldData) {
                    this.updateEmployeeRecord(oldData.id, newData)
                    .then((data) => {
                    resolve();
                    this.setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                    })
                    .catch((err) => {
                    reject(err);
                    })
                }
                }, 600);
            }),
            onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                this.deleteEmployeeRecord(oldData.id)
                .then((data) => {
                    resolve();
                    this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                    });
                })
                .catch((err) => {
                    alert("ERROR");
                    console.log(err);
                })

                }, 600);
            }),
        }}
        /> : this.loadSpinner()
    );
  }
}
