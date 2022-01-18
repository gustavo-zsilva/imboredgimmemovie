import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { Freeze } from 'react-freeze'

import { ForYou } from './screens/ForYou'
import { Credits } from './screens/Credits'
import { Liked } from './screens/Liked'
import { LazyPlaceholder } from './components/LazyPlaceholder'

type RootStackParamList = {
    Credits: undefined,
    ForYou: undefined,
    Liked: undefined,
}

export function Routes() {
    const { Screen, Navigator } = createMaterialTopTabNavigator<RootStackParamList>()
    
    return (
        <NavigationContainer>
            <Navigator initialRouteName="ForYou" screenOptions={{
                tabBarStyle: {
                    display: 'none'
                },
                swipeEnabled: true,
            }}>
                <Screen
                    name="Credits"
                    component={Credits}
                    options={{
                        lazy: true,
                        lazyPlaceholder: LazyPlaceholder
                    }}
                />
                <Screen name="ForYou" component={ForYou} />
                <Screen
                    name="Liked"
                    component={Liked}
                    options={{
                        lazy: true,
                        lazyPlaceholder: LazyPlaceholder
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}