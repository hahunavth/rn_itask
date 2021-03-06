/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { WelcomeScreen, DemoScreen, DemoListScreen, TodoScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import TaskPages from "./tasks-navigator"
import TodoNavigator from "./todo-navigator"
import { Icon } from "@ui-kitten/components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  demo?: undefined
  demoList?: undefined
  todo?: undefined
  task?: undefined
}

export type BottomBarNavigatorParamList = {
  home?: undefined
  todo?: undefined
  task?: undefined
  info?: undefined
  welcome: undefined
  demo?: undefined
  demoList?: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const Tab = createBottomTabNavigator<BottomBarNavigatorParamList>()

const AppTab = () => {
  return (
    <>
      {/* <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
      <Stack.Screen name="todo" component={TodoScreen} />
    </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="task"
          component={TaskPages}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: function getTabarIcon({ focused, color, size }) {
              return (
                <MaterialCommunityIcons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
        <Tab.Screen
          name="todo"
          component={TodoNavigator}
          options={{
            tabBarLabel: "Todo",
            tabBarIcon: function getTabarIcon({ focused, color, size }) {
              return (
                <MaterialCommunityIcons
                  name={focused ? "ballot" : "ballot-outline"}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
        <Tab.Screen
          name="demo"
          component={DemoScreen}
          options={{
            tabBarLabel: "Project",
            tabBarIcon: function getTabarIcon({ focused, color, size }) {
              return (
                <MaterialCommunityIcons
                  // name="collage"
                  name={focused ? "card-bulleted-settings" : "card-bulleted-settings-outline"}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />

        <Tab.Screen
          name="demoList"
          component={DemoListScreen}
          options={{
            tabBarLabel: "Project",
            tabBarIcon: function getTabarIcon({ focused, color, size }) {
              return (
                <MaterialCommunityIcons
                  name={focused ? "cog" : "cog-outline"}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
      </Tab.Navigator>
    </>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppTab />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
