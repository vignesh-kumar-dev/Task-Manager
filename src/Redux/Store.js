import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from './Slices/TaskSlice'

export const Store = configureStore({
    reducer: {
        Tasks: TaskSlice
    }
})