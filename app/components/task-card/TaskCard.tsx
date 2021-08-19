import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "@ui-kitten/components"
import { TaskModel } from "../../utils/models/task-model"

const Header = ({ name }: { name: string }) => (
  <View>
    <Text category="h6" style={styles.title}>
      {name}
    </Text>
  </View>
)

const Footer = ({ startAt }: { startAt: Date }) => {
  return (
    <View style={styles.footerContainer}>
      {/* <Button style={styles.footerControl} size="small" status="basic">
      CANCEL
    </Button>
    <Button style={styles.footerControl} size="small">
      ACCEPT
    </Button> */}
      <Text appearance="hint">{startAt.toLocaleDateString()}</Text>
    </View>
  )
}

export interface TaskCardProps {
  task: TaskModel
  onPress?: (id) => void
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <>
      {/* <Layout style={styles.topContainer} level="1">
        <Card style={styles.card} header={Header}>
          <Text>With Header</Text>
        </Card>

        <Card style={styles.card} footer={Footer}>
          <Text>With Footer</Text>
        </Card>
      </Layout> */}
      <Card
        style={styles.card}
        header={<Header name={task.name} />}
        footer={<Footer startAt={task.startAt} />}
        onPress={() => {
          onPress(task.id)
        }}
      >
        <Text>{task.description}</Text>
        <Text>Priority: {task.priority}</Text>

        <Text>
          Tag:{" "}
          <Text>
            {task.tag.map((text) => (
              <Text key={text}>{text}</Text>
            ))}
          </Text>
        </Text>
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    // margin: 2,
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 25,
    justifyContent: "flex-end",
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 10,
    minHeight: 20,
  },
  // footerControl: {
  //   marginHorizontal: 2,
  // },
  // topContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
})
