import React, { useEffect, useState } from 'react'

import { useMovie } from '../hooks/useMovie'

import Entypo from 'react-native-vector-icons/Entypo'

import { FactoryMotiView } from './FactoryMotiView'
import { useAnimationState } from 'moti'
import { Flex, Text, Pressable, Box } from 'native-base'

type MovieRating = {
    bg: string,
    message: string,
    icon: string,
}

type IndicatorProps = {
    left: number,
}

export function Indicator({ left }: IndicatorProps) {

    const { movie } = useMovie()
    const [movieRating, setMovieRating] = useState<MovieRating>({
        bg: 'green.400',
        message: 'Good movie, worth watching!',
        icon: 'happy',
    })
    const animationState = useAnimationState({
        closed: {
            width: 75,
            height: 65,
        },
        open: {
            width: 185,
            height: 120,
        }
    })

    function handleOpenIndicator() {
        animationState.transitionTo('open')
    }

    function handleCloseIndicator() {
        animationState.transitionTo('closed')
    }

    const movieRatings = {
        0: {
            bg: 'red.400',
            message: 'Nope.',
            icon: 'sad',
        },
        2: {
            bg: 'orange.400',
            message: 'This movie has kinda of a low rating, but who am I to judge?',
            icon: 'neutral',
        },
        5: {
            bg: 'yellow.400',
            message: 'Perfectly balanced, as everything should be.',
            icon: 'flirt',
        },
        6: {
            bg: 'green.400',
            message: 'Good movie, worth watching!',
            icon: 'happy',
        },
        9: {
            bg: 'violet.500',
            message: 'Probably the greatest movie ever.',
            icon: 'happy',
        }
    }

    useEffect(() => {
        const movieRatingArr = Object.keys(movieRatings)
            .map(key => {
                if (movie?.vote_average >= Number(key)) {
                    return key
                }
            })
        
        setMovieRating(movieRatings[movieRatingArr.filter(Boolean).reverse()[0]])
    }, [movie])

    return (
        <FactoryMotiView
            alignItems="center"
            justifyContent="center"
            borderRadius="16px"
            borderBottomLeftRadius="0"
            p="16px"
            position="absolute"
            bottom="90"
            overflow="hidden"
            shadow={3}
            bg={movieRating.bg}
            from={{
                translateX: 0,
                opacity: 0,
            }}
            animate={{
                translateX: left,
                opacity: 1,
            }}
            state={animationState}
            delay={250}
        >   
            <Pressable onPressIn={handleOpenIndicator} onPressOut={handleCloseIndicator}>
                {({ isPressed }) => (
                    <Flex alignItems="center">
                        <Entypo name={`emoji-${movieRating.icon}`} size={32} color="#FFF" />
                        {isPressed &&
                        <Text textAlign="center" mt="4px">
                            {movieRating.message}
                        </Text>}
                    </Flex>
                )}
            </Pressable>
        </FactoryMotiView>
    )
}