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
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import Dropdown from "./components/Dropdown";

// Function used to navigate/define our Login page containing
// text innputs, buttons, and a way to request user authentication
// for when a user attempts to login.
const Login = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [successfulLogin, setSuccessfulLogin] = useState(false);

    // This handles signing in with the two variables passed through
    // the text boxes. If the function fails, it will catch an error
    // that allows us to know that the login failed, and likely 
    // caused by an incorrect email/pass.
    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                console.log("SUCCESSFUL LOGIN!");
                navigation.navigate("Map");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setSuccessfulLogin(!successfulLogin);
            });
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={successfulLogin}
                onRequestClose={() => {
                    setSuccessfulLogin(!successfulLogin);
                }}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Incorrect E-mail/Password!
                        </Text>
                        <Pressable
                            style={[styles.modalButton, styles.buttonClose]}
                            onPress={() => setSuccessfulLogin(!successfulLogin)}
                        >
                            <Text style={styles.textStyle}>Go back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.baseText}>
                <Text style={styles.titleText}>Locality</Text>
            </Text>
            <TextInput
                placeholder="E-mail"
                autoCorrect={false}
                style={styles.textInp}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder="Password"
                autoCorrect={false}
                style={styles.textInp}
                secureTextEntry={true}
                onChangeText={(text) => setPass(text)}
                value={pass}
            />
            <View
                style={{
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    marginTop: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => loginUser()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Log-in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate(SignUp)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign-up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// Function used to navigate/define our Sign-up page containing
// an method of requesting the creation of a new user via Firebase.
const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [confirmEmail, setConfirmEmail] = useState(null);
    const [wrongCred, setWrongCred] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);

    // This function validates the user input by checking whether or not
    // the email is correct. The user will input their email in twice to
    // verify that they did not incorrectly type it, and if those are correct,
    // then the function will finally send the Firebase request to make a
    // new user.
    function createNewUser() {
        if (confirmEmail === email) {
            createUserWithEmailAndPassword(auth, email, pass)
                .then(() => {
                    console.log("SUCCESSFUL SIGN-UP!");
                    navigation.navigate(Login);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    setWrongCred(!wrongCred);
                });
            return true;
        } else {
            console.log("UNSUCCUESSFUL SIGN-UP!");
            setVerifyEmail(!verifyEmail);
        }
        return false;
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={verifyEmail}
                onRequestClose={() => {
                    setVerifyEmail(!verifyEmail);
                }}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            E-mails do not match!
                        </Text>
                        <Pressable
                            style={[styles.modalButton, styles.buttonClose]}
                            onPress={() => setVerifyEmail(!verifyEmail)}
                        >
                            <Text style={styles.textStyle}>Go back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={wrongCred}
                onRequestClose={() => {
                    setWrongCred(!wrongCred);
                }}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Email already in use!
                        </Text>
                        <Pressable
                            style={[styles.modalButton, styles.buttonClose]}
                            onPress={() => setWrongCred(!wrongCred)}
                        >
                            <Text style={styles.textStyle}>Go back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.baseText}>
                <Text style={styles.titleText}>Locality</Text>
            </Text>
            <TextInput
                placeholder="E-mail"
                autoCorrect={false}
                style={styles.textInp}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder="Confirm E-mail"
                autoCorrect={false}
                style={styles.textInp}
                keyboardType="email-address"
                onChangeText={(text) => setConfirmEmail(text)}
                value={confirmEmail}
            />
            <TextInput
                placeholder="Password"
                autoCorrect={false}
                style={styles.textInp}
                secureTextEntry={true}
                onChangeText={(text) => setPass(text)}
                value={pass}
            />
            <View
                style={{
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    marginTop: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => createNewUser()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}> Sign-Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Initializes a stack navigator.
const Stack = createStackNavigator();

// Adds the multiple functions to the stack navigator and initializes
// the initial screen to be the Login screen.
const App = () => {
    return (
        <Dropdown/>
        // <Map/>
        // <NavigationContainer>
        //     <Stack.Navigator initialRouteName="LoginScreen">
        //         {/* <Stack.Screen name="Login" component={Login} /> */}
                
        //         <Stack.Screen name="Locality" component={Map} />
                
        //         {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
        //     </Stack.Navigator>
        // </NavigationContainer>
    );
};

// Various style properties used for displaying/rendering on React
// Native.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
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
    mapHeader:{
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

console.warn = () => {};

export default App;
