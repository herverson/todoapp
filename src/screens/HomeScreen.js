// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import TaskList from '../components/TaskList';
import axios from 'axios';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/tasks');
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post('http://10.0.2.2:3000/tasks', { title, description });
      fetchTasks();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async () => {
    try {
      await axios.put(`http://10.0.2.2:3000/tasks/${editTaskId}`, { title, description });
      fetchTasks();
      setIsEditModalVisible(false);
      setEditTaskId(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const openEditModal = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditTaskId(null);
    setTitle('');
    setDescription('');
  };

   const completeTask = async (taskId) => {
    try {
      await axios.put(`http://10.0.2.2:3000/tasks/${taskId}/complete`);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const filterTasks = (taskList) => {
    if (filter === 'completed') {
      return taskList.filter((task) => task.completed);
    } else if (filter === 'pending') {
      return taskList.filter((task) => !task.completed);
    } else {
      return taskList;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <TouchableOpacity onPress={() => setFilter('all')}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('completed')}>
            <Text>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('pending')}>
            <Text>Pending</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={isEditModalVisible} animationType="slide">
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
            <Button title="Cancel" onPress={closeEditModal} />
          </View>
        </Modal>

        <TaskList tasks={filterTasks(tasks)} onDelete={deleteTask} onEdit={openEditModal} onComplete={completeTask} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
