import React, { FC, createContext, useState, useEffect, useCallback, useMemo } from "react"
import { View, ViewStyle, TextStyle, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import { color, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import WeekCalendar from "../../components/week-calendar/WeekCalendar"
import { useAppSelector } from "../../store/hooks"
import { Task, taskSelector } from "../../store/task/taskSlice"
import { TaskStackNavigatorParamList } from "../../navigators/tasks-navigator"
import TaskCard from "../../components/task-card/TaskCard"
import { List } from "@ui-kitten/components"
import { TaskModel } from "../../utils/models/task-model"

const FULL: ViewStyle = { flex: 1 }

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const CONTINUE: ViewStyle = {
  // paddingVertical: spacing[4],
  // paddingHorizontal: spacing[4],
  width: 180,
  marginTop: 30,
  backgroundColor: color.palette.deepPurple,
  marginRight: 15,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const DATE_TEXT: TextStyle = {
  ...TEXT,
  color: "rgba(100, 100, 100, 0.8)",
  fontSize: 18,
  marginTop: 10,
  marginLeft: 15,
}

const DAY_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: "black",
  fontSize: 24,
  marginVertical: 4,
  marginLeft: 15,
}

const ROW_VIEW: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  // flex: 1,
  // flexGrow: 1,
  // flexShrink: 1,
  marginBottom: 20,
}

export const TodoContext = createContext({})
export type TodoContextType = {
  date?: Date[]
  today?: number
  selected?: number
  setDate?: () => undefined
  setToday?: () => undefined
  setSelected?: () => undefined
}

export const TaskScreen: FC<StackScreenProps<TaskStackNavigatorParamList, "task">> = observer(
  ({ navigation }) => {
    console.log("rerender task")

    const { day, dateList } = useMemo(() => {
      const curr = new Date()
      const day = (curr.getDay() + 6) % 7
      const first = curr.getDate() - ((curr.getDay() + 6) % 7)
      const dateList: Date[] = []
      for (let i = 0; i < 7; i++) {
        dateList.push(new Date(curr.setDate(first + i)))
      }
      return { day, dateList }
    }, [])

    const [date, setDate] = useState<Date[]>(dateList)
    const [today, setToday] = useState<number>(day)
    const [selected, setSelected] = useState<number>(day)
    const [tasks, setTasks] = useState([])
    // const [taskListCache, setTaskListCache] = useState({})

    const tasksList = useAppSelector(taskSelector)

    const addTask = useCallback(async () => {
      navigation.navigate("taskInfo", { type: "add" })
    }, [])

    const getSelectedDateTasks = useCallback(() => {
      // const taskList = await getAllTask(date[selected])
      const taskModelList = tasksList
        .map((task) => {
          return { ...task, startAt: new Date(task.startAt) }
        })
        .filter((task) => {
          return task.startAt.toLocaleDateString() === date[selected].toLocaleDateString()
        })
      // console.log("async end")
      // if()
      setTasks(taskModelList || [])
      // console.log("use redux")
      // CACHING
      // const newTaskListCache = { ...taskListCache }
      // newTaskListCache[date[selected].toLocaleDateString()] = taskModelList
      // setTaskListCache(newTaskListCache)
      // console.log(taskListCache)
    }, [selected, tasksList])

    // const getCache = useCallback(() => {
    //   const tasksCache = taskListCache[date[selected].toLocaleDateString()]
    //   console.log(tasksCache)
    //   if (tasksCache) {
    //     setTasks(tasksCache)
    //     console.log("use cache")
    //   }
    // }, [selected])

    // useEffect(() => {
    //   getCache()
    // }, [selected])

    useEffect(() => {
      getSelectedDateTasks()
    }, [getSelectedDateTasks, selected, tasksList])

    return (
      <TodoContext.Provider value={{ date, setDate, today, setToday, selected, setSelected }}>
        <View testID="TaskScreen" style={FULL}>
          {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
          <Screen preset="fixed" backgroundColor={color.transparent}>
            <View style={ROW_VIEW}>
              <View>
                <Text style={DATE_TEXT}>{date[selected].toDateString()}</Text>
                <Text style={DAY_TEXT}>Today</Text>
              </View>
              <View>
                <Button
                  testID="next-screen-button"
                  style={CONTINUE}
                  textStyle={CONTINUE_TEXT}
                  tx="welcomeScreen.continue"
                  onPress={addTask}
                />
              </View>
            </View>
            <WeekCalendar />
            <List
              // style={}
              // scrollEnabled
              data={tasks}
              renderItem={({ item }) => {
                return (
                  <TaskCard
                    task={item}
                    key={item.id}
                    onPress={(id) => {
                      console.log("edit task")
                      navigation.navigate("taskInfo", { type: "edit", taskId: id })
                    }}
                  />
                )
              }}
            />
          </Screen>
        </View>
      </TodoContext.Provider>
    )
  },
)

// const styles = StyleSheet.create({
//   list: {},
// })
