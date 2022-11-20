import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const StudentDetails = () => {
  const route = useRoute();
  const {avatar, studentName, age, email} = route.params;
  return (
    <View style={styles.container}>
      <Image source={{uri: avatar}} style={styles.image} />
      <View>
        <Text style={styles.text}>Name: {studentName}</Text>
        <Text style={styles.text}>Age: {age}</Text>
        <Text style={styles.text}>Email: {email}</Text>
      </View>
    </View>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 16,
    overflow: 'hidden',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#3c3a48',
    marginHorizontal: 12,
  },
  image: {
    width: 105,
    height: 105,
  },
});
