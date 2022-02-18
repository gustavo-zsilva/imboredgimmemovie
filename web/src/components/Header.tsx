import dynamic from 'next/dynamic'
import { MdOutlineMovie } from 'react-icons/md';

import { BuyMeACoffee } from './BuyMeACoffee';
// Dynamic Import (code splitting) - Performance
const UserMenu = dynamic(() => import('./UserMenu').then(mod => mod.UserMenu))
import { Config } from './Config';
import { useAuth } from '../hooks/useAuth';
// import { motion } from 'framer-motion';
import {
    Flex,
    Text,
    Button,
    chakra,
} from "@chakra-ui/react";

export function Header() {
    const { user, signInWithGoogle } = useAuth()

    // const FactoryMotion = chakra(motion.div)

    return (
        <Flex
            display="flex"
            gridArea="Header"
            alignItems="center"
            justifyContent="space-between"
            // initial={{ translateY: -50, opacity: 0 }}
            // animate={{ translateY: 0, opacity: 1 }}
            // transition={{ ease: 'easeOut' }}
            // transitionDelay="2"
        >
            <Text fontWeight="bold" display="flex" alignItems="center" gridGap=".4rem">
                imboredgimmemovie
                <MdOutlineMovie />
            </Text>
            <Flex alignItems="center" gridGap="1rem">
                <BuyMeACoffee />
                <Config />
                {user ? (
                    <UserMenu />
                ) : (
                    <Button
                        onClick={signInWithGoogle}
                        bg="dark.700"
                        _hover={{ bg: "dark.600" }}
                        fontSize={{
                            sm: '75%',
                            md: 'initial',
                        }}
                        p={{
                            sm: '.5rem',
                            md: '1rem',
                        }}
                    >
                        Sign in with Google
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}