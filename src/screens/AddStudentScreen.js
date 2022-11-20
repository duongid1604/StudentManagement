import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import CancelButton from '../components/CancelButton';
import CustomInput from '../components/CustomInput';
import {addSubject} from '../redux/studentsSlice';
import {fetchSubjects} from '../redux/subjectsSlice';

const AddStudentScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [pressedAvatar1, setPressedAvatar1] = useState();
  const [pressedAvatar2, setPressedAvatar2] = useState();
  const [pressedAvatar3, setPressedAvatar3] = useState();

  const [unregisterVisible, setUnregisterVisible] = useState(false);
  const [registeredVisible, setRegisteredVisible] = useState(false);

  const subjects = useSelector(state => state.subjects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handlePressedAvatar1 = () => {
    setPressedAvatar1({
      borderRadius: 220,
      borderWidth: 3,
      borderColor: '#2b83f0',
    });
    setPressedAvatar2();
    setPressedAvatar3();
  };

  const handlePressedAvatar2 = () => {
    setPressedAvatar2({
      borderRadius: 220,
      borderWidth: 3,
      borderColor: '#2b83f0',
    });
    setPressedAvatar1();
    setPressedAvatar3();
  };

  const handlePressedAvatar3 = () => {
    setPressedAvatar3({
      borderRadius: 220,
      borderWidth: 3,
      borderColor: '#2b83f0',
    });
    setPressedAvatar2();
    setPressedAvatar1();
  };

  const onSubmit = data => console.log(data);

  const UnregisterPressHandler = () => {};

  // Render Unregister Subject

  const renderSubjects = itemData => (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.press, styles.subjectContainer]
          : styles.subjectContainer
      }
      onPress={UnregisterPressHandler}>
      <Text style={styles.text}>{itemData.item.subjectName}</Text>
    </Pressable>
  );

  // Render Registered Subject

  const renderRegisteredSubjects = itemData => <View></View>;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={handlePressedAvatar1} style={pressedAvatar1}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png',
            }}
          />
        </Pressable>

        <Pressable onPress={handlePressedAvatar2} style={pressedAvatar2}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png',
            }}
          />
        </Pressable>

        <Pressable onPress={handlePressedAvatar3} style={pressedAvatar3}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Pic.png',
            }}
          />
        </Pressable>
      </View>

      <CustomInput
        name="name"
        placeholder="Enter student's name..."
        control={control}
        rules={{
          required: "Student's name is required !!!",
          maxLength: {value: 20, message: 'Name must be maximum 20 character'},
          pattern: {value: /[A-Za-z]/, message: 'Name must be a string'},
        }}
      />

      <CustomInput
        name="email"
        placeholder="Enter student's email..."
        control={control}
        rules={{
          required: "Student's email is required !!!",
          maxLength: {value: 20, message: 'Email must be maximum 20 character'},
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
              data={subjects.subjects}
              keyExtractor={item => item.id}
              renderItem={renderSubjects}
            />

            <CancelButton
              onPress={() => setUnregisterVisible(!unregisterVisible)}>
              Cancel
            </CancelButton>
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
              data={subjects.subjects}
              keyExtractor={item => item.id}
              renderItem={renderRegisteredSubjects}
            />

            <CancelButton
              onPress={() => setRegisteredVisible(!registeredVisible)}>
              Cancel
            </CancelButton>
          </View>
        </Modal>
      </View>

      <Pressable style={styles.list} onPress={() => setUnregisterVisible(true)}>
        <Text style={styles.listText}>Unregister subjects</Text>
      </Pressable>

      <Pressable style={styles.list} onPress={() => setRegisteredVisible(true)}>
        <Text style={styles.listText}>Registered subjects</Text>
      </Pressable>

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
  list: {
    height: 50,
    margin: 16,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 10,
  },
  listText: {
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
