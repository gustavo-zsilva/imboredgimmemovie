import Image from 'next/image'
import { Flex } from "@chakra-ui/react"
import { useMovie } from '../hooks/useMovie'

export function MoviePoster() {

    const { movie } = useMovie()

    return (
        <Flex
            boxShadow="-8px 8px 0 #48327e"
            border="10px solid #fff"
            borderRadius=".2rem"
            overflow="hidden"
        >
            <Image
                width={300}
                height={445}
                src={movie.Poster}
            />
        </Flex>
    )
}