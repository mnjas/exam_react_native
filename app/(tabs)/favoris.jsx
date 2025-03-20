import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Favoris() {
  const { favorites } = { favorites: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeux Favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50
  },
  item: {
    fontSize: 18,
    padding: 5,
  },
});
