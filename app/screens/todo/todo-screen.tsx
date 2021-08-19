import React, { Component, FC, useState, useRef } from "react"
import { StyleSheet } from "react-native"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { NavigatorParamList } from "../../navigators/app-navigator"
import { observer } from "mobx-react-lite"
import { Datepicker, Input, Layout, Text, Icon, Button } from "@ui-kitten/components"
import { OverflowMenuStyledBackdropShowcase } from "../../components/overflow-menu-backdrop/OverflowMenuBackdrop"
import RBSheet from "react-native-raw-bottom-sheet"
import BlurLayout from "../../components/blur-layout/BlurLayout"

const CalendarIcon = (props) => <Icon {...props} name="calendar" />
// create a component
export const TodoScreen: FC<BottomTabScreenProps<NavigatorParamList, "todo">> = observer(
  ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [text, setText] = useState("")

    const refRBSheet = useRef()

    return (
      <Layout style={styles.container} level="1">
        <Button onPress={() => refRBSheet.current.open()}>Add Todo</Button>

        <BlurLayout />

        <RBSheet
          ref={refRBSheet}
          closeDuration={200}
          openDuration={200}
          animationType={"slide"}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              // backgroundColor: "transparent",
              backgroundColor: "rgba(0, 0, 0, 0.01)",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.6,
              shadowRadius: 20,

              elevation: 23,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
          }}
        >
          <Input placeholder="Add new todo" value={text} onChangeText={setText} />
          <Layout style={styles.rowLayout}>
            <Datepicker date={date} onSelect={setDate} accessoryRight={CalendarIcon} />
            <OverflowMenuStyledBackdropShowcase />
            <Button>Submit</Button>
          </Layout>
        </RBSheet>
      </Layout>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  rowLayout: {
    display: "flex",
    flexDirection: "row",
  },
})
