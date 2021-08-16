import { configureStore, combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";

const rootReducer = combineReducers({
  task: taskReducer
});

const store = configureStore({
  reducer: rootReducer,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store