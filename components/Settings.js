import * as React from 'react';
import { View, Text } from "react-native";

export default function Settings() {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{fontSize:50,fontWeight:'700'}}>Settings</Text>
<Text style={{fontSize:16,fontWeight:'700'}}>Dark Mode</Text>
<Text style={{fontSize:16,fontWeight:'700'}}>Light Mode</Text>
</View>
   );
 }