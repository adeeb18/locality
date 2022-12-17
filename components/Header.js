import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ screen }) {
    const navigation = useNavigation();
    return (
        <View style={headerStyles.container}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Entypo name="menu" size={32} color="black" />
            </TouchableOpacity>
            <View>
                <Text style={headerStyles.title}>Locality</Text>
            </View>
        </View>
    )
}

const headerStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 28,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        elevation: 10,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        fontSize:'36px',
        color: 'green'
    }
});