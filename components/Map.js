import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Modal,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Pressable,
    TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";


// Contains all of our location data for businesses that
// meet our criteria.
const localityData = [
    {
        Address: "5001 NW 34th Blvd, Gainesville, FL 32605",
        Name: "African Unique - International Marketplace",
        Tag: "African Market",
        Type: "Locally owned business",
        Lat: 29.700073,
        Long: -82.3694288,
    },
    {
        Address: "703 NE 1st Street, Gainesville, FL, 32601",
        Name: "Alachua County Coalition for the Homeless and Hungry ",
        Type: "Charity",
        Lat: 29.6582209,
        Long: -82.3236734,
    },
    {
        Address: "3615 SW 13th Street, Suite 4, Gainesville, FL, 32608",
        Name: "Alachua County Health Promotion and Wellness Coalition",
        Type: "Charity",
        Lat: 29.6196877,
        Long: -82.3403397,
    },
    {
        Address: "2630 NW 41 St, Gainesville, FL 32606",
        Name: "Alachua Habitat for Humanity",
        Type: "Charity",
        Lat: 29.6774944,
        Long: -82.3868872,
    },
    {
        Address: "520 Newell Dr, Gainesville, FL 32603",
        Name: "Alan and Cathy Hitchcock Field & Fork Pantry",
        Type: "Food bank",
        Lat: 29.6473592,
        Long: -82.3440286,
    },
    {
        Address: "6815 SW Archer Road, Gainesville, FL, 32608",
        Name: "AMI Kids",
        Type: "Charity",
        Lat: 29.5998911,
        Long: -82.4136659,
    },
    {
        Address: "2618 NW 6th Street, Gainesville, FL, 32609",
        Name: "Arbor House",
        Type: "Charity",
        Lat: 29.6773734,
        Long: -82.3311523,
    },
    {
        Address: "325 NW 10th Ave, Gainesville, FL 32601",
        Name: "Bread of the Mighty Food Bank",
        Type: "Food bank",
        Lat: 29.6609324,
        Long: -82.3284265,
    },
    {
        Address: "1701 NE 9th St, Gainesville, FL 32609",
        Name: "Catholic Charities Bureau",
        Type: "Charity",
        Lat: 29.6675046,
        Long: -82.3142963,
    },
    {
        Address: "3615 SW 13th Street, Gainesville, FL, 32608",
        Name: "CDS Family and Health Services",
        Type: "Charity",
        Lat: 29.6196877,
        Long: -82.3403397,
    },
    {
        Address: "500 E. University Avenue, Suite A, Gainesville, FL, 32601",
        Name: "Child Advocacy Center of Gainesville",
        Type: "Charity",
        Lat: 29.6521818,
        Long: -82.3206137,
    },
    {
        Address: "711 NW 1st Street, Gainesville, FL, 32601",
        Name: "Children's Home Society",
        Type: "Charity",
        Lat: 29.6583211,
        Long: -82.3256289,
    },
    {
        Address: "418 NW 8th Ave, Gainesville, FL 32601",
        Name: "Chun Ching Market",
        Tag: "Asian Market",
        Type: "Locally owned business",
        Lat: 29.6598616,
        Long: -82.3293808,
    },
    {
        Address: "3919 Newberry Rd, Gainesville, FL 32607",
        Name: "Community Foundation of North Central Florida",
        Type: "Charity",
        Lat: 29.653076,
        Long: -82.3839941,
    },
    {
        Address: "12626 NW Co Rd 231, Gainesville, FL 32609",
        Name: "Critter Creek Farm Sanctuary",
        Type: "Charity",
        Lat: 29.7707976,
        Long: -82.3573946,
    },
    {
        Address: "4110 SW 34th St, Gainesville, FL 32608",
        Name: "Deshi Bazaar",
        Tag: "Indian Market",
        Type: "Locally owned business",
        Lat: 29.6149345,
        Long: -82.3726833,
    },
    {
        Address: "15818 NW 140th Street, Alachua, FL, 32615",
        Name: "Dream Girlz",
        Type: "Charity",
        Lat: 29.8004507,
        Long: -82.49466,
    },
    {
        Address: "4424 NW 13th Street, A5, Gainesville, FL, 32609",
        Name: "Early Learning Coalition of Alachua County",
        Type: "Charity",
        Lat: 29.6950514,
        Long: -82.3394645,
    },
    {
        Address: "1349 NW 23rd Ave, Gainesville, FL 32605",
        Name: "Eastern Market",
        Tag: "Asian Market",
        Type: "Locally owned business",
        Lat: 29.6728962,
        Long: -82.3395013,
    },
    {
        Address: "3045 SW 34th St Ste 30, Gainesville, FL 32608",
        Name: "Enson Market",
        Tag: "Asian Market",
        Type: "Locally owned business",
        Lat: 29.6256911,
        Long: -82.3705784,
    },
    {
        Address: "238 SW 4th Ave, Gainesville, FL 32601",
        Name: "Gainesville Community Ministry",
        Type: "Food bank",
        Lat: 29.648602,
        Long: -82.3277753,
    },
    {
        Address: "5106 NW 8th Ave, Gainesville, FL 32605",
        Name: "Gainesville Fisher House Foundation",
        Type: "Charity",
        Lat: 29.6599417,
        Long: -82.3975692,
    },
    {
        Address: "3345 SW 34th Street, Suite 2, Gainesville, FL, 32608",
        Name: "GiGi's Playhouse Down Syndrome Achievement Center",
        Type: "Charity",
        Lat: 29.6238899,
        Long: -82.3710559,
    },
    {
        Address: "2101 NW 39th Avenue, Gainesville, FL, 32605",
        Name: "Girl's Place",
        Type: "Charity;",
        Lat: 29.6878431,
        Long: -82.3515216,
    },
    {
        Address: "3055 NE 28th Dr, Gainesville, FL 32609",
        Name: "GRACE Marketplace",
        Type: "Charity",
        Lat: 29.6796399,
        Long: -82.2879375,
    },
    {
        Address: "6011 NW 1st Place, Gainesville, FL, 32607",
        Name: "Healthy Families",
        Type: "Charity",
        Lat: 29.6533314,
        Long: -82.4067494,
    },
    {
        Address: "1785 NW 80 BLVD, Gainesville, Florida, 32606",
        Name: "Healthy Start of North Central Florida",
        Type: "Charity",
        Lat: 29.6699732,
        Long: -82.4290927,
    },
    {
        Address: "2603 NW 13th Street, Box 308, Gainesville, FL, 32609",
        Name: "Help Me Grow Alachua",
        Type: "Charity",
        Lat: 29.6763591,
        Long: -82.3384442,
    },
    {
        Address: "3550 SW 34th St suite j, Gainesville, FL 32608",
        Name: "India Bazaar",
        Tag: "Indian Market",
        Type: "Locally owned business",
        Lat: 29.621201,
        Long: -82.3736086,
    },
    {
        Address: "13915 N State Rd 121, Gainesville, FL 32653",
        Name: "Jungle Friends Primate Sanctuary",
        Type: "Charity",
        Lat: 29.7826847,
        Long: -82.3750531,
    },
    {
        Address: "211 SW 4th Ave, Gainesville, FL 32601",
        Name: "Keep Alachua County Beautiful",
        Type: "Charity",
        Lat: 29.6482253,
        Long: -82.3270493,
    },
    {
        Address: "2022 SW 122nd Avenue, Gainesville, FL, 32608",
        Name: "Kid 2 Kid Closet at the Family Church",
        Type: "Charity",
        Lat: 29.7666381,
        Long: -82.3596105,
    },
    {
        Address: "3721 W University Ave, Gainesville, FL 32607",
        Name: "La Aurora Latin Market",
        Tag: "Latin Market",
        Type: "Locally owned business",
        Lat: 29.6512525,
        Long: -82.3790111,
    },
    {
        Address: "1010 SE 4th Avenue, Gainesville, FL, 32601",
        Name: "PACE Center for Girls",
        Type: "Charity",
        Lat: 29.6486147,
        Long: -82.3131297,
    },
    {
        Address: "5950 NW 1st Place, Suite A, Gainesville, FL, 32607",
        Name: "Partnership for Strong Families",
        Type: "Charity",
        Lat: 29.6538697,
        Long: -82.4060147,
    },
    {
        Address: "2100 NW 53rd Avenue, Gainesville, FL, 32653",
        Name: "Peaceful Paths",
        Type: "Charity",
        Lat: 29.7039049,
        Long: -82.3517722,
    },
    {
        Address: "1600 SW 14th St, Gainesville, FL 32608",
        Name: "Ronald McDonald House",
        Type: "Charity",
        Lat: 29.63591,
        Long: -82.3410228,
    },
    {
        Address: "639 E University Ave, Gainesville, FL 32601",
        Name: "Salvation Army",
        Type: "Charity",
        Lat: 29.6515774,
        Long: -82.3179585,
    },
    {
        Address: "4581 NW 6th St suite a, Gainesville, FL 32609",
        Name: "Sea Turtle Conservancy",
        Type: "Charity",
        Lat: 29.6964918,
        Long: -82.3342288,
    },
    {
        Address: "413 S Main St, Gainesville, FL 32601",
        Name: "St Francis House",
        Type: "Soup kitchen",
        Lat: 29.6480411,
        Long: -82.3244716,
    },
    {
        Address: "2802 NE 8th Avenue, Gainesville, FL, 32641",
        Name: "The Education Foundation",
        Type: "Charity",
        Lat: 29.6598945,
        Long: -82.2885799,
    },
    {
        Address: "515 NW 23rd Ave, Gainesville, FL 32609",
        Name: "Ward's Supermarket",
        Tag: "Traditional Market",
        Type: "Locally owned business",
        Lat: 29.6735514,
        Long: -82.3296511,
    },
    {
        Address: "219 NW 10th Ave, Gainesville, FL 32601",
        Name: "Working Food Community Center",
        Type: "Charity",
        Lat: 29.6604848,
        Long: -82.3274147,
    },
    {
        Address: "2325 SW 13th St, Gainesville, FL 32608",
        Name: "Zeezenia Kitchen & Market",
        Tag: "International Market",
        Type: "Locally owned business",
        Lat: 29.6302567,
        Long: -82.3388575,
    },
];

