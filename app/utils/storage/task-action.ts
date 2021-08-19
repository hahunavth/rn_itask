import { TaskModel } from "../models/task-model"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAllTask = async (date: Date) => {
  try {
    if (!date) return []
    // AsyncStorage.clear()
    // DATE_01/01/2001
    const arrStr = await AsyncStorage.getItem("@DATE_" + date.toLocaleDateString())
    // id: number
    const taskIdList = arrStr ? JSON.parse(arrStr).map((id) => ("@TASK_" + id)) : []
    // [...id]
    // console.log(taskIdList)
    const taskListStr = await AsyncStorage.multiGet(taskIdList)
    // console.log(taskListStr)
    // console.log(await AsyncStorage.getAllKeys())
    let taskList = []
    // ReturnType TaskModel[]
    if(taskListStr) {
      taskList = taskListStr.map((taskStr) => {
        const taskId = taskStr[1]
        return JSON.parse(taskId) || []
      })
      taskList = taskList.map((task) => {
        return {
          ...task,
          startAt: new Date(task.startAt),
          endAt: new Date(task.endAt),
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }
      })
    }
    // console.log(taskList)
    return taskList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getTask = () => {

}

export const addTask = async (task: TaskModel) => {
  try {
    // get MAX_TASK_ID and +1
    const MAX_TASK_ID = Number.parseInt(await AsyncStorage.getItem("MAX_TASK_ID") || "0");
    const id = (MAX_TASK_ID + 1).toString()
    await AsyncStorage.setItem("MAX_TASK_ID", id)
    // getIdList
    const taskList = await getAllTask(task.startAt)
    // set id for new task
    const newTask = {...task, id: id}
    let newTaskList = [...taskList, newTask]
    // new task id list
    newTaskList =  newTaskList.sort((task1: TaskModel, task2: TaskModel) => {
          return task1.startAt.getTime() - task2.startAt.getTime()
        })
    const newTaskIdList = newTaskList.map((task) => (task.id))
    // save task
    await AsyncStorage.setItem(
      "@TASK_" + id,
      JSON.stringify(newTask),
    )
    // save idlist
    await AsyncStorage.setItem("@DATE_" + newTask.startAt.toLocaleDateString(), JSON.stringify(newTaskIdList))
  } catch (e) {
    console.log(e)
  }
}

// export const updateTask = async (date: Date, task: TaskModel, newTask: TaskModel) => {
//   try {
//     const taskList: TaskModel[] = await getAllTask(task.startAt)
//     const newTaskList: TaskModel[] = taskList.map((taskItem) => {
//       if (taskItem.name === task.name) {
//         return newTask
//       }
//       return taskItem
//     })
//     return await AsyncStorage.setItem(
//       task.startAt.toLocaleDateString(),
//       JSON.stringify(newTaskList),
//     )
//   } catch (e) {
//     console.log(e)
//   }
// }

// export const deleteAllTask = async (date: Date) => {
//   try {
//     await AsyncStorage.removeItem("DATE_" + date.toLocaleDateString())
//   } catch (e) {
//     console.log(e)
//   }
// }

// export const deleteTask = async (date: Date, task: TaskModel) => {
//   try {
//     const taskList: TaskModel[] = await getAllTask(task.startAt)
//     const newTaskList: TaskModel[] = taskList.filter((taskItem) => {
//       return taskItem.name !== task.name
//     })
//     return await AsyncStorage.setItem(
//       task.startAt.toLocaleDateString(),
//       JSON.stringify(newTaskList),
//     )
//   } catch (e) {
//     console.log(e)
//   }
// }
