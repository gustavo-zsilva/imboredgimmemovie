import { IconButton as ChakraButton, IconButtonProps as ChakraButtonProps } from "@chakra-ui/react"

type ButtonProps = ChakraButtonProps

export function Button({ ...props }: ButtonProps) {
    return (
        <ChakraButton
            isRound
            p="1rem"
            w="4rem"
            h="4rem"
            bg="primary.300"
            transition=".2s"
            _hover={{ filter: 'brightness(0.9)' }}
            {...props}
        />
    )
}