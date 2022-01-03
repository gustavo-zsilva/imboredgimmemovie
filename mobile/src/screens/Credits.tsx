import React from 'react'

import { Container, VStack } from 'native-base'
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

            <VStack>
                <Bubble content="Salve salve galerinha" />
            </VStack>
        </Container>
    )
}