import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { submitData } from '../util/api_manager'; // Import the submitData function

const AuthScreen = ({setIsAuth}) => {
  console.log(setIsAuth)
  const [isLoginViewVisible, setIsLoginViewVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Track whether passwords match
  const [submitClicked, setSubmitClicked] = useState(false); // Track whether submit button is clicked
  const [apiData, setApiData] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const toggleView = () => {
    setIsLoginViewVisible(!isLoginViewVisible);
  };

  const isSubmitEnabled = () => {
    if (isLoginViewVisible) {
      return username.trim().length >= 5 && username.trim().length <= 8 && password.trim().length >= 5 && password.trim().length <= 8;
    } else {
      return username.trim().length >= 5 && username.trim().length <= 8 && password.trim().length >= 5 && password.trim().length <= 8 && confirmPassword.trim() === password.trim() && passwordsMatch;
    }
  };

  const checkConstraints = () => {
    const validUsernameLength = username.trim().length >= 5 && username.trim().length <= 8;
    const validPasswordLength = password.trim().length >= 5 && password.trim().length <= 8;
    const passwordsMatch = confirmPassword.trim() === password.trim();
    
    setSubmitDisabled(!(validUsernameLength && validPasswordLength && (isLoginViewVisible || passwordsMatch)));
    
  }

  const submitRequest = async () => {
    setSubmitClicked(true); // Set submitClicked to true when submit button is clicked
    const requestData = {
      username,
      password,
      confirmPassword,
      setApiData,
    };

    const requestType = isLoginViewVisible ? 'login' : 'register';

    try {
      await submitData(requestData, requestType, setIsAuth);
      // Handle success if needed
    } catch (error) {
      // Handle error
      console.error('Error submitting request:', error);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // Check if passwords match when typing
    setPasswordsMatch(submitClicked ? text === confirmPassword : true);
    checkConstraints();
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    // Check if passwords match when typing
    setPasswordsMatch(submitClicked ? text === password : true);
    checkConstraints();
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(apiData)}</Text>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.submitButton,
            !isSubmitEnabled() && styles.disabledButton,
            isSubmitEnabled() && styles.focusedButton,
          ]}
          onPress={submitRequest} // Call submitRequest on button press
          disabled={!isSubmitEnabled()}
        >
          <Text style={[styles.buttonText, !isSubmitEnabled() && styles.grey]}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isLoginViewVisible && styles.focusedButton,
          ]}
          onPress={() => {
            toggleView();
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !isLoginViewVisible && styles.focusedButton,
          ]}
          onPress={() => {
            toggleView();
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {isLoginViewVisible ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            maxLength = {8}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            maxLength = {8}
            onChangeText={handlePasswordChange} // Use the handler for password change
          />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            maxLength = {8}
          />
          <TextInput
            style={[
              styles.input,
            ]}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={handlePasswordChange}
            maxLength = {8}
          />
          <TextInput
            style={[
              styles.input,

            ]}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            autoCapitalize="none"
            onChangeText={handleConfirmPasswordChange} // Use the handler for confirm password change
            maxLength = {8}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.googleButton,
          ]}
          onPress={() => {
            toggleView();
          }}
        >
          <Text style={styles.buttonText}>Continue with <Icon name="google" size={20} color="black" /></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerMessages}>
        {!isLoginViewVisible && !passwordsMatch && (
          <Text style={styles.registerMessagesText}>Passwords must match.</Text>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: 210,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    submitButtonContainer: {
        position: 'absolute',
        top: 470,
        width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    borderBottomColor: 'teal',
  },
  registerButton: {
    backgroundColor: '#F0F0F0',
  },
  focusedButton: {
    backgroundColor: 'lightblue',
    borderBottomColor: 'black',
  },
  formContainer: {
    position: 'absolute',
    top: 280,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    width: '80%',
    marginBottom: 20,
  },
  invalidInput: {
    borderBottomColor: 'red',
    borderRightColor: 'red',
  },
  googleButton: {
    position: 'absolute',
    left: 65,
    top: 290,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    height: 50,
  },
  submitButton: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    height: 38,
    borderBottomWidth: 2,
    top: -45,
    borderBottomColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
    borderColor: '#A0A0A0', // Set the border color for the disabled state
  },
  grey: {
    color: 'grey',
  },
  registerMessages: {
    position: 'absolute',
    top: 630,
    width: '50%', // Set the width to 100%
    textAlign: 'center',
    alignItems: 'center', // Center-aligns the child components horizontally
    justifyContent: 'center', // Center-aligns the child components vertically
  },
  
});

export default AuthScreen;
