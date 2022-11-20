import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import HomeScreenBtn from '../components/HomeScreenBtn';

const HomeScreen = () => {
  const navigation = useNavigation();
  const goToListStudentScreen = () => {
    navigation.navigate('List student');
  };
  const goToListSubjectScreen = () => {
    navigation.navigate('List subject');
  };
  return (
    <View style={styles.container}>
      <HomeScreenBtn onPress={goToListStudentScreen}>
        List student
      </HomeScreenBtn>
      <HomeScreenBtn onPress={goToListSubjectScreen}>
        List subject
      </HomeScreenBtn>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
