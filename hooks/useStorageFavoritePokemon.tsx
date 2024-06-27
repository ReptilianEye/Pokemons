import AsyncStorage from "@react-native-async-storage/async-storage";
import { type TPokemonDetails } from "./usePokemonQuery";

const key = "favoritePokemon";
export const useFavoritePokemon = () => {
  const getFavoritePokemonFromStorage = async (): Promise<
    TPokemonDetails | undefined
  > => {
    try {
      const pokemon = await AsyncStorage.getItem(key);
      return pokemon ? JSON.parse(pokemon) : undefined;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };
  const removeFavoritePokemonFromStorage = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  const saveFavoritePokemonToStorage = async (pokemon: TPokemonDetails) => {
    try {
      const jsonPokemon = JSON.stringify(pokemon);
      await AsyncStorage.setItem(key, jsonPokemon);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getFavoritePokemonFromStorage,
    saveFavoritePokemonToStorage,
    removeFavoritePokemonFromStorage,
  };
};
