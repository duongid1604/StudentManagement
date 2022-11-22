import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

const CustomDetailsScreenInput = ({
  control,
  name,
  placeholder,
  rules = {},
  keyboardTypeInput,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[styles.container, {borderColor: error ? 'red' : 'black'}]}>
            <TextInput
              value={value?.toString()}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              placeholderTextColor="#888"
              keyboardType={keyboardTypeInput}
              editable
            />
          </View>

          {error && (
            <Text style={styles.error}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

export default CustomDetailsScreenInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginHorizontal: 16,
  },
});
