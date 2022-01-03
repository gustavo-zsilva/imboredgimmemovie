import React from 'react'
import { HStack, Text, Divider } from 'native-base'

export function MovieHeader() {
    return (
        <HStack alignItems="center" p="20px" px="0" space="8px">
            <Text fontSize="22px" fontWeight="bold">Title</Text>
            <Divider flex="1" thickness="2" />
            <Text
                bg="base.700"
                p="6px"
                px="12px"
                borderRadius="2px"
            >
                2021 | 120 min
            </Text>
        </HStack>
    )
}