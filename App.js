import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import ListStudentScreen from './src/screens/ListStudentScreen';
import ListSubjectScreen from './src/screens/ListSubjectScreen';
import store from './src/redux/store';
import AddStudentScreen from './src/screens/AddStudentScreen';
import StudentDetails from './src/screens/StudentDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
        <Stack.Navigator>
          <Stack.Screen name="Home Screen" component={HomeScreen} />
          <Stack.Screen name="List student" component={ListStudentScreen} />
          <Stack.Screen name="List subject" component={ListSubjectScreen} />
          <Stack.Screen name="Add student" component={AddStudentScreen} />
          <Stack.Screen name="Student Details" component={StudentDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
