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

import { MovieProvider } from "./src/contexts/MovieContext";
import { Routes } from "./src/routes";

import { theme, config } from './src/styles/theme'

export default function App() {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <MovieProvider>
            <NativeBaseProvider theme={theme} config={config}>
                <StatusBar style="light" />
                <Routes />
            </NativeBaseProvider>
        </MovieProvider>
    );
}
