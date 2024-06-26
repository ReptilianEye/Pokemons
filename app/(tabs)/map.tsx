import React from "react";
import { Box, SafeAreaBox, Text, ThemeProvider } from "react-native-ficus-ui";

function MapScreen() {
  return (
    <ThemeProvider>
      <SafeAreaBox>
        <Box>
          <Text>Map</Text>
        </Box>
      </SafeAreaBox>
    </ThemeProvider>
  );
}

export default MapScreen;
