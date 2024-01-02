import React from 'react';
import { View, Text } from 'react-native';

const TaskDetailScreen = ({ route }) => {
  const { title, description, completed } = route.params.task;

  return (
    <View>
      <Text>Title: {title}</Text>
      <Text>Description: {description}</Text>
      <Text>Status: {completed ? 'Completed' : 'Pending'}</Text>
    </View>
  );
};

export default TaskDetailScreen;
