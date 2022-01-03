import React from 'react'
import { Flex, Text, Box, HStack } from 'native-base'

type BubbleProps = {
    content: string,
}

export function Bubble({ content }: BubbleProps) {
    return (
        <Flex
            p="8px"
            pb="14px"
            bg="primary"
            w="100%"
            borderRadius="2px"
        >
            <HStack alignItems="center" space="6px" mb="2px">
                <Box h="2px" bg="white.100" flex="1" />
                <Text fontSize="20px" fontWeight="bold" textAlign="center">Cast</Text>
                <Box h="2px" bg="white.100" flex="1" />
            </HStack>

            <Text textAlign="center" mx="2px">
                {content}
            </Text>
        </Flex>
    )
}