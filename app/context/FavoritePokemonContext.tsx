import { type TPokemonDetails } from "@/hooks/usePokemonQuery";
import { useFavoritePokemon } from "@/hooks/useStorageFavoritePokemon";
import { createContext, useContext, useEffect, useState } from "react";

const FavoritePokemonContext = createContext<{
  favoritePokemon: TPokemonDetails | undefined;
  saveFavoritePokemon: (pokemon: TPokemonDetails) => void;
  removeFavoritePokemon: () => void;
}>({
  favoritePokemon: undefined,
  saveFavoritePokemon: () => {},
  removeFavoritePokemon: () => {},
});

export function FavoritePokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoritePokemon, setFavoritePokemon] = useState<
    TPokemonDetails | undefined
  >(undefined);

  const {
    getFavoritePokemonFromStorage,
    saveFavoritePokemonToStorage,
    removeFavoritePokemonFromStorage,
  } = useFavoritePokemon();

  useEffect(() => {
    getFavoritePokemonFromStorage().then(setFavoritePokemon);
  }, []);

  const combineSavingFavoritePokemon = (pokemon: TPokemonDetails) => {
    setFavoritePokemon(pokemon);
    saveFavoritePokemonToStorage(pokemon);
  };
  return (
    <FavoritePokemonContext.Provider
      value={{
        favoritePokemon,
        saveFavoritePokemon: combineSavingFavoritePokemon,
        removeFavoritePokemon: removeFavoritePokemonFromStorage,
      }}
    >
      {children}
    </FavoritePokemonContext.Provider>
  );
}

export const useFavoritePokemonContext = () =>
  useContext(FavoritePokemonContext);
