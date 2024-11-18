import { createSlice } from "@reduxjs/toolkit";
import { mockTasks } from "../../MockData/mockTask";

const initialState = mockTasks

const TaskSlice = createSlice({
    name: 'Tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        updateTask: (state, action) => {
            state.find(task => task.id === action.payload.id).title = action.payload.title
            state.find(task => task.id === action.payload.id).desc = action.payload.desc
        },
        completeTask: (state, action) => {
            state.find(task => task.id === action.payload.id).isComplete = !action.payload.currentState
        },
        deleteTask: (state, action) => {    
            return state.filter(task => task.id !== action.payload)
        }
    }
})

export const { addTask, updateTask, completeTask, deleteTask} = TaskSlice.actions
export default TaskSlice.reducer