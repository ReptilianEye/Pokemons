import { FlatList } from "react-native";

import PokemonItem from "@/components/PokemonItem";
import { usePokemonQuery } from "@/hooks/usePokemonQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-ficus-ui";

export type PokemonUrl = {
  url: string;
};
export default function PokedexScreen() {
  const { data: pokemons, fetchNextPage } = usePokemonQuery({ limit: 10 });
  return (
    <ThemeProvider>
      <SafeAreaView>
        <FlatList
          data={pokemons}
          numColumns={2}
          renderItem={({ item }) => <PokemonItem url={item.url} />}
          keyExtractor={(_, i) => i.toString()}
          initialNumToRender={10}
          onEndReached={fetchNextPage}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}
