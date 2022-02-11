import { MdOutlineMovie } from 'react-icons/md';

import { BuyMeACoffee } from './BuyMeACoffee';
import { UserMenu } from './UserMenu';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import {
    Flex,
    Text,
    Button,
    chakra,
} from "@chakra-ui/react";

export function Header() {
    const { user, signInWithGoogle, signOut } = useAuth()

    const FactoryMotion = chakra(motion.div)

    return (
        <FactoryMotion
            display="flex"
            gridArea="Header"
            alignItems="center"
            justifyContent="space-between"
            initial={{ translateY: -50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            transitionDelay="2"
        >
            <Text fontWeight="bold" display="flex" alignItems="center" gridGap=".4rem">
                imboredgimmemovie
                <MdOutlineMovie />
            </Text>
            <Flex alignItems="center" gridGap="1rem">
                <BuyMeACoffee />
                {user ? (
                    <UserMenu />
                ) : (
                    <Button onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                )}
            </Flex>
        </FactoryMotion>
    )
}