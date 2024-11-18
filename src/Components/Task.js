
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../Redux/Slices/TaskSlice';

const Task = ({task, editTask}) => {
  const Dispatch = useDispatch()
  const isCompleteTask = (currentState, id) => {
    Dispatch(completeTask({ currentState, id }));
  };

  const deleteTasks = (id) => {
    Dispatch(deleteTask(id));
  };
  return (
    <div className="Task-Box" key={task.id}>
      <div className="Task-Details">
        <input
          type="checkbox"
          checked={task?.isComplete}
          onChange={() => isCompleteTask(task?.isComplete, task.id)}
        />
        <p>{task?.title}</p>
        <span>{task?.desc}</span>
      </div>
      <div className="Task-Actions">
        <button
          onClick={() => editTask(task.id)}
          className={
            task?.isComplete ? "Edit-Task Completed-Task" : "Edit-Task"
          }
        >
          Edit
        </button>
        <button onClick={() => deleteTasks(task.id)} className="Delete-Task">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
