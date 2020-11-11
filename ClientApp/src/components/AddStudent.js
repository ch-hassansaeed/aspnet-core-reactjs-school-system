import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Student {
    constructor() {
        this.id = 0;
        this.name = "";
        this.roll = "";
    }
}

export class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", studentObj:new Student, loading: true };

        this.initialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);


    }
    async initialize() {
        //the studentid variable will get the student id from URL.
        var studentid = this.props.match.params["Id"];

        //if studentid is greater than 0 then fetch method will get the specific student record and display it as in edit mode.
        if (studentid > 0) {
            const response = await fetch('api/students/' + studentid);
            const data = await response.json();
            this.setState({ title: "Edit", studentObj: data, loading: false });
        }
        else {
            this.state = { title: "Create", studentObj: new Student, loading: false };
        }
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Student</h3>
            <hr />
            {contents}
        </div>;
    }


    handleSave(event) {
        event.preventDefault();
        //const data = JSON.stringify(Object.fromEntries(new FormData(event.target)));//new FormData(event.target);
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.studentObj.id>0) {//for edit
            fetch('api/students/' + this.state.studentObj.id, {
                method: 'PUT',
                body: data,
            });
            this.props.history.push("/fetch-students");
            alert("Record Updated Successfully.")
            //window.location.reload(false);
        }
        else {//for add
            fetch('api/students', {
                method: 'POST',
                body: data,
            });
            this.props.history.push("/fetch-students");
            //window.location.reload(false);
        }
    }


    handleCancel(e) {
        e.preventDefault();
         this.props.history.push("/fetch-students");
    }


    //this method will return the html table to display all the student record with edit and delete methods.
   renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.studentObj.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Name" defaultValue={this.state.studentObj.name} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="roll" >Roll</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="roll" defaultValue={this.state.studentObj.roll} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }



}//END::export class AddStudent extends Component {