// Passes our location data into a variable.
const state = { localityData };
// Function that returns all of our location data from
// said variable in the form of a <Marker> (a pin in Apple
// Maps).


// Function used to navigate/define our Map page containing
// an implementation of our Apple Maps, Markers, and User
// Location data.
export default function Map() {
    const [typeToggle, setTypeToggle] = useState(1)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const mapToggle = { 2: 'Charity', 3: 'Locally owned business', 4: 'Soup kitchen', 5: 'Food bank' }
    const mapMarkers = () => {

        let updatedVals = [];
        for (let i = 0; i < state.localityData.length; i++) {
            if (typeToggle == 1) {
                updatedVals = [...updatedVals, state.localityData[i]];
            }
            else {
                if (state.localityData[i].Type === mapToggle[typeToggle]) {
                    updatedVals = [...updatedVals, state.localityData[i]]

                }
            }
        }
        return (
            updatedVals.map((report) => (
                <Marker
                    key={report.Address}
                    coordinate={{ latitude: report.Lat, longitude: report.Long }}
                    // title={report.Name}
                    // description={"Type: " + report.Type + "Address: " + report.Address}
                >
                    <Callout alphaHitTest='true'>
                        <View style={{ height: 100, width: 200, paddingHorizontal: 5}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: "center"}}>{report.Name}</Text>
                            <Text style={{ fontSize: 12 }}>{"- " + report.Address}</Text>
                            <Text style={{ fontSize: 12 }}>{"- " + report.Type}</Text>
                            <Text style={{ fontSize: 12 }}>{"- " + report.Tag}</Text>
                        </View>
                    </Callout>
                </Marker>)
            ));
    };


    useEffect(() => {
        (async () => {
            // This command will send a pop-up to a user asking for permission
            // for their location data.
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setErrorMsg("location permissions denied");
                return;
            }

            // If permission is granted, then we will obtain the user's current
            // location, and set it using useState().
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let latitude = 0;
    let longitude = 0;

    // if errorMsg is not equal to null, then we will set a
    // locally scoped variable to contain the user's current
    // latitude and longitute.
    if (errorMsg) {
        console.log(errorMsg);
    } else if (location) {
        console.log(JSON.stringify(location));
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
    }

    // This displays a rendered Map on the page, centered
    // around Gainesville, FL, a rendered route between two
    // points: one of which is the user's current location,
    // and the other, an arbitrary pin that is already 
    // displayed on the Map. The MapViewDirections marker
    // is passed in a Google Maps API key so that we may
    // request routing information.
    return (
        <View>
            <StatusBar style="auto" />
            <View style={styles.containerButtons}>
                <TouchableOpacity onPress={() => setTypeToggle(1)}>
                    <Text style={styles.titleButtons}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTypeToggle(2)}>
                    <Text style={styles.titleButtons}>
                        Charities
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTypeToggle(3)}>
                    <Text style={styles.titleButtons}>
                        Locally Owned
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTypeToggle(4)}>
                    <Text style={styles.titleButtons}>
                        Soup Kitchen
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTypeToggle(5)}>
                    <Text style={styles.titleButtons}>
                        Food Bank
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.mapHeader}>
                <Text style={styles.titleText}>Locality</Text>
            </Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 29.643633,
                    longitude: -82.354927,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapViewDirections
                    origin={{ latitude: 29.6302567, longitude: -82.3388575 }}
                    destination={{ latitude: latitude, longitude: longitude }}
                    apikey={"AIzaSyBmnPPSVREyx-OAtCfFHA7gFXMEPVlGnTg"}
                    strokeWidth={4}
                    strokeColor="#3388FF"
                />
                {mapMarkers()}
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={"You"}
                    pinColor="green"
                ></Marker>
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
    },
    containerButtons: {
        position: 'absolute',
        top: 28,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        elevation: 10,
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleButtons: {
        paddingTop: 80,
        fontSize: '12 px',
        color: 'green'
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: -1
    },
    baseText: {
        fontFamily: "Times New Roman",
    },
    titleText: {
        fontFamily: "Helvetica",
        fontSize: 50,
        color: "#003300",
        textAlign: 'center',
    },
    mapHeader: {
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: "#382",
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
    textInp: {
        borderColor: "#666",
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        width: 200,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
