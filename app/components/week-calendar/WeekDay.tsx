import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { color } from "../../theme"

export interface WeekDayProps {
  listId?: number
  weekDay: string
  date: number
  selected?: boolean
  today?: boolean
  setSelected?: (id: number) => undefined
}

const WeekDay = ({
  listId,
  weekDay,
  date,
  selected = false,
  today = false,
  setSelected,
}: WeekDayProps) => {
  return (
    <TouchableOpacity onPress={() => setSelected(listId)}>
      <View
        style={[styles.container, selected ? styles.selected : null, today ? styles.today : null]}
      >
        <Text style={selected ? styles.selectText : styles.weekday}>{weekDay}</Text>
        <Text style={selected ? styles.selectText : styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0,
    display: "flex",
    height: 60,
    justifyContent: "center",
    width: 40,
  },
  date: {
    color: color.palette.black,
    fontWeight: "bold",
  },
  selectText: {
    // color: color.text,
    color: color.primaryDarker,
    fontWeight: "bold",
  },
  selected: {
    // backgroundColor: color.primaryDarker,
    borderRadius: 10,
  },
  today: {
    borderColor: color.palette.deepPurple,
    borderRadius: 10,
    borderWidth: 2,
  },
  weekday: {
    color: color.dim,
    fontWeight: "bold",
  },
})

export default WeekDay
