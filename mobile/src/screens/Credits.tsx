import React from 'react'

import { Container, VStack, Divider } from 'native-base'
import { Bubble } from '../components/Bubble'
import { Header } from '../components/Header'

export function Credits() {
    return (
        <Container
            w="100%"
            flex="1"
        >
            <Header>
                credits
            </Header>

            <VStack
                w="100%"
                space="20px"
            >
                <Bubble title="Cast" content="Salve salve galerinha" />
                <Bubble title="Directors" content="Salve salve galerinha" />
                <Bubble title="Producers" content="Salve salve galerinha" />
                <Bubble title="Genres" content="Salve salve galerinha" />
            </VStack>
        </Container>
    )
}