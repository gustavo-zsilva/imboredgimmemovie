import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import {
    Button,
    Flex,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    MenuItem,
    SkeletonCircle,
    Avatar,
} from "@chakra-ui/react";

export function UserMenu() {
    const { user, signOut } = useAuth()

    return (
        <Menu placement="bottom" colorScheme="blue">
            <MenuButton
                as={Button}
                variant="unstyled"
                w="50px"
                h="50px"
                overflow="hidden"
                borderRadius="50%"
                bgGradient="linear(to-t, secondary.200, secondary.400)"
                p="3px"
            >
                <SkeletonCircle
                    isLoaded={!!user.photoURL}
                    size="100%"
                >
                    <Avatar
                        src={user.photoURL}
                        alt={user.displayName}
                        borderRadius="50%"
                        objectFit="contain"
                        border="3px solid"
                        borderColor="dark.100"
                        size="100%"
                    />
                </SkeletonCircle>
            </MenuButton>
            <MenuList>
                <Flex flexDir="column" textAlign="center" m="1rem">
                    <Text fontSize=".8rem">logged as</Text>
                    <Text fontSize="1.2rem" fontWeight="bold">{user.displayName}</Text>
                    <Text fontSize=".9rem" mt=".6rem">{user.email}</Text>
                </Flex>
                <MenuDivider />
                <MenuItem icon={<FiLogOut size={18} />} onClick={signOut}>Sign Out</MenuItem>
            </MenuList>
        </Menu>
    )
}