import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Alert from './Alert'; // Import your custom Alert component here

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
      <TouchableOpacity style={styles.card} onPress={() => onEdit(item.id)}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => showDeleteConfirmation(item.id)}>
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

      {/* Delete Confirmation Modal */}
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
});

export default TaskList;
