import { useEffect, useState } from "react";
import List from "./tasks";
import { FaCirclePlus, FaCheck, FaTrashCan, FaPen,FaBars } from 'react-icons/fa6';
import { MdSaveAs } from 'react-icons/md'
import ClearBtn from "./clear";
function Todo() {
    const icons = {
        Done: FaCheck,
        Edit: FaPen,
        Delete: FaTrashCan,
        Save: MdSaveAs
    }
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState(()=>{
        try{
            const saved = localStorage.getItem("tasks");
            return saved ? JSON.parse(saved) : [];
        }catch(error){
          return[]
        }
    });
    const [active, setActive] = useState(()=>{
        try{
            const saved=localStorage.getItem("active");
            return saved ? JSON.parse(saved) : [];
        }catch(error){
            return[];
        }
    });
    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks));
        
    },[tasks]);
    useEffect(()=>{
        localStorage.setItem("active",JSON.stringify(active));
    },[active]);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [barbtn,setBarBtn] = useState(false);
    const [FilterType ,setFilterType] =useState("All");
    const [isMobile, setIsMobile] = useState(false)
   

    function handleingonchange(e) {
        setText(e.target.value)
    }
    function handleingonclick() {
        if (text.trim() === "") return;
        if (tasks.some(t => t.text === text)) {
            alert("Already Exist");
            setText("");
            return;
        };

        const newTask = {
            id: Date.now(),
            text: text,
        }

        setTasks([ newTask,...tasks]);
        setText("");

    }
    function onDeleteEvent(id) {
        setTasks(tasks.filter((i) => i.id !== id));
        setActive(active.filter((i) => i !== id));

    }
    function onDoneEvent(id) {
        if (active.includes(id)) { 
            setActive(active.filter(i => i !== id));
        }
        else {
            setActive([...active, id])
        }

    }
    function onEditEvent(id, currentText) {
        setEditId(id);
        setEditText(currentText);


    }
    function onEditSave(id) {
        if (editText.trim() === "") {
            return;
        }
        setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
        setEditId(null);


    }
    function clearEvent() {
        setTasks([]);
        setActive([])
        
    }
    function filterEvent(){
        setBarBtn(!barbtn)
    }
    function filterAll(){
       setFilterType("All")
    }
    function filterPending(){
        setFilterType("Pending")
    }
    function filterComplete(){
        setFilterType("Completed")
    }
    useEffect(()=>{
        function checkWidth(){
            setIsMobile(window.innerWidth < 500);
        }
        checkWidth();
        window.addEventListener("resize",checkWidth);

        return ()=> window.removeEventListener("resize",checkWidth)
    },[]);

    const filteredTasks = tasks.filter(t=>{
        if(FilterType === "All")return true;
        if(FilterType === "Pending")return !active.includes(t.id);
        if(FilterType === "Completed")return active.includes(t.id);
    })
        
    return (
        <>
            <section className="container-box">
                    <div className="input-container">
                        <input type="text" value={text} onChange={handleingonchange} placeholder="Enter Something" />
                        <FaCirclePlus className="btn" onClick={handleingonclick} /> 
                        <FaBars style={{color:"black"}}className="filter" onClick={filterEvent}/>
                        {(barbtn || isMobile ) && (
                        (<select className="filterbtn" onChange={(e)=>{
                            if(e.target.value === "All") filterAll();
                            if(e.target.value === "Pending") filterPending();
                            if(e.target.value === "Completed") filterComplete();
                            
                        }}>
                            <option>All</option>
                            <option>Pending</option>
                            <option>Completed</option>
                        </select>)
                        )}
                    </div>
                   
            


                <List task={filteredTasks} icons={icons} onDelete={onDeleteEvent} onEdit={onEditEvent} onDone={onDoneEvent} onSave={onEditSave} editid={editId} editText={editText} setEditText={setEditText} active={active} /
                >



                {tasks.length > 0 ?
                    (<div className="clear-wrapper">
                        <ClearBtn onClear={clearEvent} text={text} />
                    </div>) : ""
                }

            </section>
        </>
    )
}
export default Todo;