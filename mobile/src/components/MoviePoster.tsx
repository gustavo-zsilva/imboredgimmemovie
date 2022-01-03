import React from 'react'
import { Flex, Text, Image } from "native-base"

export function MoviePoster() {
    return (
        <Flex
            p="8px"
            w="100%"
            bg="primary"
            alignItems="center"
            borderRadius="2px"
            shadow="1"
        >

            <Image
                w="200px"
                h="300px"
                background="#fff"
                alt="Poster"
            />
        </Flex>
    )
}