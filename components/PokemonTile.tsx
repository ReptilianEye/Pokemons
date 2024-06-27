import React from "react";
import { PokemonUrl } from "@/app/(tabs)";
import { Image } from "react-native";
import { usePokemonDetailsQuery } from "@/hooks/usePokemonQuery";
import { Center, Pressable, Text, ThemeProvider, useDisclosure } from "react-native-ficus-ui";
import PokemonModal from "./PokemonModal";

function PokemonTile({ url }: PokemonUrl) {
  const { data: pokemonDetails, isLoading, error } = usePokemonDetailsQuery(url);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ThemeProvider>
      <Center w={"50%"}>
        <Pressable onPress={onOpen}>
          <Image
            style={{
              width: 75,
              height: 75,
            }}
            source={{ uri: pokemonDetails?.sprites.front_default }}
          />
          <Text textAlign={"center"}>{pokemonDetails?.name}</Text>
        </Pressable>
      </Center>

      {pokemonDetails && (
        <PokemonModal isOpen={isOpen} onClose={onClose} pokemonDetails={pokemonDetails} />
      )}
    </ThemeProvider>
  );
}

export default PokemonTile;
