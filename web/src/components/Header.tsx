import { MdOutlineMovie } from 'react-icons/md'

import { BuyMeACoffee } from './BuyMeACoffee';
import { useAuth } from '../hooks/useAuth';
import { Flex, Text, Button, Image, SkeletonCircle } from "@chakra-ui/react";

export function Header() {
    const { user, signInWithGoogle, signOut } = useAuth()
    console.log(user?.photoURL)

    return (
        <Flex gridArea="Header" alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" display="flex" alignItems="center" gridGap=".4rem">
                imboredgimmemovie
                <MdOutlineMovie />
            </Text>
            <Flex alignItems="center" gridGap="1rem">
                <BuyMeACoffee />
                {user ? (
                    <Button
                        variant="unstyled"
                        w="50px"
                        h="50px"
                        overflow="hidden"
                        borderRadius="50%"
                        bg="primary.100"
                        p="3px"
                        onClick={signOut}
                    >
                        <SkeletonCircle
                            isLoaded={!!user.photoURL}
                            size="100%"
                        >
                            <Image
                                src={user.photoURL}
                                alt={user.displayName}
                                borderRadius="50%"
                                objectFit="contain"
                                border="3px solid"
                                borderColor="dark.100"
                            />
                        </SkeletonCircle>
                    </Button>
                ) : (
                    <Button onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}