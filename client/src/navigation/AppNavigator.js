import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../components/AuthScreen';
import Home from '../components/Home';
import Journal from '../components/Journal';
import Therapy from '../components/Therapy';
import MeditationScreen from '../components/MeditationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MeditationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MeditationScreen" component={MeditationScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const isAuthenticated = token !== null;
        setIsAuth(isAuthenticated);
        setAuthChecked(true);
        console.log(token);
      } catch (error) {
        console.error('Error checking auth token:', error);
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {authChecked ? (
        isAuth ? (
          <Tab.Navigator>
            <Tab.Screen name="Exercise" component={Home} />
            <Tab.Screen name="Journal" component={Journal} />
            <Tab.Screen name="Therapy" component={Therapy} />
            <Tab.Screen
              name="MeditationScreen"
              component={MeditationStack}
              options={{ tabBarButton: () => null, tabBarVisible: false }}
            />
          </Tab.Navigator>
        ) : (
          <AuthScreen setIsAuth={setIsAuth} />
        )
      ) : null}
    </NavigationContainer>
  );
};

export default AppNavigator;
