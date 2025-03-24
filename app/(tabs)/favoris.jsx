import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Favoris() {
  const route = useRoute();
  const favorites = route.params?.favorites || [];

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Favorites Games</Text>
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
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50
  },
  item: {
    fontSize: 18,
    padding: 15,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
    marginTop: 30
  },
});
