import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './TodoItem';
import { useNavigation } from '@react-navigation/native';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  // Fetch data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedTasks) setTasks(JSON.parse(storedTasks));
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading data', error);
      }
    };
    loadData();
  }, []);

  // Save tasks to AsyncStorage
  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  // Save favorite to AsyncStorage
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites', error);
    }
  };

  function addGame() {
    const newTask = { id: Date.now(), text, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setText('');
  }


  function addToFavorites(task) {
    if (!favorites.some(fav => fav.id === task.id)) {
      const updatedFavorites = [...favorites, task];
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    }
  }

  function addGameFromList(game) {
    setTasks((prevTasks) => {
      if (!prevTasks.some(task => task.id === game.id)){
        const updatedTasks = [...prevTasks, { id: game.id, text: game.title, completed: false }];

        AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks)).catch((error) => {
          console.error("Error saving tasks", error);
        })
        return updatedTasks;
      }
      return prevTasks;
    })
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  }

  function toggleCompleted(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function goToListGames() {
    navigation.navigate('ListGame', { addGameFromList });
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
        placeholder="New game"
      />
      <Button title="Add a game" onPress={addGame} />
      <Button title="View favorites" onPress={() => navigation.navigate('favoris', { favorites })} />
      <Button title="See available games" onPress={goToListGames} />
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
