import React, { useEffect, useState } from 'react'

import { useMovie } from '../hooks/useMovie'
import { Indicator } from './Indicator'

import { AnimatePresence, useAnimationState } from 'moti'
import { FactoryMotiView } from './FactoryMotiView'
import { Row, Box, Text } from 'native-base'

export function MovieRating() {

    const { movie } = useMovie()
    const [layoutWidth, setLayoutWidth] = useState(0)
    const voteAverage = movie?.vote_average * 10 || 0
    const numberWidth = (voteAverage * layoutWidth) / 100

    return (
        <Row w="100%" alignItems="center" position="relative">
            <Indicator left={numberWidth} />
            <Box
                flex="1"
                bg="green.800"
            >
                <Box
                    h="60px"
                    borderRadius="2px"
                    bg="base.700"
                    onLayout={(e) => {
                        setLayoutWidth(e.nativeEvent.layout.width)
                    }}
                >
                    <FactoryMotiView
                        h="100%"
                        bg="primary"
                        borderRadius="2px"
                        shadow="6"
                        from={{
                            width: 0,
                        }}
                        animate={{
                            width: numberWidth,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 750,
                        }}
                        delay={250}
                    />
                </Box>
            </Box>
            
            <FactoryMotiView
                pl="14px"
                from={{
                    opacity: 0,
                    translateY: -30
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                transition={{
                    type: 'timing',
                    duration: 650
                }}
                exit={{
                    opacity: 0,
                    translateY: 30
                }}
            >
                <Text fontSize="28px">
                    {movie?.vote_average.toFixed(1)}
                </Text>
                <Text fontSize="14px" maxW="70px" top="-8px">Average Rating</Text>
            </FactoryMotiView>
        </Row>
    )
}