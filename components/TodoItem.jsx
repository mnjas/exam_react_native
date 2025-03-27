import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';

export default function TodoItem({ task, deleteTask, toggleCompleted, addToFavorites }) {
  return (
    <View style={styles.container}>

      <Checkbox style={styles.checkbox}
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
      />
      <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </Text>
      <View style={styles.item}>
        <Button title="Done" onPress={() => toggleCompleted(task.id)} color="green"/>
        <Button title="Favorite" onPress={() => addToFavorites(task)} />
        <Button title="Delete" onPress={() => deleteTask(task.id)} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 20,
    padding: 30,
    borderWidth: 10,
    borderColor: "thistle",
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    height: 30,
    width: 30
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: 300,
  },
  text: {
    fontSize: 16,
  },
  completed: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});