import { MdOutlineMovie } from 'react-icons/md'

import { Flex, Text } from "@chakra-ui/react";

export function Header() {
    return (
        <Flex gridArea="Header" alignItems="center">
            <Text fontWeight="bold" display="flex" alignItems="center" gridGap=".4rem">
                imboredgimmemovie
                <MdOutlineMovie />
            </Text>
        </Flex>
    )
}