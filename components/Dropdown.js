import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MapContainer from './MapContainer';
import Settings from './Settings';
import Header from './Header';
import MenuItems from './MenuItems'
import { Ionicons } from '@expo/vector-icons';
import Profile from './Profile';
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

export default function Dropdown() {
    return (
        
        <NavigationContainer independent='true'>
            <Drawer.Navigator
                drawerType="front"
                initialRouteName="MapContainer"
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 20 },
                }}
            >
                {
                    MenuItems.map(drawer => <Drawer.Screen
                        key={drawer.name}
                        name={drawer.name}
                        options={{
                            drawerIcon: ({ focused }) =>
                                <Ionicons
                                    name={drawer.iconName} size={32} color='green'
                                    />
                            ,
                            headerShown: true,
                            header: () => {
                                return (
                                    <Header screen="Hello" />
                                );
                            }

                        }}
                        component={
                            drawer.name === 'MapContainer' ? MapContainer :
                            drawer.name === 'Profile' ? Profile
                                : Settings
                                   
                        }
                    />)
                }

                
            </Drawer.Navigator>
        </NavigationContainer>
    );
}