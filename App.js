import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase';

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

  const createNewUser = () => {
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      console.log("SUCCESSFUL SIGN-UP!");
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("SUCCESSFUL LOGIN!");
      navigation.navigate("Map");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

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
          onPress={() => loginUser()}
          style={styles.button}>
            <Text style={styles.buttonText}> Log-in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => createNewUser()}
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

var localityData = [
  {
    "Address": "5001 NW 34th Blvd",
    "Name": "African Unique - International Marketplace",
    "Tag": "African Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "703 NE 1st Street",
    "Name": "Alachua County Coalition for the Homeless and Hungry ",
    "Type": "Charity"
  },
  {
    "Address": "3615 SW 13th Street",
    "Name": "Alachua County Health Promotion and Wellness Coalition",
    "Type": "Charity"
  },
  {
    "Address": "2630 NW 41 St",
    "Name": "Alachua Habitat for Humanity",
    "Type": "Charity"
  },
  {
    "Address": "520 Newell Dr",
    "Name": "Alan and Cathy Hitchcock Field &amp; Fork Pantry",
    "Type": "Food bank"
  },
  {
    "Address": "6815 SW Archer Road",
    "Name": "AMI Kids",
    "Type": "Charity"
  },
  {
    "Address": "2618 NW 6th Street",
    "Name": "Arbor House",
    "Type": "Charity"
  },
  {
    "Address": "325 NW 10th Ave",
    "Name": "Bread of the Mighty Food Bank",
    "Type": "Food bank"
  },
  {
    "Address": "1701 NE 9th St",
    "Name": "Catholic Charities Bureau",
    "Type": "Charity"
  },
  {
    "Address": "3615 SW 13th Street",
    "Name": "CDS Family and Health Services",
    "Type": "Charity"
  },
  {
    "Address": "500 E University Avenue",
    "Name": "Child Advocacy Center of Gainesville",
    "Type": "Charity"
  },
  {
    "Address": "711 NW 1st Street",
    "Name": "Children's Home Society",
    "Type": "Charity"
  },
  {
    "Address": "418 NW 8th Ave",
    "Name": "Chun Ching Market",
    "Tag": "Asian Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "3919 Newberry Rd",
    "Name": "Community Foundation of North Central Florida",
    "Type": "Charity"
  },
  {
    "Address": "12626 NW Co Rd 231",
    "Name": "Critter Creek Farm Sanctuary",
    "Type": "Charity"
  },
  {
    "Address": "4110 SW 34th St",
    "Name": "Deshi Bazaar",
    "Tag": "Indian Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "15818 NW 140th Street",
    "Name": "Dream Girlz",
    "Type": "Charity"
  },
  {
    "Address": "4424 NW 13th Street",
    "Name": "Early Learning Coalition of Alachua County",
    "Type": "Charity"
  },
  {
    "Address": "1349 NW 23rd Ave",
    "Name": "Eastern Market",
    "Tag": "Asian Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "3045 SW 34th St Ste 30",
    "Name": "Enson Market",
    "Tag": "Asian Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "238 SW 4th Ave",
    "Name": "Gainesville Community Ministry",
    "Type": "Food bank"
  },
  {
    "Address": "5106 NW 8th Ave",
    "Name": "Gainesville Fisher House Foundation",
    "Type": "Charity"
  },
  {
    "Address": "3345 SW 34th Street",
    "Name": "GiGi's Playhouse Down Syndrome Achievement Center",
    "Type": "Charity"
  },
  {
    "Address": "2101 NW 39th Avenue",
    "Name": "Girl's Place",
    "Type": " Charity;"
  },
  {
    "Address": "3055 NE 28th Dr",
    "Name": "GRACE Marketplace",
    "Type": "Charity"
  },
  {
    "Address": "6011 NW 1st Place",
    "Name": "Healthy Families",
    "Type": "Charity"
  },
  {
    "Address": "1785 NW 80 BLVD",
    "Name": "Healthy Start of North Central Florida",
    "Type": "Charity"
  },
  {
    "Address": "2603 NW 13th Street",
    "Name": "Help Me Grow Alachua",
    "Type": "Charity"
  },
  {
    "Address": "3550 SW 34th St suite j",
    "Name": "India Bazaar",
    "Tag": "Indian Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "13915 N State Rd 121",
    "Name": "Jungle Friends Primate Sanctuary",
    "Type": "Charity"
  },
  {
    "Address": "211 SW 4th Ave",
    "Name": "Keep Alachua County Beautiful",
    "Type": "Charity"
  },
  {
    "Address": "2022 SW 122nd Avenue",
    "Name": "Kid 2 Kid Closet at the Family Church",
    "Type": "Charity"
  },
  {
    "Address": "3721 W University Ave",
    "Name": "La Aurora Latin Market",
    "Tag": "Latin Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "1010 SE 4th Avenue",
    "Name": "PACE Center for Girls",
    "Type": "Charity"
  },
  {
    "Address": "5950 NW 1st Place",
    "Name": "Partnership for Strong Families",
    "Type": "Charity"
  },
  {
    "Address": "2100 NW 53rd Avenue",
    "Name": "Peaceful Paths",
    "Type": "Charity"
  },
  {
    "Address": "1600 SW 14th St",
    "Name": "Ronald McDonald House",
    "Type": "Charity"
  },
  {
    "Address": "639 E University Ave",
    "Name": "Salvation Army",
    "Type": "Charity"
  },
  {
    "Address": "4581 NW 6th St suite a",
    "Name": "Sea Turtle Conservancy",
    "Type": "Charity"
  },
  {
    "Address": "413 S Main St",
    "Name": "St Francis House",
    "Type": "Soup kitchen"
  },
  {
    "Address": "2802 NE 8th Avenue",
    "Name": "The Education Foundation",
    "Type": "Charity"
  },
  {
    "Address": "515 NW 23rd Ave",
    "Name": "Ward's Supermarket",
    "Tag": "Traditional Market",
    "Type": "Locally owned business"
  },
  {
    "Address": "219 NW 10th Ave",
    "Name": "Working Food Community Center",
    "Type": "Charity"
  },
  {
    "Address": "2325 SW 13th St",
    "Name": "Zeezenia Kitchen &amp; Market",
    "Tag": "International Market",
    "Type": "Locally owned business"
  }
];

export default App;
