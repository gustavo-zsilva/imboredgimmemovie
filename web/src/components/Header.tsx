import { MdOutlineMovie } from 'react-icons/md'

import { Flex, Text, Button } from "@chakra-ui/react";
import { BuyMeACoffee } from './BuyMeACoffee';
import { useAuth } from '../hooks/useAuth';

export function Header() {
    const { signInWithGoogle } = useAuth()

    return (
        <Flex gridArea="Header" alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" display="flex" alignItems="center" gridGap=".4rem">
                imboredgimmemovie
                <MdOutlineMovie />
            </Text>
            <Flex>
                <Button onClick={signInWithGoogle}>
                    Sign in with Google
                </Button>
                <BuyMeACoffee />
            </Flex>
        </Flex>
    )
}