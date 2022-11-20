import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CancelButton = ({children, onPress}) => {
  return (
    <View style={styles.btnContainer}>
      <Pressable
        style={({pressed}) =>
          pressed ? [styles.press, styles.submitBtn] : styles.submitBtn
        }
        onPress={onPress}>
        <Text style={styles.submitBtnText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default CancelButton;

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#db1e1e',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 20,
  },
  press: {
    opacity: 0.5,
  },
});
