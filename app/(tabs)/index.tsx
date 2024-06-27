import { FlatList } from "react-native";

import PokemonItem from "@/components/PokemonItem";
import { usePokemonQuery } from "@/hooks/usePokemonQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-ficus-ui";
import PokemonTile from "@/components/PokemonTile";

export type PokemonUrl = {
  url: string;
};
export default function PokedexScreen() {
  const { data: pokemons, fetchNextPage } = usePokemonQuery({ limit: 20 });
  return (
    <ThemeProvider>
      <SafeAreaView>
        <FlatList
          data={pokemons}
          numColumns={2}
          renderItem={({ item }) => <PokemonTile url={item.url} />}
          keyExtractor={(_, i) => i.toString()}
          initialNumToRender={10}
          onEndReached={fetchNextPage}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}
