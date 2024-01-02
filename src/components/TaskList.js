// components/TaskList.js
import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem task={item} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />
      )}
    />
  );
};

export default TaskList;
