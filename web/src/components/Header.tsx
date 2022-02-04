import { MdOutlineMovie } from 'react-icons/md'

import { Flex, Text } from "@chakra-ui/react";
import { BuyMeACoffee } from './BuyMeACoffee';

export function Header() {
    return (
        <Flex gridArea="Header" alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" display="flex" alignItems="center" gridGap=".4rem">
                imboredgimmemovie
                <MdOutlineMovie />
            </Text>
            <Flex>
                <BuyMeACoffee />
            </Flex>
        </Flex>
    )
}