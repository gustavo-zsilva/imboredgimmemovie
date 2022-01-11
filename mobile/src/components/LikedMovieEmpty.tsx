import React from 'react'

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Flex, Column, Text } from 'native-base'

export function LikedMovieEmpty() {
    return (
        <Flex justifyContent="center" alignItems="center">
            <Icon name="ghost" size={32} color="#F7F4F3" />
            <Text>Looks like nothing is in here.</Text>
        </Flex>
    )
}