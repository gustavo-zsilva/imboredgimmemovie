import React from 'react'

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Flex, Text } from 'native-base'

export function LikedMovieEmpty() {
    return (
        <Flex alignItems="center" m="auto">
            <Icon name="ghost" size={32} color="#F7F4F3" />
            <Text mt="12px">Looks like nothing is here.</Text>
        </Flex>
    )
}