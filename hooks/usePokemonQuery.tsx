import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export type TPokemonDetails = {
  name: string;
  sprites: {
    front_default: string;
  };
};
const fetchPokemons = async ({
  pageParam = 0,
}): Promise<Array<{ url: string }>> => {
  // console.log(pageParam);
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageParam}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch: error ${response.status} ${response.statusText}`,
    );
  }
  const { results } = await response.json();
  return results;
};

export const usePokemonQuery = ({ limit = 10 }: { limit?: number }) => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemons", limit],
      queryFn: fetchPokemons,
      initialPageParam: 0,
      getNextPageParam: (lastPage, _pages, lastPageParam) => {
        // console.log(lastPageParam);
        return lastPage.length > 0 ? lastPageParam + limit : undefined;
      },
    });
  const flattenData = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data?.pages],
  );
  const loadNext = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage]);
  return {
    data: flattenData,
    fetchNextPage: loadNext,
    isLoading,
    isFetchingNextPage,
  };
};

export const usePokemonDetailsQuery = (detailsUrl: string) =>
  useQuery({
    queryKey: ["pokemonsDetails", detailsUrl],
    queryFn: async (): Promise<TPokemonDetails> => {
      const response = await fetch(detailsUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch: error ${response.status} ${response.statusText}`,
        );
      }
      return await response.json();
    },
  });
