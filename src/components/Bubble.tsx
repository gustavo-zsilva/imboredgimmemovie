import { Flex, Text } from '@chakra-ui/react'

type BubbleProps = {
    title: string,
    description: string,
}

export function Bubble({ title, description }: BubbleProps) {
    return (
        <Flex
            bg="primary.700"
            p="1rem"
            borderRadius=".8rem"
            gridGap=".6rem"
            flexDir="column"
            h="fit-content"
            w="20rem"
            _odd={{ pb: '3rem' }}
            _even={{ transform: 'translateY(-25%) translateX(35%)', boxShadow: '-6px -6px #3c5fd4' }}
        >
            <Text fontSize="1.2rem" fontWeight="bold">{title}</Text>
            <Text ml=".8rem">{description}</Text>
        </Flex>
    )
}