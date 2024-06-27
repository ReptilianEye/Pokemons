import { usePokemonQuery } from "@/hooks/usePokemonQuery";
import { FlatList, SafeAreaView } from "react-native";
import { Button, Center, HStack, Modal, Text } from "react-native-ficus-ui";
import PokemonItem from "./PokemonItem";
import { usePokemonsOnMapContext } from "@/app/context/PokemonOnMapContext";
export default function AddPokemonModal({
  isOpen,
  onClose,
  position,
}: {
  isOpen: boolean;
  onClose: () => void;
  position: { latitude: number; longitude: number };
}) {
  const { data: pokemons, fetchNextPage } = usePokemonQuery({ limit: 10 });
  const { setPokemonsOnMap } = usePokemonsOnMapContext();
  return (
    <SafeAreaView>
      <Center>
        <Modal isOpen={isOpen} borderRadius={10} h="90%">
          <HStack alignItems="center" spacing={15} m={1}>
            <Text fontSize="xl" textAlign="center">
              Which pokemon did you catch here?
            </Text>
            <Button onPress={onClose} colorScheme="red">
              Cancel
            </Button>
          </HStack>
          <SafeAreaView>
            <FlatList
              data={pokemons}
              renderItem={({ item }) => (
                <PokemonItem
                  url={item.url}
                  onPress={() => {
                    onClose();
                    setPokemonsOnMap((prev) => [
                      ...prev,
                      { ...position, detailsUrl: item.url },
                    ]);
                  }}
                />
              )}
              keyExtractor={(_, i) => i.toString()}
              initialNumToRender={10}
              onEndReached={fetchNextPage}
            />
          </SafeAreaView>
        </Modal>
      </Center>
    </SafeAreaView>
  );
}
