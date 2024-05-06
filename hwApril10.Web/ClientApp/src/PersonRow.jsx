function PersonRow({ person, onDeleteClick, onEditClick, onCheckBoxChange, checked }) {
    const { firstName, lastName, age } = person;
    return (<tr>
        <td>
            <div className="d-flex justify-content-center align-items-center">
                <input 
                checked={checked}
                onChange={onCheckBoxChange}
                style={{ width: 30, height: 30 }} type="checkbox" className="form-check-input" />
            </div>
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <div>
                <button onClick={onEditClick} className="btn btn-warning">Edit</button>
                <button onClick={onDeleteClick} className="btn btn-danger">Delete</button>
            </div>
        </td>
    </tr>)
}

export default PersonRow;