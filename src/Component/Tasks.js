import { useState } from 'react';
import './CrossLine.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DateObject from "react-date-object";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewtask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [filterTasks, setFilterTasks] = useState('All')

  var date = new DateObject();

  const handleInputvalue = (e)=> {
    setNewtask(e.target.value);
  }
  const handleAdd = ()=>{
    if(newTask.trim() === '');
    if (editTaskIndex == null) {
      setTasks([...tasks,{id: Date.now() , text: newTask, isCompleted: false }]);
      setNewtask('');
    } else {
      const updatedTask = tasks[editTaskIndex];
      updatedTask.text = newTask;
      tasks[editTaskIndex] = updatedTask;

      // setTasks(tasks);

      setTasks(
        tasks.map((task, index) => {
            return index === editTaskIndex ? updatedTask : task;
        })
      );
      setNewtask('');
      setEditTaskIndex(null)
    }
     
  }
  const handleDelete = (taskId) =>{
     {
      const removeTask = tasks.filter(task => task.id !== taskId);
      setTasks(removeTask);
    };
  }
  // Checkbox....
  const handleCheckbox = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };
  // Edit....
  const handleEdit = (index) => {
    setNewtask(tasks[index].text)
    setEditTaskIndex(index);  
  }
  
  const handleChange =(e) =>{
    setFilterTasks(e.target.value);

  };

  const displayProperty = (task) => {
    if(filterTasks == 'All'){
      return 'block';
    } else if (filterTasks == 'Completed' && task.isCompleted == false) {
      return 'none'
    } else if (filterTasks == 'InCompleted' && task.isCompleted == true) {
      return 'none'
    } else {
      return 'block'
    }
  }
 

  return (
  <div style={{textAlign:"center"}}>
       <div style={{marginRight:"410px"}}>
          <input 
            type="text" 
            value={newTask}
            onChange={handleInputvalue}
          />
          <button className='bnt' onClick={handleAdd}>Add</button>
          
        </div>
        {/* <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            All
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Completed</a>
            <a class="dropdown-item" href="#">InCompleted</a>
          </div>
        </div> */}
        <div style={{marginTop:"-25px",position:"absolute",marginLeft:"970px"}}>
        <form>
          <select onChange={handleChange} value={filterTasks}>
            <option value='All' >All</option>
            <option value='Completed' >Completed</option>
            <option value='InCompleted'>InCompleted</option>
          </select>
        </form>
        </div>
        <div className="card bg-light w-50" style={{margin:"auto",marginTop:'15px'}} >
          {tasks.map((task, index) => (
            <li key={task.id} style={{ textDecoration: (tasks.isCompleted ? 'line-through' : 'none'), display: displayProperty(task) }}  >
              <input
                  type="checkbox"
                  checked={tasks.isCompleted}
                  onChange={() => handleCheckbox(index)}
                />  
              <span style={{marginRight:"600px",fontSize:"20px"}}>{task.text}</span><br/>
              <span style={{fontSize:"x-small",}}>{date.format("DD/MM/YYYY")}</span>  
            
            <button style={{marginLeft:"400px"}}  onClick={() =>handleDelete(task.id)}>Remove</button>
            <button onClick={() => handleEdit(index)}>Edit</button></li>    
          ))}
        </div>
        
  </div>
      
    
  )
}
export default Tasks;