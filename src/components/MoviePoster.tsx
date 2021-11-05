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
        >
            <Flex
                bgImage={movie.Poster}
                filter="blur(10px)"
                w="100%"
            />
            <Flex border="6px solid #312F2F">
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