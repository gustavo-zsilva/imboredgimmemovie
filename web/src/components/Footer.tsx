import Image from 'next/image'

import { Flex, Text, Link } from '@chakra-ui/react'

export function Footer() {
    return (
        <Flex
            gridArea="Footer"
            py="1rem"
            w="100%"
            maxW="80rem"
            alignItems="center"
            justifyContent="space-between"
            gridGap={{ sm: "2rem", md: "0" }}
            fontSize={{ sm: "90%", md: "initial" }}
        >
            <Flex flexDir="column">
                <Flex alignItems="center" gridGap=".6rem">
                    <Text>Powered by</Text>
                    <Image
                        src="/tmdb-logo.svg"
                        width={100}
                        height={30}
                        alt="TMDB Logo"
                    />
                    <Image
                        src="/justwatch-logo.png"
                        width={100}
                        height={15}
                        alt="JustWatch Logo"
                    />
                </Flex>
                <Text fontSize=".8rem">
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                </Text>
            </Flex>

            <Flex alignSelf="flex-start">
                <Text>
                    Made by {}
                    <Link href="https://github.com/gustavo-zsilva" isExternal>Gustavo Silva</Link>
                </Text>
            </Flex>
        </Flex>
    )
}