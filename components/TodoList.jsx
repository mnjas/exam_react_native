import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import { useNavigation } from '@react-navigation/native';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  // Function to Add Game
  function addGame() {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  }

  // Function to Add Game to Favorites
  function addToFavorites(task) {
    // TODO
    setTasks()
  }

  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    setFavorites(favorites.filter(fav => fav.id !== id));
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  // Navigate to Favorites Page
  function goToFavorites() {
    navigation.navigate('favoris', { favorites });
  }

  return (
    <View style={styles.container}>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          addToFavorites={addToFavorites}
        />
      ))}
      
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Nouveau jeu"
      />
      <Button title="Ajouter un jeu" onPress={addGame} />
      <Button title="Voir les favoris" onPress={goToFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
