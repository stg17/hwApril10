import React from 'react'
import axios from 'axios';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: { id: '', firstName: '', lastName: '', age: '' },
        showEditForm: false,
        checkedPeople: []
    }

    getPeople = () => {
        axios.get("/api/people/getpeople").then(response => {
            this.setState({ people: response.data });
        });
    }

    onDeleteClick = (person) => {
        const { firstName, lastName, age, id } = person;
        axios.post('/api/people/deleteperson', { id, firstName, lastName, age }).then(response => {
            this.getPeople();
        });
    }

    componentDidMount = () => {
        this.getPeople();
    }

    onAddClick = () => {
        const { people, person } = this.state;
        const { firstName, lastName, age } = this.state.person;
        axios.post("/api/people/addperson", { firstName, lastName, age: +age }).then(response => {
            this.setState({ people: [...people, person], person: { id: '', firstName: '', lastName: '', age: '' } });
            this.getPeople();
        });
    }

    onTextInput = (e) => {
        const copy = this.state.person;
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy })
    }

    onEditClick = (person) => {
        this.setState({person: {
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            age: person.age
        }, showEditForm: true})
    }

    showForm = () => {
        if (!this.state.showEditForm) {
            return this.addForm();
        }
        else {
            return this.editForm();
        }
    }

    onUpdateClick = () => {
        const { people, person } = this.state;
        const { firstName, lastName, age, id } = this.state.person;
        axios.post("/api/people/edit", {id: +id, firstName, lastName, age: +age }).then(response => {
            this.setState({person: { id: '', firstName: '', lastName: '', age: '' }, showEditForm: false });
            this.getPeople();
        });
    }

    onCancelClick = () => {
        this.setState({showEditForm: false, person: { id: '', firstName: '', lastName: '', age: '' }});
    }

    editForm = () => {
        const { people } = this.state;
        const { firstName, lastName, age } = this.state.person;
        return <div className="col-md-3">
                <button className="btn btn-dark w-100" onClick={this.onUpdateClick}>Update</button>
                <button className='btn btn-warning w-100 mt-2' onClick={this.onCancelClick}>Cancel</button>
            </div>
   
    }

    addForm = () => {
        const { people } = this.state;
        const { firstName, lastName, age } = this.state.person;
        return <div className="col-md-3">
                <button className="btn btn-primary w-100" onClick={this.onAddClick}>Add</button>
            </div>
    }

    onCheckBoxChange = (person) => {
        if (this.state.checkedPeople.includes(person))
            {
                this.setState({checkedPeople: this.state.checkedPeople.filter(cp => cp.id !== person.id)})
            }
            else {
                this.setState({checkedPeople: [...this.state.checkedPeople, person]});
            }
    }

    uncheckAll = () => {
        this.setState({checkedPeople: []});
    }

    checkAll = () => {
        this.setState({checkedPeople: [...this.state.people]});
    }

    deleteChecked = () => {
        this.state.checkedPeople.forEach(cp => this.onDeleteClick(cp));
        this.getPeople();
    }

    render() {
        const { people, checkedPeople } = this.state;
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className='container' style={{ marginTop: 30 }}>
                <div className='row'>
            <div className="col-md-3">
                <input onChange={this.onTextInput} type="text" className="form-control" placeholder="First Name" name="firstName" value={firstName} />
            </div>
            <div className="col-md-3">
                <input onChange={this.onTextInput} type="text" className="form-control" placeholder="Last Name" name="lastName" value={lastName} />
            </div>
            <div className="col-md-3">
                <input onChange={this.onTextInput} type="text" className="form-control" placeholder="Age" name="age" value={age} />
            </div>
            {this.showForm()}
        </div>
                
                <div className='col-md-12 mt-4'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>
                                    <button onClick={this.deleteChecked} className="btn btn-danger w-100">Delete Checked</button>
                                    <button onClick={this.checkAll} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                    <button onClick={this.uncheckAll} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p => <PersonRow person={p} key={p.id}
                                onDeleteClick={() => this.onDeleteClick(p)}
                                onEditClick={() => this.onEditClick(p)}
                                onCheckBoxChange={() => this.onCheckBoxChange(p)}
                                checked={checkedPeople.includes(p)} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PeopleTable;