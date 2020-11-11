import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FetchStudents extends Component {
  //static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { studentsArr: [], loading: true };
  }

  componentDidMount() {
    this.populateStudentsData();
    }

    async populateStudentsData() {
        const response = await fetch('api/students');
        const data = await response.json();
        this.setState({ studentsArr: data, loading: false });
    }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderStudentsTable(this.state.studentsArr);

    return (
      <div>
        <h1 id="tabelLabel" >Students Data</h1>
            <p>This component demonstrates fetching student data from the server db.</p>
            <p>
                <Link to="/addstudent">Add New Student</Link>
            </p>
        {contents}
      </div>
    );
  }

    //view students
    renderStudentsTable(studentsArr) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name </th>
                        <th>Roll</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {studentsArr.map(studentSingle =>
                        <tr key={studentSingle.id}>
                            <td>{studentSingle.id}</td>
                            <td>{studentSingle.name}</td>
                            <td>{studentSingle.roll}</td>
                            <td>
                                <a className="btn btn-success" onClick={(id) => this.handleEdit(studentSingle.id)}>Edit</a>  |
                            <a className="btn btn-danger" onClick={(id) => this.handleDelete(studentSingle.id)}>Delete</a>
                            </td>  
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    //delete students
    // Handle Delete request for an employee  

    handleDelete(id) {
        if (!window.confirm("Do you want to delete student with Id: " + id))
            return;
        else {
            fetch('api/students/' + id, {
                method: 'delete'
            });
            //    .then(data => {
            //    this.setState(
            //        {
            //            studentsListData: this.state.studentsArr.filter((rec) => {
            //                return (rec.id != id);
            //            })
            //        });

                
            //});
            alert("Record Deleted Successfully.")
            this.populateStudentsData();
            //this.props.history.push("/fetch-students");
        }
    }
     //edit students
     handleEdit(id) {
        this.props.history.push("/students/edit/" + id);
    }  
   
}
