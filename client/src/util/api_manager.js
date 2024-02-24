import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://192.168.0.124:3000/auth';

const submitData = async (data, type, setIsAuth) => {
  try {
    let apiEndpoint = '';
    let requestOptions = {};

    if (type === 'login') {
      apiEndpoint = `${apiUrl}/login`;
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      };
    } else if (type === 'register') {
      apiEndpoint = `${apiUrl}/register`;
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      };
    } else {
      throw new Error('Invalid API type');
    }

    // Simulate API call delay (remove this in a real implementation)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Replace the following line with actual API call using fetch or Axios
    const response = await fetch(apiEndpoint, requestOptions);

    const responseData = await response.json();
    console.log('API response:', responseData);

    // Check if the API response includes a token
    const token = responseData.token;

    // Save the token to AsyncStorage if it exists
    if (token) {
      await AsyncStorage.setItem('authToken', token);
      setIsAuth(true)
    }

    // Handle the API response as needed
  } catch (error) {
    console.error('Error submitting data:', error);
    // Handle error
  }
};

export { submitData };
