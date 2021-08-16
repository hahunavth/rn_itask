import React, { Component } from "react"
import { View, Text, StyleSheet, TextInput, Button } from "react-native"
import { Formik } from "formik"
import { TextField } from "../../components"

// create a component
const AddTaskScreen = () => {
  return (
    <Formik initialValues={{ name: "" }} onSubmit={(values) => console.log(values)}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          {/* <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          /> */}
          <TextField
            placeholder="Task name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            inputStyle={styles.input}
            value={values.name}
            placeholderTextColor="#aaa"
          />
          <TextField
            placeholder="Do you want add description?"
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            inputStyle={styles.input}
            value={values.description}
            placeholderTextColor="#aaa"
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: -10,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    minWidth: "100%",
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  inputLabel: {
    color: "rgba(0, 0, 0, 0.8)",
  },
})

export default AddTaskScreen
