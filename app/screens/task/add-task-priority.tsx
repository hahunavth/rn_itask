import React, { useRef, useCallback } from "react"
import { SelectItem, Icon } from "@ui-kitten/components"
import RBSheet from "react-native-raw-bottom-sheet"

const StarIcon = (props) => <Icon {...props} name="star" />

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />

export interface AddTaskPriorityScreenProps {
  priority: number
  setPriority: (p: number) => void
}

const AddTaskPriorityScreen = React.memo(function Priority({
  priority,
  setPriority,
}: AddTaskPriorityScreenProps) {
  console.log("rerender add-task-priority")
  const refRBSheet = useRef<RBSheet>()

  const setPriorityAndClose = useCallback(
    (id: number) => {
      setPriority(id)
      refRBSheet.current.close()
    },
    [priority],
  )

  return (
    <>
      <SelectItem
        title={"Set priority: " + priority}
        onPress={() => {
          refRBSheet.current.open()
        }}
        accessoryLeft={StarIcon}
        accessoryRight={ForwardIcon}
      />

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
        <SelectItem
          title="Ugent"
          onPress={() => {
            setPriorityAndClose(4)
          }}
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
          selected={priority === 4}
        />
        <SelectItem
          title="High"
          onPress={() => {
            setPriority(3)
            refRBSheet.current.close()
          }}
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
          selected={priority === 3}
        />
        <SelectItem
          title="Medium"
          onPress={() => {
            setPriority(2)
            refRBSheet.current.close()
          }}
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
          selected={priority === 2}
        />
        <SelectItem
          title="Low"
          onPress={() => {
            setPriority(1)
            refRBSheet.current.close()
          }}
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
          selected={priority === 1}
        />
        <SelectItem
          title="No priority"
          onPress={() => {
            setPriority(0)
            refRBSheet.current.close()
          }}
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
          selected={priority === 0}
        />
      </RBSheet>
    </>
  )
})
// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     backgroundColor: "#fff",
//     flex: 1,
//     justifyContent: "flex-start",
//     // marginTop: -10,
//   },
//   input: {
//     backgroundColor: "rgba(0, 0, 0, 0)",
//     minWidth: "100%",
//     paddingHorizontal: 15,
//     fontWeight: "bold",
//   },
//   inputLabel: {
//     color: "rgba(0, 0, 0, 0.8)",
//   },
// })

export default AddTaskPriorityScreen
