import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const HomeScreenBtn = ({children, onPress}) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed ? [styles.press, styles.button] : styles.button
      }
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default HomeScreenBtn;

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b59be',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  press: {
    opacity: 0.5,
  },
});
