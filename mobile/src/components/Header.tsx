import React, { ReactNode } from "react";
import { Row, Text } from 'native-base'

type HeaderProps = {
    children: ReactNode,
}

export function Header({ children }: HeaderProps) {
    return (
        <Row p="20px" px="0" alignItems="center" space="8px">
            <Text fontWeight="bold">imboredgimmemovie</Text>
            <Text fontSize="18px">●</Text>
            <Text>{children}</Text>
        </Row>
    )
}