import React, { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import WeekDay from "./WeekDay"
import { TodoContext, TodoContextType } from "../../screens"

export interface WeekCalendarProps {
  dateList: number[]
  todayId: number
  selectedId: number
}

const WeekCalendar = () => {
  const { date, setDate, selected, setSelected, today, setToday } = useContext<TodoContextType>(
    TodoContext,
  )

  return (
    <View style={styles.container}>
      <WeekDay
        listId={0}
        date={date[0].getDate()}
        weekDay="Mon"
        today={today === 0}
        selected={selected === 0}
        setSelected={setSelected}
      />
      <WeekDay
        listId={1}
        date={date[1].getDate()}
        weekDay="Tue"
        today={today === 1}
        selected={selected === 1}
        setSelected={setSelected}
      />
      <WeekDay
        listId={2}
        date={date[2].getDate()}
        weekDay="Wed"
        today={today === 2}
        selected={selected === 2}
        setSelected={setSelected}
      />
      <WeekDay
        listId={3}
        date={date[3].getDate()}
        weekDay="Thu"
        today={today === 3}
        selected={selected === 3}
        setSelected={setSelected}
      />
      <WeekDay
        listId={4}
        date={date[4].getDate()}
        weekDay="Fri"
        today={today === 4}
        selected={selected === 4}
        setSelected={setSelected}
      />
      <WeekDay
        listId={5}
        date={date[5].getDate()}
        weekDay="Sat"
        today={today === 5}
        selected={selected === 5}
        setSelected={setSelected}
      />
      <WeekDay
        listId={6}
        date={date[6].getDate()}
        weekDay="Sun"
        today={today === 6}
        selected={selected === 6}
        setSelected={setSelected}
      />
    </View>
  )
}

export default WeekCalendar

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
})
