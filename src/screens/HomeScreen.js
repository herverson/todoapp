import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import axios from 'axios';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/tasks');
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title, description) => {
    try {
      await axios.post('http://10.0.2.2:3000/tasks', { title, description });
      fetchTasks();
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

  const editTask = async (taskId, title, description) => {
    try {
      await axios.put(`http://10.0.2.2:3000/tasks/${taskId}`, { title, description });
      fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const openEditModal = (taskId) => {
    setEditTaskId(taskId);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditTaskId(null);
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
        <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
          <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <TouchableOpacity onPress={() => setFilter('all')}>
            <Text style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('completed')}>
            <Text style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('pending')}>
            <Text style={{ fontWeight: filter === 'pending' ? 'bold' : 'normal' }}>Pending</Text>
          </TouchableOpacity>
        </View>

        <TaskList tasks={filterTasks(tasks)} onDelete={deleteTask} onEdit={openEditModal} onComplete={completeTask} />

        <AddTaskModal isVisible={isAddModalVisible} onClose={() => setIsAddModalVisible(false)} onAddTask={addTask} />

        <EditTaskModal
          isVisible={isEditModalVisible}
          onClose={closeEditModal}
          onEditTask={editTask}
          taskId={editTaskId}
          tasks={tasks}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 16,
    elevation: 5,
  },
});

export default HomeScreen;
