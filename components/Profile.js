import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet} from "react-native";

export default function MapContainer() {
   const [viewChange, setViewChange] = useState(false);

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text style={{ fontSize: 50, fontWeight: '700' }}>Profile</Text>
         <Text style={{ fontSize: 16, fontWeight: '700' }}>Username: testUsername101</Text>
         
         <Text style={{ fontSize: 16, fontWeight: '700' }}>Password: testPassword101</Text>
         <TouchableOpacity
            style={styles.button}
            onPress={() => setViewChange(true)}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Change Password</Text>
         </TouchableOpacity>
         <Text style={styles.inputText}> {viewChange}</Text>
         
      </View>
   );
}

const styles = StyleSheet.create({
   button: {
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      paddingVertical: 10,
      backgroundColor:'red',
      borderRadius:15,
      borderWidth: 1,
      borderColor: 'red',
   },
   buttonText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  inputText:{
   color:'black',
   textAlign:'center',
   paddingLeft : 10,
   paddingRight : 10
}
})