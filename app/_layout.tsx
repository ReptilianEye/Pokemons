import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "react-native-ficus-ui";
import { PokemonOnMapProvider } from "./context/PokemonOnMapContext";
import Toast from "react-native-toast-message";
import { FavoritePokemonProvider } from "./context/FavoritePokemonContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PokemonOnMapProvider>
          <FavoritePokemonProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <Toast />
          </FavoritePokemonProvider>
        </PokemonOnMapProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
