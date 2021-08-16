import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export type Task = {
  id?: string;
  name: string;
  description: string;
  projectName: string;
  priority: number;
  tag: string[];
  startAt: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type taskOfDate = {
  date: Date;
  task: Task[];
}

export type taskState = {
  today: Date,
  taskDateList: taskOfDate[];
}

const initialState: taskState = {
  today: new Date(),
  taskDateList: [{
    date: new Date(),
    task: [{
      id: "1",
      name: '',
      description: '',
      projectName: '',
      priority: 0,
      tag: [],
      startAt: new Date()

    }]
  }]
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskDateList: {
      reducer: (state, action: PayloadAction<taskOfDate> )  => {
        state.taskDateList.push(action.payload);
      },
      prepare: (taskOfDate: taskOfDate) => {
        const newTaskList = taskOfDate.task.map((task => {
          return {...task, id: nanoid()}
        }))
        const newTaskOfDate: taskOfDate = {
          date: taskOfDate.date,
          task: newTaskList
        }
        return {
          payload: newTaskOfDate
        }; 
      }
    },
    removeAllTaskDateList: (state, action: PayloadAction<any> )  => {
      state.taskDateList = [];
    },
  }
});

export const taskActions = taskSlice.actions

export const taskSelector = (state) => state.task.taskDateList;
export const todaySelector = (state) => state.task.today;

const taskReducer = taskSlice.reducer;
export default taskReducer;