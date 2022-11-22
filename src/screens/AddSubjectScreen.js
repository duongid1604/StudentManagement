import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AddButton from '../components/AddButton';
import CustomInput from '../components/CustomInput';
import {addSubject, fetchSubjects} from '../redux/subjectsSlice';

const AddSubjectScreen = () => {
  const {control, handleSubmit} = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(
      addSubject({
        subjectName: data.subjectName,
        teacher: data.teacher,
        classRoom: data.classRoom,
      }),
    );
    Alert.alert('Done !!!');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CustomInput
          name="subjectName"
          placeholder="Enter subject's name..."
          control={control}
          rules={{
            required: "Subject's name is required !!!",
            maxLength: {
              value: 20,
              message: "Subject's name must be maximum 20 character",
            },
            pattern: {
              value: /[A-Za-z]/,
              message: "Subject's name must be a string",
            },
          }}
        />
        <CustomInput
          name="teacher"
          placeholder="Enter subject's teacher..."
          control={control}
          rules={{
            required: "Subject's name is required !!!",
            maxLength: {
              value: 20,
              message: "Subject's name must be maximum 20 character",
            },
            pattern: {
              value: /[A-Za-z]/,
              message: "Subject's name must be a string",
            },
          }}
        />
        <CustomInput
          name="classRoom"
          placeholder="Enter subject's classroom..."
          control={control}
          rules={{
            required: "Subject's name is required !!!",
            maxLength: {
              value: 20,
              message: "Subject's name must be maximum 20 character",
            },
            pattern: {
              value: /[A-Za-z]/,
              message: "Subject's name must be a string",
            },
          }}
        />

        <AddButton onPress={handleSubmit(onSubmit)}>Add</AddButton>
      </ScrollView>
    </View>
  );
};

export default AddSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
