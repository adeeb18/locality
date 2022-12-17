import * as React from 'react';
import { View, Text } from "react-native";
import Map from './Map';
export default function MapContainer() {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Map/>
      </View>
   );
}