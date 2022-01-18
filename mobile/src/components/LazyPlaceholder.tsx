import React from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FactoryMotiView } from '../components/FactoryMotiView'
import { Container, Text, Flex } from 'native-base'

export function LazyPlaceholder() {
    return (
        <Container>
            <FactoryMotiView
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex="1"
                w="100%"
                from={{
                    rotate: '0deg',
                }}
                animate={{
                    rotate: '360deg',
                }}
                transition={{
                    loop: true,
                    type: 'timing',
                    duration: 1500,
                }}
            >
                <Icon name="movie-roll" size={80} color="#F7F4F3" />
            </FactoryMotiView>
        </Container>
    )
}