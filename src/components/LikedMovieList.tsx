import {
    Flex,
    Text,
} from '@chakra-ui/react'

export function LikedMovieList() {
    return (
        <Flex flexDir="column" w="100%" gridGap="1.2rem">
            <Flex
                pos="relative"
                p="1rem"
                borderRadius=".2rem"
                overflow="hidden"
            >
                <Flex
                    bgImage="http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F8HIqpOgqShRc3TAleabnYispDl1.jpg&w=640&q=75"
                    bgPos="center"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    filter="blur(8px)"
                    w="100%"
                    pos="absolute"
                    top="0"
                    bottom="0"
                />
                <Text bg="rgba(49, 47, 47, 0.6)" zIndex="9999" p=".4rem" borderRadius=".2rem">
                    Friday Night Lights
                </Text>
            </Flex>
            
            <Flex
                pos="relative"
                p="1rem"
                borderRadius=".2rem"
                overflow="hidden"
            >
                <Flex
                    bgImage="http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F8HIqpOgqShRc3TAleabnYispDl1.jpg&w=640&q=75"
                    bgPos="center"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    filter="blur(8px)"
                    w="100%"
                    pos="absolute"
                    top="0"
                    bottom="0"
                />
                <Text bg="rgba(49, 47, 47, 0.6)" zIndex="9999" p=".4rem" borderRadius=".2rem">
                    Friday Night Lights
                </Text>
            </Flex>
            <Flex
                pos="relative"
                p="1rem"
                borderRadius=".2rem"
                overflow="hidden"
            >
                <Flex
                    bgImage="http://localhost:3000/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F8HIqpOgqShRc3TAleabnYispDl1.jpg&w=640&q=75"
                    bgPos="center"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    filter="blur(8px)"
                    w="100%"
                    pos="absolute"
                    top="0"
                    bottom="0"
                />
                <Text bg="rgba(49, 47, 47, 0.6)" zIndex="9999" p=".4rem" borderRadius=".2rem">
                    Friday Night Lights
                </Text>
            </Flex>
        </Flex>
    )
}