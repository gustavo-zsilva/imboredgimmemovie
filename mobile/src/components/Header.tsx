import React, { ReactNode } from "react";

import { MotiView } from "moti";
import { Row, Text } from 'native-base'

type HeaderProps = {
    children: ReactNode,
}

export function Header({ children }: HeaderProps) {
    return (
        <MotiView
            from={{
                opacity: 0,
                translateY: -15,
            }}
            animate={{
                opacity: 1,
                translateY: 0,
            }}
            transition={{
                type: 'timing',
                duration: 350,
            }}
        >
            <Row p="20px" px="0" alignItems="center" space="8px">
                <Text fontWeight="bold">imboredgimmemovie</Text>
                <Text fontSize="18px">●</Text>
                <Text>{children}</Text>
            </Row>
        </MotiView>
    )
}