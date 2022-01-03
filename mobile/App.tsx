import React from "react";
import {
    NativeBaseProvider,
} from "native-base";

import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import {
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { Routes } from "./src/routes";

import { theme } from './src/styles/theme'

export default function App() {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar style="light" />
            <Routes />
        </NativeBaseProvider>
    );
}
