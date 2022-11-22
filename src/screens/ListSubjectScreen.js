import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import {fetchSubjects} from '../redux/subjectsSlice';

const ListSubjectStudent = () => {
  const [refreshing, setRefreshing] = useState(false);

  const subjects = useSelector(state => state.subjects);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchSubjects());
    setRefreshing(false);
  };

  const renderBottom = () => {
    if (subjects.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      );
    }
    return <View style={styles.loadingView}></View>;
  };

  const GotoSubjectDetails = subjectData => {
    navigation.navigate('Subject Details', {
      subjectData,
    });
  };

  const renderSubjects = itemData => (
    <Pressable onPress={() => GotoSubjectDetails(itemData.item)}>
      <View style={styles.subjectContainer}>
        <Text style={styles.text}>Name: {itemData.item.subjectName}</Text>
        <Text style={styles.text}>Teacher: {itemData.item.teacher}</Text>
        <Text style={styles.text}>Classroom: {itemData.item.classRoom}</Text>
      </View>
    </Pressable>
  );

  const GotoAddSubjectScreen = () => {
    navigation.navigate('Add subject');
  };

  return (
    <View style={styles.container}>
      <AddButton onPress={GotoAddSubjectScreen}>Add subject</AddButton>
      <FlatList
        data={subjects.subjects}
        keyExtractor={item => item.id}
        renderItem={item => renderSubjects(item)}
        ListFooterComponent={renderBottom()}
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListSubjectStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjectContainer: {
    marginBottom: 20,
    marginHorizontal: 16,
    backgroundColor: '#ccc',
    borderRadius: 16,
    padding: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3c3a48',
    marginHorizontal: 12,
    marginVertical: 6,
  },
});
