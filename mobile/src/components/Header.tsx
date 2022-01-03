import React, { ReactNode } from "react";
import { HStack, Text } from 'native-base'

type HeaderProps = {
    children: ReactNode,
}

export function Header({ children }: HeaderProps) {
    return (
        <HStack p="20px" px="0" alignItems="center" space="8px">
            <Text fontWeight="bold">imboredgimmemovie</Text>
            <Text fontSize="18px">●</Text>
            <Text>{children}</Text>
        </HStack>
    )
}