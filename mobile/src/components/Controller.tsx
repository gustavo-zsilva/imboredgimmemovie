import React from 'react'

import { Button } from './Button'

import FiIcon from 'react-native-vector-icons/Feather'
import AiIcon from 'react-native-vector-icons/AntDesign'
import { HStack } from 'native-base'

export function Controller() {
    return (
        <HStack
            justifyContent="center"
            alignItems="center"
            space="10px"
            mt="20px"
            bg="base.700"
            w="100%"
            p="10px"
            borderRadius="4px"
        >
            <Button bg="secondary.100" _pressed={{ bg: 'secondary.200' }}>
                <AiIcon name="hearto" size={25} color="#F7F4F3" />
            </Button>
            <Button w="65px" h="65px">
                <FiIcon name="shuffle" size={32} />
            </Button>
            <Button>
                <FiIcon name="repeat" size={25} />
            </Button>
        </HStack>
    )
}