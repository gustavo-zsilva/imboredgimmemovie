import {
    Tooltip as ChakraTooltip,
    TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'

type TooltipProps = ChakraTooltipProps

export function Tooltip({ children, ...props }: TooltipProps) {
    return (
        <ChakraTooltip
            {...props}
            bg="dark.200"
            color="primary.200"
        >
            {children}
        </ChakraTooltip>
    )
}