import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import { ButtonHTMLAttributes } from "react"

type ButtonProps = ChakraButtonProps

export function Button({ ...props }: ButtonProps) {
    return (
        <ChakraButton
            borderRadius="50%"
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