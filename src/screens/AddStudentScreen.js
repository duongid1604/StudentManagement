import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import CustomInput from '../components/CustomInput';
import {avatar} from '../constants/avatars';
import {addStudents, addSubject} from '../redux/studentsSlice';
import {fetchSubjects} from '../redux/subjectsSlice';

const AddStudentScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const [isChosen, setIsChosen] = useState();

  const [unregisterVisible, setUnregisterVisible] = useState(false);
  const [registeredVisible, setRegisteredVisible] = useState(false);

  const subjects = useSelector(state => state.subjects);

  const [registeredSubject, setRegisteredSubject] = useState([]);
  const [unregisterSubject, setUnregisterSubject] = useState([]);

  useEffect(() => {
    setUnregisterSubject(subjects.subjects);
  }, [subjects]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(
      addStudents({
        avatar: data.avatar,
        studentName: data.studentName,
        email: data.email,
        age: data.age,
        subjects: registeredSubject,
      }),
    );
    Alert.alert('Done !!!');
    navigation.goBack();
  };

  // Render Unregister Subject

  const UnregisterPressHandler = id => {
    dispatch(addSubject({id: id}));

    setRegisteredSubject([
      ...registeredSubject,
      ...unregisterSubject.filter(item => item.id === id),
    ]);

    setUnregisterSubject(unregisterSubject.filter(item => item.id !== id));
  };

  const renderSubjects = itemData => (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.press, styles.subjectContainer]
          : styles.subjectContainer
      }
      onPress={() => UnregisterPressHandler(itemData.item.id)}>
      <Text style={styles.text}>{itemData.item.subjectName}</Text>
    </Pressable>
  );

  // Render Registered Subject

  const RegisteredPressHandler = id => {
    console.log(id, 'id in Register');
    setUnregisterSubject([
      ...unregisterSubject,
      ...registeredSubject.filter(item => item.id === id),
    ]);

    setRegisteredSubject(registeredSubject.filter(item => item.id !== id));
  };

  const renderRegisteredSubjects = itemData => (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.press, styles.subjectContainer]
          : styles.subjectContainer
      }
      onPress={() => {
        RegisteredPressHandler(itemData.item.id);
      }}>
      <Text style={styles.text}>{itemData.item.subjectName}</Text>
    </Pressable>
  );

  const avatarPressedHandler = (id, url, onChange) => {
    setIsChosen(id);
    onChange(url);
  };

  return (
    <View style={styles.container}>
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

      <ScrollView>
        <CustomInput
          name="studentName"
          placeholder="Enter student's name..."
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

        <CustomInput
          name="email"
          placeholder="Enter student's email..."
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

        <CustomInput
          name="age"
          placeholder="Enter student age..."
          control={control}
          keyboardTypeInput="number-pad"
          rules={{
            required: "Student's age is required !!!",
            min: {value: 0, message: 'Age must be from 0 to 99'},
            max: {value: 99, message: 'Age must be from 0 to 99'},
            pattern: {value: /[0-9]/, message: 'Age must be a number'},
          }}
        />

        {/* Modal Unregister */}

        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={unregisterVisible}
            onRequestClose={() => {
              setUnregisterVisible(!unregisterVisible);
            }}>
            <View style={styles.modal}>
              <FlatList
                data={unregisterSubject}
                keyExtractor={item => item.id}
                renderItem={renderSubjects}
              />
            </View>
          </Modal>
        </View>

        {/* Modal Registered */}

        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={registeredVisible}
            onRequestClose={() => {
              setRegisteredVisible(!registeredVisible);
            }}>
            <View style={styles.modal}>
              <FlatList
                data={registeredSubject}
                keyExtractor={item => item.id}
                renderItem={item => renderRegisteredSubjects(item)}
              />
            </View>
          </Modal>
        </View>

        <View style={styles.listContainer}>
          <Pressable
            style={styles.list}
            onPress={() => setUnregisterVisible(true)}>
            <Text style={styles.listText}>Unregister subjects</Text>
          </Pressable>

          <Pressable
            style={styles.list}
            onPress={() => setRegisteredVisible(true)}>
            <Text style={styles.listText}>Registered subjects</Text>
          </Pressable>
        </View>
      </ScrollView>
      <AddButton onPress={handleSubmit(onSubmit)}>Add</AddButton>
    </View>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    height: 50,
    margin: 16,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#253ebb',
  },
  listText: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  submitBtn: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#253ebb',
  },
  subjectContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    margin: 6,
  },
  press: {
    opacity: 0.5,
  },
});
