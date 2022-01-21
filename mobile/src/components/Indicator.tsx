import React, { useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo'

import { FactoryMotiView } from './FactoryMotiView'
import { useAnimationState, AnimatePresence } from 'moti'
import { Flex, Text, Pressable } from 'native-base'

type IndicatorProps = {
    left: number,
}

export function Indicator({ left }: IndicatorProps) {


    const animationState = useAnimationState({
        closed: {
            width: 75,
            height: 65,
        },
        open: {
            width: 170,
            height: 100,
        }
    })

    function handleOpenIndicator() {
        animationState.transitionTo('open')
    }

    function handleCloseIndicator() {
        animationState.transitionTo('closed')
    }

    return (
        <FactoryMotiView
            alignItems="center"
            // justifyContent="center"
            borderRadius="16px"
            borderBottomLeftRadius="0"
            bg="green.400"
            p="16px"
            position="absolute"
            bottom="100"
            left={left}
            overflow="hidden"
            // from={{
            //     translateX: 0,
            //     opacity: 0,
            // }}
            // animate={{
            //     translateX: left,
            //     opacity: 1,
            // }}
            // transition={{
            //     type: 'timing',
            //     duration: 750,
            // }}
            state={animationState}
            delay={250}
        >
            
            <Pressable onPressIn={handleOpenIndicator} onPressOut={handleCloseIndicator}>

                {({ isPressed }) => (
                    <Flex alignItems="center">
                        <Entypo name="emoji-happy" size={32} color="#FFF" />
                        {isPressed && <Text textAlign="center" mt="4px">Um dos melhores já feitos</Text>}
                    </Flex>
                )}
            </Pressable>
            
        </FactoryMotiView>
    )
}