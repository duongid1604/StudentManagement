import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import {clear, fetchStudents, loadMore} from '../redux/studentsSlice';

const {width, height} = Dimensions.get('window');

const ListStudentScreen = () => {
  const [loadingActive, setLoadingActive] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const students = useSelector(state => state.students);
  console.log('students', students);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchStudents(students.nextPage));
  }, [dispatch, students.nextPage]);

  const handlerLoadMore = () => {
    return dispatch(loadMore());
  };

  const onRefresh = () => {
    dispatch(fetchStudents(1));
    dispatch(clear());
    setRefreshing(false);
  };

  const renderBottom = () => {
    if (students.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      );
    }
    return <View style={styles.loadingView}></View>;
  };

  const GoToStudentDetails = () => {
    navigation.navigate('Student Details', {
      avatar: students.students.avatar,
      studentName: students.students.name,
      age: students.students.age,
      email: students.students.email,
    });
    console.log('Details', students.students[0].id);
  };

  const renderStudents = itemData => (
    <Pressable onPress={GoToStudentDetails}>
      <View style={styles.container}>
        <Image source={{uri: itemData.item.avatar}} style={styles.image} />
        <View>
          <Text style={styles.text}>Name: {itemData.item.studentName}</Text>
          <Text style={styles.text}>Age: {itemData.item.age}</Text>
          <Text style={styles.text}>Email: {itemData.item.email}</Text>
        </View>
      </View>
    </Pressable>
  );

  const GotoAddStudentScreen = () => {
    navigation.navigate('Add student');
  };

  return (
    <View style={{width: width, height: height}}>
      <AddButton onPress={GotoAddStudentScreen}>Add student</AddButton>
      <FlatList
        data={students.students}
        keyExtractor={item => item.id}
        renderItem={renderStudents}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          setLoadingActive(false);
        }}
        onEndReached={() => {
          if (!loadingActive) {
            handlerLoadMore();
            setLoadingActive(true);
          }
        }}
        ListFooterComponent={renderBottom()}
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListStudentScreen;

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
  loading: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingView: {
    width: '100%',
    height: 200,
  },
});
