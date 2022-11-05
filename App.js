import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Map = () => {
  return(
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
  // if(errorMsg) {
  //   text = errorMsg;
  // }
  // else if (location) {
  //   text = JSON.stringify(location);
  // }
  <View>
    <StatusBar style="auto" />
    <MapView style={styles.map} initialRegion={{
      latitude: 29.643633,
      longitude: -82.354927,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}/>
  </View>
  )
}

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  return (
    <View style={styles.container}>
      <Text style = {styles.baseText}>
        <Text style = {styles.titleText}>
          Locality
        </Text>
      </Text>
      <TextInput
        placeholder='E-mail'
        autoCorrect={false}
        style={styles.textInp}
        keyboardType='email-address'
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='Password'
        autoCorrect={false}
        style={styles.textInp}
        secureTextEntry={true}
        onChangeText={text => setPass(text)}
        value={pass}
      />
      <View style={{
        justifyContent:'space-evenly',
        flexDirection: 'row',
        marginTop: 20
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Map")}
          style={styles.button}>
            <Text style={styles.buttonText}> Log-in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('Hello, world!')}
          style={styles.button}>
            <Text style={styles.buttonText}> Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Map' component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  baseText: {
    fontFamily: "Times New Roman"
  },
  titleText: {
    fontFamily: "Helvetica",
    fontSize: 50,
    color: '#382',
  },
  button: {
    backgroundColor: '#382',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  textInp: {
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 10,
    width: 200
  },
});

export default App;