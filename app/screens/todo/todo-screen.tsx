import React, { FC, createContext, useState } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
  BulletItem,
  Checkbox,
  TextField,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import WeekCalendar from "../../components/week-calendar/WeekCalendar"

const bowserLogo = require("../welcome/bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  // paddingVertical: spacing[4],
  // paddingHorizontal: spacing[4],
  width: 180,
  marginTop: 30,
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const DATE_TEXT: TextStyle = {
  ...TEXT,
  color: "rgba(100, 100, 100, 0.8)",
  fontSize: 18,
  marginTop: 10,
}

const DAY_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: "black",
  fontSize: 24,
  marginVertical: 4,
}

const ROW_VIEW: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
  flexGrow: 1,
  flexShrink: 1,
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

export const TodoScreen: FC<StackScreenProps<NavigatorParamList, "todo">> = observer(
  ({ navigation }) => {
    const curr = new Date()
    const day = (curr.getDay() + 6) % 7
    const first = curr.getDate() - ((curr.getDay() + 6) % 7)
    // const firstday = new Date(curr.setDate(first))
    const dateList: Date[] = []
    for (let i = 0; i < 7; i++) {
      dateList.push(new Date(curr.setDate(first + i)))
    }

    const [date, setDate] = useState(dateList)
    const [today, setToday] = useState(day)
    const [selected, setSelected] = useState(day)

    const nextScreen = () => navigation.navigate("demo")

    return (
      <TodoContext.Provider value={{ date, setDate, today, setToday, selected, setSelected }}>
        <View testID="TodoScreen" style={FULL}>
          {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
          <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
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
                  onPress={nextScreen}
                />
              </View>
            </View>
            <WeekCalendar />
          </Screen>
        </View>
      </TodoContext.Provider>
    )
  },
)
