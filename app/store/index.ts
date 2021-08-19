import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1"
import AsyncStorage from "@react-native-async-storage/async-storage"
import taskReducer from "./task/taskSlice"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
  whiteList: ["task"]
}

const rootReducer = combineReducers({
  task: taskReducer,
})

const _persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

// const store = configureStore({
//   reducer: rootReducer,
// })

// export default () => {
//   const store = createStore(persistedReducer)
//   const persistor = persistStore(store)
//   return { store, persistor }
// }
export const persistor = persistStore(store);