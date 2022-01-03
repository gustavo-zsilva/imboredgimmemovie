import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ForYou } from './screens/ForYou'
import { Credits } from './screens/Credits'

export function Routes() {
    const { Screen, Navigator } = createMaterialTopTabNavigator()

    return (
        <NavigationContainer>
            <Navigator initialRouteName="ForYou" screenOptions={{
                tabBarStyle: {
                    display: 'none'
                },
                swipeEnabled: true,
            }}>
                <Screen name="Credits" component={Credits} />
                <Screen name="ForYou" component={ForYou} />
            </Navigator>
        </NavigationContainer>
    )
}