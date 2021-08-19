import React, { useState, useCallback, FC } from "react"
import { View, Text, StyleSheet, Button, Platform } from "react-native"
import { Input, SelectItem, Icon } from "@ui-kitten/components"
import AddTaskPriorityScreen from "./add-task-priority"
import DateTimePicker from "@react-native-community/datetimepicker"
import { StackScreenProps } from "@react-navigation/stack"
import { TaskStackNavigatorParamList } from "../../navigators/tasks-navigator"
import { observer } from "mobx-react-lite"
import {
  taskActions,
  taskSelector,
  Task,
  Task2TaskModel,
  TaskModel2Task,
} from "../../store/task/taskSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { TaskModel } from "../../utils/models/task-model"

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />

const CalendarIcon = (props) => <Icon {...props} name="calendar" />

// interface EditTaskScreenProps implement

const AddTaskScreen: FC<StackScreenProps<TaskStackNavigatorParamList, "taskInfo">> = observer(
  ({ navigation, route }) => {
    console.log("rerender add-task")
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(taskSelector)

    const initialValues: TaskModel =
      route.params.type === "add"
        ? {
            name: "",
            description: "",
            priority: 0,
            projectName: "",
            startAt: new Date(),
            tag: [],
            createdAt: new Date(),
            endAt: new Date(),
            updatedAt: new Date(),
          }
        : Task2TaskModel(
            tasks.find((task) => {
              return task.id === route.params.taskId
            }),
          )

    const [task, setTask] = useState<TaskModel>(initialValues)
    const [mode, setMode] = useState<"date" | "time">("date")
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate: Date) => {
      // const currentDate = selectedDate || task.startAt
      setShow(Platform.OS === "ios")
      if (selectedDate) setTask({ ...task, startAt: selectedDate })
    }

    const showMode = (currentMode) => {
      setShow(true)
      setMode(currentMode)
    }

    const showDatepicker = () => {
      showMode("date")
    }

    const showTimepicker = () => {
      showMode("time")
    }

    const setPriority = useCallback(
      (priority: number) => {
        setTask({ ...task, priority: priority })
      },
      [task.priority],
    )

    const handleSubmit = async () => {
      if (route.params.type === "add") {
        dispatch(taskActions.addTask(TaskModel2Task(task)))
      } else {
        dispatch(taskActions.updateTask({ id: route.params.taskId, newTask: TaskModel2Task(task) }))
      }
      navigation.goBack()
    }

    return (
      <View style={styles.container}>
        <Input
          placeholder="Task name"
          onChangeText={(text) => {
            setTask({ ...task, name: text })
            console.log(task)
            console.log(text)
          }}
          // onBlur={handleBlur("name")}
          value={task.name}
          placeholderTextColor="#aaa"
        />
        <Input
          placeholder="Do you want add description?"
          onChangeText={(text) => {
            setTask({ ...task, description: text })
          }}
          // onBlur={handleBlur("description")}
          value={task.description}
        />

        <AddTaskPriorityScreen priority={task.priority} setPriority={setPriority} />

        <SelectItem
          accessoryLeft={CalendarIcon}
          accessoryRight={ForwardIcon}
          title={<Text>Date: {task.startAt?.toDateString()}</Text>}
          onPress={showDatepicker}
        />
        <SelectItem
          accessoryLeft={CalendarIcon}
          accessoryRight={ForwardIcon}
          title={
            <Text>
              Date:{" "}
              {task.startAt?.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
            </Text>
          }
          onPress={showTimepicker}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={task.startAt}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Button onPress={handleSubmit} title="Submit" />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    // marginTop: -10,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    minWidth: "100%",
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  inputLabel: {
    color: "rgba(0, 0, 0, 0.8)",
  },
})

export default AddTaskScreen
