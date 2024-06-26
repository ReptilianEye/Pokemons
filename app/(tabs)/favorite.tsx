import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";
import { TPokemonDetails } from "@/hooks/usePokemonQuery";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Box, Button, Center, SafeAreaBox, Text } from "react-native-ficus-ui";

export default function FavoritePokemonScreen() {
  const { getFavoritePokemonFromStorage, removeFavoritePokemonFromStorage } = useFavoritePokemon();
  const [favoritePokemon, setFavoritePokemon] = useState<TPokemonDetails | undefined>(undefined);
  useFocusEffect(
    useCallback(() => {
      getFavoritePokemonFromStorage().then((pokemon) => {
        setFavoritePokemon(pokemon);
      });
    }, [])
  );
  if (favoritePokemon) {
    return (
      <SafeAreaBox>
        <Center>
          <Text fontSize={"4xl"}>Your favorite pokemon</Text>
          <Image
            source={{ uri: favoritePokemon.sprites.front_default }}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text>{favoritePokemon.name}</Text>
          <Button
            onPress={() => {
              removeFavoritePokemonFromStorage();
              setFavoritePokemon(undefined);
            }}
          >
            Remove Favorite Pokemon
          </Button>
        </Center>
      </SafeAreaBox>
    );
  }
  return (
    <SafeAreaBox>
      <Center>
        <Text>No Favorite Pokemon</Text>
        <Link href={"/"}>Select one</Link>
      </Center>
    </SafeAreaBox>
  );
}
