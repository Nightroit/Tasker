import React, {useState} from 'react' 
import { View, Text, StyleSheet, TextInput } from 'react-native'

const Home = () => {

  const [text, setInputText] = useState()

  return (
    <View style = {styles.container}>
      <View>
        <View style = {styles.todoContainer}>
          <TextInput 
            placeholder = "Enter task"
            onChangeText={(inputText) => setInputText(inputText)}
            value = {text}
            style = {styles.inputField}
            >

          </TextInput>
          <Text>Hi</Text>
        </View>
      </View>
    </View>
  )
}

const styles = {
  container: {
    borderWidth: 2,          // Border width
    borderColor: 'black',    // Border color
    borderRadius: 10,        // Border radius (for rounded corners)
    padding: 10,             // Padding inside the container
    height: '100%'
  },
  inputField: {
    marginTop: 20,
    borderWidth: 2,          // Border width
    borderColor: 'black',    // Border color
    borderRadius: 10,        // Border radius (for rounded corners)
    padding: 10,             // Padding inside the container
  }, 
  todoContainer: {
    
  }
};
export default Home;