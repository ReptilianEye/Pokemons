import { PokemonUrl } from "@/app/(tabs)";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export type TPokemonDetails = {
  name: string;
  sprites: {
    front_default: string;
  };
};
const fetchPokemons = async ({ pageParam = 0 }): Promise<{ url: string }[]> =>
  (await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageParam}`))
    .json()
    .then((data) => data.results);

export const usePokemonQuery = ({ limit = 10 }: { limit?: number; offset?: number }) => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", limit],
    queryFn: fetchPokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined),
  });
  const flattenData = useMemo(() => data?.pages.flatMap((page) => page) || [], [data?.pages]);
  const loadNext = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage]);
  return { data: flattenData, fetchNextPage: loadNext, isLoading, isFetchingNextPage };
};

export const usePokemonDetailsQuery = (detailsUrl: string) =>
  useQuery({
    queryKey: ["pokemonsDetails", detailsUrl],
    queryFn: async (): Promise<TPokemonDetails> => (await fetch(detailsUrl)).json(),
  });
