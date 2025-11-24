function List({ task, icons, onDelete, onDone, onEdit, onSave, editid,editText,setEditText, active }) {
    const DeleteIcon = icons.Delete;
    const EditIcon = icons.Edit;
    const DoneIcon = icons.Done;
    const SaveIcon = icons.Save
    return (
        <ul className="list">
            {task.map((items) => (
                <div className="list-items" key={items.id}>
                    <div className={`${active.includes(items.id) ? "Done" : "Done-div"}`} onClick={() => onDone(items.id)}><DoneIcon className="done-icon"></DoneIcon></div>
                    {editid === items.id ? (
                        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} placeholder={items.text} autoFocus />

                    ) : (
                        <li className={`list-item ${active.includes(items.id) ? 'active' : ''}`} >{items.text}</li>
                    )}
                    
                    {editid === items.id ?
                        (< div className="icons Edit" onClick={() =>onSave(items.id)}> <SaveIcon className="icon"/></div>) :

                        (< div className="icons Edit" onClick={() => onEdit(items.id)}> <EditIcon className="icon"/></div>)
                    }
            <div className="icons Delete" onClick={() => onDelete(items.id)}> <DeleteIcon className="icon"/></div>


        </div>
    ))
}
        </ul >
    )
}
export default List;