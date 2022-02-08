import { ReactNode } from 'react'
import { BiSad, BiSmile, BiWinkSmile, BiHappyHeartEyes } from 'react-icons/bi'
import { MdOutlineSentimentNeutral } from 'react-icons/md'
import { Flex, Text } from "@chakra-ui/react"
import { useMovie } from '../hooks/useMovie'

type RatingMarkerProps = {
    offset: number,
}

type MovieRating = {
    bg: string,
    message: string,
    icon: ReactNode,
}

type MovieRatings = Record<number, MovieRating>

export function RatingMarker({ offset }: RatingMarkerProps) {

    const { movie } = useMovie()
    const movieRatings: MovieRatings = {
        0: {
            bg: 'red.400',
            message: 'Nope.',
            icon: <BiSad size={32} />,
        },
        2: {
            bg: 'orange.400',
            message: 'This movie has kinda of a low rating, but who am I to judge?',
            icon: <MdOutlineSentimentNeutral size={32} />,
        },
        5: {
            bg: 'yellow.400',
            message: 'Perfectly balanced, as everything should be.',
            icon: <BiWinkSmile size={32} />,
        },
        6: {
            bg: 'green.400',
            message: 'Good movie, worth watching!',
            icon: <BiSmile size={32} />,
        },
        9: {
            bg: 'linear-gradient(0deg, #ff096f 0%, #ffc118 80%)',
            message: 'Probably the greatest movie ever.',
            icon: <BiHappyHeartEyes size={32} />,
        }
    }

    const rating = Object.keys(movieRatings).map(rating => {
        if (Number(rating) > movie.vote_average) return
        return rating
    })
    .filter(Boolean)
    .reverse()
    [0]

    const marker = movieRatings[Number(rating)]
    
    return (
        <Flex
            flexDir="column"
            bg={marker.bg}
            p=".6rem"
            borderRadius="6px 6px 6px 0"
            pos="absolute"
            top="-10"
            transform="auto"
            translateX={offset}
            overflow="hidden"
            w="50px"
            maxW="20rem"
            h="50px"
            cursor="pointer"
            justifyContent="baseline"
            _hover={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 'auto',
                height: 'auto',
                top: "-20",
            }}
        >
            <Flex mb=".2rem">
                {marker.icon}
            </Flex>
            <Text textAlign="center">{marker.message}</Text>
        </Flex>
    )
}