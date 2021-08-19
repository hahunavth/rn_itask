import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { TaskModel } from "../../utils/models/task-model";


export interface Tag {
  id?: number;
  name: string;
  createdAt: Date;
}

export interface projectName {
  id?: number;
  name: string;
  createdAt: Date;
}

export type Task = {
  id?: string;
  name: string;
  description: string;
  projectName: string;
  priority: number;
  tag: string[];
  startAt: string;
  endAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const TaskModel2Task = (taskModel: TaskModel) : Task => {
  const task: Task = {...taskModel, 
    startAt: taskModel.startAt.toISOString(),
    createdAt: taskModel.createdAt.toISOString(),
    updatedAt: taskModel.updatedAt.toISOString(),
    endAt: taskModel.endAt.toISOString(),
  }
  console.log(task)
  return task
}

export const Task2TaskModel = (task: Task) : TaskModel => {
  const taskModel: TaskModel = {...task, 
    startAt: new Date(task.startAt),
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    endAt: new Date(task.endAt),
  }
  console.log(taskModel)
  return taskModel
}

const initialState: Task[] = []

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload)
      },
      prepare: (task: Task) => {
        // console.log(task)
        const newTask = {...task, id: nanoid()}
        // if(!task.startAt) task.startAt = new Date()
        return {
          payload: newTask
        }
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state = state.filter((task) => {
        return task.id !== action.payload
      })
    },
    updateTask: (state, action: PayloadAction<{id: string, newTask: Task}>) => {
      state = state.map((task) => {
        console.log("new task")
        console.log(action.payload.newTask)
        return task.id === action.payload.id ? action.payload.newTask : task
      })
      return state
    }
    // addTaskDateList: {
    //   reducer: (state, action: PayloadAction<taskOfDate> )  => {
    //     state.taskDateList.push(action.payload);
    //   },
    //   prepare: (taskOfDate: taskOfDate) => {
    //     const newTaskList = taskOfDate.task.map((task => {
    //       return {...task, id: nanoid()}
    //     }))
    //     const newTaskOfDate: taskOfDate = {
    //       date: taskOfDate.date,
    //       task: newTaskList
    //     }
    //     return {
    //       payload: newTaskOfDate
    //     }; 
    //   }
    // },
    // removeAllTaskDateList: (state, action: PayloadAction<any> )  => {
    //   state.taskDateList = [];
    // },
  }
});

export const taskActions = taskSlice.actions

export const taskSelector = (state): Task[] => state.task;

const taskReducer = taskSlice.reducer;
export default taskReducer;