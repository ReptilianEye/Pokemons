import AddPokemonModal from "@/components/AddPokemonModal";
import React, { useState } from "react";
import { Box, SafeAreaBox, Text, ThemeProvider, useDisclosure } from "react-native-ficus-ui";
import MapView, { Marker } from "react-native-maps";
import { PokemonOnMap, usePokemonsOnMapContext } from "../context/PokemonOnMapContext";

function MapScreen() {
  const { pokemonsOnMap } = usePokemonsOnMapContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  return (
    <ThemeProvider>
      <MapView
        onLongPress={(e) => {
          setPosition(e.nativeEvent.coordinate);
          onOpen();
          // setMarkers([...markers, e.nativeEvent.coordinate]);
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {pokemonsOnMap.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              ...marker,
            }}
          />
        ))}
        <AddPokemonModal isOpen={isOpen} onClose={onClose} position={position} />
      </MapView>
    </ThemeProvider>
  );
}

export default MapScreen;
