import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const meditationTypes = [
    'Mindful Breathing',
    'Guided Meditation',
    'Body Scan Meditation',
    'Loving-Kindness Meditation (Metta)',
    'Transcendental Meditation (TM)',
    'Zen Meditation (Zazen)',
  ];

    const handleMeditationPress = (type) => {
      console.log(type)
      navigation.navigate('MeditationScreen', {meditationType: type});

    };
    

  return (
    <View style={styles.container}>
      {meditationTypes.map((type, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={()=> handleMeditationPress(type)}
        >
          <Text>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    width: '45%',
    height: '30%',
    margin: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Home;
