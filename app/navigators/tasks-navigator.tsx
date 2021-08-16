import React, { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigatorParamList } from "."
import { StackScreenProps } from "@react-navigation/stack"
import { TodoScreen } from "../screens"
import { observer } from "mobx-react-lite"
import AddTaskScreen from "../screens/todo/add-task-screen"

export type TaskStackNavigatorParamList = {
  home: undefined
  addtask: undefined
}

const TaskStack = createNativeStackNavigator<TaskStackNavigatorParamList>()

const TaskPages: FC<StackScreenProps<NavigatorParamList, "todo">> = observer(({ navigation }) => {
  return (
    <>
      <TaskStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <TaskStack.Screen name="home" component={TodoScreen} />
        <TaskStack.Screen
          name="addtask"
          component={AddTaskScreen}
          options={{
            headerShown: true,
            headerTitle: "Add task",
          }}
        />
      </TaskStack.Navigator>
    </>
  )
})

export default TaskPages
