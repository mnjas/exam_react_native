import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  game_url: string;
};

type RootStackParamList = {
  ListGames: { addGameFromList: (game: Game) => void };
};

type ListGamesRouteProp = RouteProp<RootStackParamList, 'ListGames'>;

const ListGames: React.FC = () => {
  const [data, setData] = useState<Game[]>([]);

  const route = useRoute<ListGamesRouteProp>();
  const addGameFromList = route.params?.addGameFromList;

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetch('https://www.freetogame.com/api/games');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    getGames();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View>
              <Text style={styles.item} onPress={() => Linking.openURL(item.game_url)}>
                {item.title}
              </Text>
              {addGameFromList && (
                <Button title="Add to TodoList" onPress={() => addGameFromList(item)} />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",
    padding: 15,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
  },
  item: {
    fontSize: 18,
    margin: 15,
  },
  thumbnail: {
    width: 150,
    height: "auto",
    borderRadius: 10,
  },
});

export default ListGames;
