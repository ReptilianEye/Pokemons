import { usePokemonDetailsQuery } from "@/hooks/usePokemonQuery";
import { Pressable, View } from "react-native";
import { HStack, Image, Text, ThemeProvider } from "react-native-ficus-ui";
import Toast from "react-native-toast-message";

export default function PokemonItem({ url, onPress }: { url: string; onPress: () => void }) {
  const { data: pokemonDetails } = usePokemonDetailsQuery(url);

  return (
    <ThemeProvider>
      <Pressable
        onPress={() => {
          Toast.show({
            type: "success",
            text1: "Pokemon added to map",
            text2: pokemonDetails?.name,
          });
          onPress();
        }}
      >
        <HStack alignItems={"center"}>
          <Image
            style={{
              width: 75,
              height: 75,
            }}
            source={{ uri: pokemonDetails?.sprites.front_default }}
          />
          <Text fontSize={"xl"}>{pokemonDetails?.name}</Text>
        </HStack>
      </Pressable>
    </ThemeProvider>
  );
}
