import { createContext, useContext, useState } from "react";
export type PokemonOnMap = {
  latitude: number;
  longitude: number;
  detailsUrl: string;
};
const PokemonOnMapContext = createContext<{
  pokemonsOnMap: PokemonOnMap[];
  setPokemonsOnMap: React.Dispatch<React.SetStateAction<PokemonOnMap[]>>;
}>({
  pokemonsOnMap: [],
  setPokemonsOnMap: () => {},
});

export function PokemonOnMapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemonsOnMap, setPokemonsOnMap] = useState<PokemonOnMap[]>([]);

  return (
    <PokemonOnMapContext.Provider
      value={{
        pokemonsOnMap,
        setPokemonsOnMap,
      }}
    >
      {children}
    </PokemonOnMapContext.Provider>
  );
}

export const usePokemonsOnMapContext = () => useContext(PokemonOnMapContext);
