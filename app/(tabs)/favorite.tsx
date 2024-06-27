import { Link } from "expo-router";
import { Image } from "react-native";
import { Button, Center, SafeAreaBox, Text } from "react-native-ficus-ui";
import { useFavoritePokemonContext } from "../context/FavoritePokemonContext";

export default function FavoritePokemonScreen() {
  const { favoritePokemon, removeFavoritePokemon } =
    useFavoritePokemonContext();
  if (favoritePokemon) {
    return (
      <SafeAreaBox>
        <Center>
          <Text fontSize="4xl">Your favorite pokemon</Text>
          <Image
            source={{ uri: favoritePokemon.sprites.front_default }}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text>{favoritePokemon.name}</Text>
          <Button onPress={removeFavoritePokemon}>
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
        <Link href="/">Select one</Link>
      </Center>
    </SafeAreaBox>
  );
}
