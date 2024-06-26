import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";
import { TPokemonDetails } from "@/hooks/usePokemonQuery";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Modal,
  Text,
} from "react-native-ficus-ui";
import { IconButton } from "react-native-paper";
export default function PokemonModal({
  isOpen,
  onClose,
  pokemonDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  pokemonDetails: TPokemonDetails;
}) {
  const {
    getFavoritePokemonFromStorage,
    saveFavoritePokemonToStorage,
    removeFavoritePokemonFromStorage,
  } = useFavoritePokemon();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    getFavoritePokemonFromStorage().then((favoritePokemon) => {
      setLiked(favoritePokemon?.name === pokemonDetails.name);
    });
  }, []);
  useEffect(() => {
    if (liked) saveFavoritePokemonToStorage(pokemonDetails);
    else removeFavoritePokemonFromStorage();
  }, [liked]);

  return (
    <Modal isOpen={isOpen}>
      <Flex>
        <IconButton
          icon={liked ? "heart" : "heart-outline"}
          iconColor={liked ? "red" : "black"}
          onPress={() => {
            setLiked((prev) => !prev);
          }}
          style={{
            alignSelf: "flex-end",
          }}
        />
        <Center>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={{ uri: pokemonDetails?.sprites.front_default }}
          />
          <Text textAlign={"center"} fontSize={"4xl"}>
            {pokemonDetails?.name}
          </Text>
        </Center>
        <Divider />
        <Button onPress={onClose}>
          <Text>Close</Text>
        </Button>
      </Flex>
    </Modal>
  );
}
