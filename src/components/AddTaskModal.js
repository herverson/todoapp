import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';

const AddTaskModal = ({ isVisible, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    onAddTask(title, description);
    setDescription('');
    setTitle('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View>
        <Text>Add a new task:</Text>
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
        <Button title="Add Task" onPress={addTask} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddTaskModal;
