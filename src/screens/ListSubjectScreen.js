import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RegisteredList from '../components/RegisteredList';
import UnregisteredList from '../components/UnregisteredList';

const ListSubjectScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Registered</Text>
        <View style={styles.item}>
          <RegisteredList />
        </View>
      </View>

      <View>
        <Text style={styles.heading}>Unregistered</Text>
        <View style={styles.item}>
          <UnregisteredList />
        </View>
      </View>
    </View>
  );
};

export default ListSubjectScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  item: {
    width: 150,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
});
