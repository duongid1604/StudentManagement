import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AddButton from '../components/AddButton';
import CustomDetailsScreenInput from '../components/CustomDetailsScreenInput';
import {avatar} from '../constants/avatars';
import {updateStudent} from '../redux/studentsSlice';

const StudentDetails = () => {
  const dispatch = useDispatch();

  const [isChosen, setIsChosen] = useState();

  const route = useRoute();
  const {studentsData} = route.params;

  const {control, handleSubmit} = useForm({defaultValues: studentsData});

  const onSave = data => {
    dispatch(
      updateStudent([
        studentsData.id,
        {
          avatar: data.avatar,
          studentName: data.studentName,
          email: data.email,
          age: data.age,
        },
      ]),
    );
    Alert.alert('Done !!!');
  };

  const avatarPressedHandler = (id, url, onChange) => {
    setIsChosen(id);
    onChange(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {avatar.map(data => (
          <Controller
            key={data.id}
            control={control}
            name="avatar"
            render={({field: {onChange}}) => (
              <>
                <Pressable
                  onPress={() =>
                    avatarPressedHandler(data.id, data.url, onChange)
                  }>
                  <Image
                    source={{uri: data.url}}
                    style={
                      data.id === isChosen
                        ? [styles.image, styles.imagePressed]
                        : styles.image
                    }
                  />
                </Pressable>
              </>
            )}
          />
        ))}
      </View>

      <CustomDetailsScreenInput
        name="studentName"
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
        name="email"
        control={control}
        rules={{
          required: "Student's email is required !!!",
          maxLength: {
            value: 20,
            message: 'Email must be maximum 20 character',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@gmail+\.com/i,
            message: `Invalid email address !!! ${'\n'}Email must have @gmail.com `,
          },
        }}
      />

      <CustomDetailsScreenInput
        name="age"
        control={control}
        keyboardTypeInput="number-pad"
        rules={{
          required: "Student's age is required !!!",
          min: {value: 0, message: 'Age must be from 0 to 99'},
          max: {value: 99, message: 'Age must be from 0 to 99'},
          pattern: {value: /[0-9]/, message: 'Age must be a number'},
        }}
      />

      <View style={styles.avatarContainer}>
        <Image source={{uri: studentsData.avatar}} style={styles.avatar} />
      </View>

      <AddButton onPress={handleSubmit(onSave)}>Save</AddButton>
    </ScrollView>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  container: {},
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  image: {
    width: 110,
    height: 110,
  },
  imagePressed: {
    borderRadius: 220,
    borderWidth: 3,
    borderColor: '#2b83f0',
  },
});
