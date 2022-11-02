import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'


export default function App() {
  // const [location, setLocation]  = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let {status} = await Location.requestBackgroundPermissionsAsync();
  //     if(status !== 'granted') {
  //       setErrorMsg('location permissoins denied')
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = 'Waiting...';
  // if(errorMsg){
  //   text = errorMsg;
  // }
  // else if (location){
  //   text = JSON.stringify(location);
  // }

  return (
    <View style={styles.container}>
      <Text>Locality</Text>
      {/* <Text> {text}</Text> */}
      <StatusBar style="auto" />
      <MapView style={styles.map} initialRegion={{
      latitude: 29.643633,
      longitude: -82.354927,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    // ...StyleSheet.absoluteFillObject,
  },
});
