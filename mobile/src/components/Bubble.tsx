import React from 'react'
import { Flex, Text, Box, Row } from 'native-base'

type BubbleProps = {
    title: string,
    content: string,
}

export function Bubble({ title, content }: BubbleProps) {
    return (
        <Flex
            p="8px"
            pb="14px"
            bg="primary"
            borderRadius="2px"
            shadow="6"
            mb="20px"
        >
            <Row alignItems="center" space="6px" mb="2px">
                <Box h="2px" bg="white.100" flex="1" />
                <Text fontSize="20px" fontWeight="bold" textAlign="center">
                    {title}
                </Text>
                <Box h="2px" bg="white.100" flex="1" />
            </Row>

            <Text textAlign="center" mx="2px">
                {!content ? `There are no ${title.toLowerCase()} currently.` : content}
            </Text>
        </Flex>
    )
}