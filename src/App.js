import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from './Redux/Slices/TaskSlice';
import Task from './Components/Task';
import { TaskFilters } from './MockData/mockTask';

function App() {
  const allTasks = useSelector(state => state.Tasks)
  const [filteredtasks, setFilteredTasks] = useState(allTasks)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [currentTaskID, setCurrentTaskID] = useState(0)
  const [currentFilter, setCurrentFilter] = useState('A')
  const Dispatch = useDispatch()

  const submitTask = () => {
    if(taskTitle === '') return
    if(currentTaskID) {
      const payload = {
        id: currentTaskID,
        title: taskTitle,
        desc: taskDesc
      }
      Dispatch(updateTask(payload))
    } else {
      const payload = {
        id: new Date().getTime(),
        title: taskTitle,
        desc: taskDesc,
        isComplete: false
      }
      Dispatch(addTask(payload))
    }
    setTaskTitle('')
    setTaskDesc('')
    setCurrentTaskID(0)
  }

  const editTask = (id) => {
    setCurrentTaskID(id)
    const currentTask = allTasks.find(task => task.id === id)
    setTaskTitle(currentTask.title)
    setTaskDesc(currentTask.desc)
  }

  const filterTasks = (filterType) => {
    setCurrentFilter(filterType)
    switch (filterType) {
      case 'A': 
        setFilteredTasks(allTasks);
        break
      case 'C': 
        setFilteredTasks(prev => {
          return allTasks.filter(task => task.isComplete === true)
        })
        break
        case 'P': 
        setFilteredTasks(prev => {
          return allTasks.filter(task => task.isComplete === false)
        })
        break
      default:
        setFilteredTasks(allTasks);
          break
    }
  }

  useEffect(() => {
    filterTasks(currentFilter)
  }, [allTasks])

  return (
    <div className="App">
      <div className='Fields-Container'>
        <input type='text' value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder='Enter Task Title'/>
        <input type='text' value={taskDesc} onChange={e => setTaskDesc(e.target.value)} placeholder='Enter Description'/>
        <button type='button' onClick={submitTask}>{currentTaskID ? 'Update' : 'Add'}</button>
      </div>
      <div className='Filter-Container'>
        Show: 
        {TaskFilters.map(filter => {
          return (
          <div>
            <input type='radio' name='filterTasks' id={`filter${filter.code}`} onChange={() => filterTasks(filter.code)}/>
            <label htmlFor={`filter${filter.code}`}>{filter.name}</label>
          </div>
          )
        })}
      </div>
      <div className='Tasks-List'>
        {filteredtasks && filteredtasks.length ?
        filteredtasks.map(task => {
          return <Task task={task} editTask={editTask}/>
        }) 
        : <div className='No-Tasks'>No Tasks</div>}
      </div>
    </div>
  );
}

export default App;
