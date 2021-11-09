import Image from 'next/image'
import { Flex } from "@chakra-ui/react"
import { useMovie } from '../hooks/useMovie'

export function MoviePoster() {

    const { movie } = useMovie()

    return (
        <Flex
            boxShadow="0 0 5px 5px rgba(0, 0, 0, 0.1)"
            p="6px"
            bg="transparent"
            borderRadius=".2rem"
            overflow="hidden"
            justifyContent="center"
            pos="relative"
        >
            <Flex
                bgImage={movie.Poster}
                bgPos="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                filter="blur(10px)"
                w="100%"
                pos="absolute"
                top="0"
                bottom="0"
            />
            <Flex m=".4rem 0">
                <Image
                    width={300}
                    height={445}
                    src={movie.Poster}
                    alt={movie.Title}
                />
            </Flex>
        </Flex>
    )
}