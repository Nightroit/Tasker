import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {

  const [text, setInputText] = useState()
  const [list, setList] = useState(['hi'])

  const onPress = () => {
    setList([text, ...list])
    setInputText("")
  }

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

          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon name="plus" size={20} color="black" style = {styles.iconStyle} />
          </TouchableOpacity>

        </View>
        <View>
          {list.map((str, idx) => (
            <View style = {styles.listButton}>  
              <Text key = {idx}>{str}</Text>
              <Icon style = {styles.deleteIcon} name="delete-outline" size={25} color="red" />
            </View>            
          ))}
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
    width: '90%',
    marginTop: 20,
    borderWidth: 2,          // Border width
    borderColor: 'black',    // Border color
    borderRadius: 10,        // Border radius (for rounded corners)
    padding: 10,             // Padding inside the container
  }, 
  todoContainer: {
    flexDirection: 'row', // Set flexDirection to 'row' to have items in the same line
  }, 
  button: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 20,
    borderWidth: 2,          // Border width
    borderColor: 'black',    // Border color
    borderRadius: 10,
    marginLeft: 5,
    width: '10%'
  },
  deleteIcon: {
    
    color: 'black', 
    height: '2px',
    width: '2px'
  },

  
};

export default Home;