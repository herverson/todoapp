import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';

const EditTaskModal = ({ isVisible, onClose, onEditTask, taskId, tasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskId, tasks]);

  const editTask = () => {
    onEditTask(taskId, title, description);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View>
        <Text>Edit Task:</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button title="Save Changes" onPress={editTask} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default EditTaskModal;
