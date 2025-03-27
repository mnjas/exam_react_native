import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './TodoItem';
import { useNavigation } from '@react-navigation/native';
import SwipeableTask from './SwipeableTask';

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

  // Save favorites to AsyncStorage
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

      Alert.alert('Game add to favorites');
    }else{
        Alert.alert('Game already in favorites')
      }
  }

  function addGameFromList(game) {
    setTasks((prevTasks) => {
      if (!prevTasks.some(task => task.id === game.id)){
        const updatedTasks = [...prevTasks, { id: game.id, text: game.title, completed: false }];
        AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks)).catch((error) => {
          console.error("Error saving tasks", error);
        });
        return updatedTasks;
      }
      return prevTasks;
    });
  }

  function deleteTask(id) {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this game?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);

            const updatedFavorites = favorites.filter(fav => fav.id !== id);
            setFavorites(updatedFavorites);
            saveFavorites(updatedFavorites);
          },
        },
      ],
      { cancelable: true }
    );
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
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {tasks.map(task => (
        <SwipeableTask
          key={task.id}
          task={task}
          deleteTask={deleteTask}
        >
          <TodoItem
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            addToFavorites={addToFavorites}
          />
        </SwipeableTask>
      ))}

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="New game"
      />

      <Button title="Add a game" onPress={addGame} color="#FFF"/>
      <Button title="View favorites" onPress={() => navigation.navigate('favoris', { favorites })} color="#FFF"/>
      <Button title="See available games" onPress={goToListGames} color="#FFF"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
  },
  input: {
    height: 60,
    width: '80%',
    marginBottom: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    color: "#000",
  },
  button: {
    width: '80%',
    marginBottom: 10,
  },
});
