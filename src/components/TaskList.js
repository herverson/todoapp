import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Alert from './Alert';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const showDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    onDelete(taskToDelete);
    setDeleteConfirmationVisible(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
    setTaskToDelete(null);
  };

  const renderItem = ({ item }) => (

    <View style={styles.cardContainer}>
      {!item.completed && (
        <TouchableOpacity
          style={styles.readButton}
          onPress={() => onComplete(item.id)}
        >
          <Icon name="check" size={24} color="white" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.card} onPress={() => onEdit(item.id)}>
        <Text>{item.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => showDeleteConfirmation(item.id)}
      >
        <Text style={{ color: 'white' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Alert visible={deleteConfirmationVisible} onCancel={cancelDelete} onConfirm={confirmDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  readButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default TaskList;
