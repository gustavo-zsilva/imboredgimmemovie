import React from 'react'
import { Flex, Text, ScrollView } from 'native-base'

export function MovieOverview() {
    return (
        <ScrollView
            bg="base.700"
            flex="1"
            p="16px"
            w="100%"
            borderRadius="4px"
        >
            <Text fontSize="16px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ex laudantium eligendi ad aliquam obcaecati asperiores consequuntur nobis minus cupiditate repudiandae minima sit odit tempore laboriosam, dolorem ea, voluptatum porro.
            </Text>
        </ScrollView>
    )
}