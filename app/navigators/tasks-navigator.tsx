import React, { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigatorParamList } from "."
import { StackScreenProps } from "@react-navigation/stack"
import { TaskScreen } from "../screens"
import { observer } from "mobx-react-lite"
import AddTaskScreen from "../screens/task/add-task-screen"
// import { Icon } from "@ui-kitten/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import Ionicons from "react-native-vector-icons/Ionicons"

export type TaskStackNavigatorParamList = {
  home: undefined
  editTask: {
    type: "add" | "edit"
    taskId?: string
  }
  task?: undefined
  taskInfo: {
    type: "add" | "edit"
    taskId?: string
  }
}

// const CalendarIcon = (props) => <Icon {...props} name="calendar" />

const TaskStack = createNativeStackNavigator<TaskStackNavigatorParamList>()

const TaskPages: FC<StackScreenProps<NavigatorParamList, "task">> = observer(({ navigation }) => {
  return (
    <>
      <TaskStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          headerBackTitle: "titlelelel",
        }}
      >
        <TaskStack.Screen name="home" component={TaskScreen} />
        <TaskStack.Screen
          name="taskInfo"
          component={AddTaskScreen}
          initialParams={{ type: "add" }}
          options={{
            headerShown: true,
            headerTitle: "Add task",
            headerLeft: function getRight() {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
                  style={{ width: 30, height: 30 }}
                >
                  <Ionicons name={"ios-chevron-back-outline"} size={30} color={"#888"} />
                </TouchableOpacity>
              )
            },
          }}
        />
      </TaskStack.Navigator>
    </>
  )
})

export default TaskPages
