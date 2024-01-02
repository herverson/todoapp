import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onDelete, onEdit, onComplete }) => {
  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <TouchableOpacity onPress={() => onComplete(task.id)}>
        <Text>{task.completed ? 'Completed' : 'Mark as Completed'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onEdit(task.id)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
