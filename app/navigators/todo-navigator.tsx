import React, { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigatorParamList } from "."
import { StackScreenProps } from "@react-navigation/stack"
import { TodoScreen } from "../screens"
import { observer } from "mobx-react-lite"

export type TodoStackNavigatorParamList = {
  todoList: undefined
  updateTodo: undefined
}

const TodoStack = createNativeStackNavigator<TodoStackNavigatorParamList>()

const TodoNavigator: FC<StackScreenProps<NavigatorParamList, "todo">> = observer(
  ({ navigation }) => {
    return (
      <>
        <TodoStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <TodoStack.Screen name="todoList" component={TodoScreen} />
        </TodoStack.Navigator>
      </>
    )
  },
)

export default TodoNavigator
