import {useRoute} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import AddButton from '../components/AddButton';
import CustomDetailsScreenInput from '../components/CustomDetailsScreenInput';
import {updateSubject} from '../redux/subjectsSlice';

const SubjectDetails = () => {
  const route = useRoute();
  const {subjectData} = route.params;

  const dispatch = useDispatch();

  const {control, handleSubmit} = useForm({defaultValues: subjectData});

  const onSave = data => {
    dispatch(
      updateSubject([
        subjectData.id,
        {
          subjectName: data.subjectName,
          teacher: data.teacher,
          classRoom: data.classRoom,
        },
      ]),
    );
    Alert.alert('Done !!!');
  };

  return (
    <ScrollView>
      <CustomDetailsScreenInput
        name="subjectName"
        control={control}
        rules={{
          required: "Student's name is required !!!",
          maxLength: {
            value: 20,
            message: 'Name must be maximum 20 character',
          },
          pattern: {value: /[A-Za-z]/, message: 'Name must be a string'},
        }}
      />
      <CustomDetailsScreenInput
        name="teacher"
        control={control}
        rules={{
          required: "Teacher's name is required !!!",
          maxLength: {
            value: 20,
            message: 'Name must be maximum 20 character',
          },
          pattern: {value: /[A-Za-z]/, message: 'Name must be a string'},
        }}
      />
      <CustomDetailsScreenInput
        name="classRoom"
        control={control}
        rules={{
          required: "Classroom's name is required !!!",
          maxLength: {
            value: 20,
            message: 'Name must be maximum 20 character',
          },
          pattern: {value: /[A-Za-z]/, message: 'Name must be a string'},
        }}
      />

      <AddButton onPress={handleSubmit(onSave)}>Save</AddButton>
    </ScrollView>
  );
};

export default SubjectDetails;
