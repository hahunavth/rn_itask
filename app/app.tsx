import { StyleSheet } from "react-native"
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import * as eva from "@eva-design/eva"
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import { useBackButtonHandler, AppNavigator, canExit, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { Provider } from "react-redux"
import store, { persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import { TodoScreen } from "./screens"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
// function App2() {
//   const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

//   useBackButtonHandler(canExit)
//   const {
//     initialNavigationState,
//     onNavigationStateChange,
//     isRestored: isNavigationStateRestored,
//   } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

//   // Kick off initial async loading actions, like loading fonts and RootStore
//   useEffect(() => {
//     ;(async () => {
//       await initFonts() // expo
//       setupRootStore().then(setRootStore)
//     })()
//   }, [])

//   // Before we show the app, we have to wait for our state to be ready.
//   // In the meantime, don't render anything. This will be the background
//   // color set in native by rootView's background color.
//   // In iOS: application:didFinishLaunchingWithOptions:
//   // In Android: https://stackoverflow.com/a/45838109/204044
//   // You can replace with your own loading component if you wish.
//   if (!rootStore || !isNavigationStateRestored) return null

//   // otherwise, we're ready to render the app
//   return (
//     <ToggleStorybook>
//       {/* <RootStoreProvider value={rootStore}> */}
//       <Provider store={store}>
//         <>
//           <SafeAreaProvider initialMetrics={initialWindowMetrics}>
//             <AppNavigator
//               initialState={initialNavigationState}
//               onStateChange={onNavigationStateChange}
//             />
//           </SafeAreaProvider>
//         </>
//       </Provider>
//       {/* </RootStoreProvider> */}
//     </ToggleStorybook>
//   )
// }

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useBackButtonHandler(canExit)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
    })()
  }, [])

  if (!rootStore || !isNavigationStateRestored) return null

  return (
    <>
      {/* <ToggleStorybook> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <AppNavigator
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
              </SafeAreaProvider>
            </ApplicationProvider>
          </>
        </PersistGate>
      </Provider>
      {/* </ToggleStorybook> */}
    </>
  )
}

export default App

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "center",
//   },
//   text: {
//     textAlign: "center",
//   },
//   likeButton: {
//     marginVertical: 16,
//   },
// })
