import { Flex, Text } from '@chakra-ui/react'

type BubbleProps = {
    title: string,
    description: string,
}

export function Bubble({ title, description }: BubbleProps) {
    return (
        <Flex
            bg="primary.100"
            p="1rem"
            borderRadius=".2rem"
            gridGap=".6rem"
            flexDir="column"
            boxShadow="0 0 6px 6px rgba(0, 0, 0, 0.03)"
            w={{
                sm: "100%",
                md: "20rem"
            }}
            textAlign={{
                sm: 'center',
                md: 'initial'
            }}
            _odd={{
                sm: { pb: '1rem' },
                md: { pb: '3rem' }
            }}
            _even={{
                sm: { bg: 'primary.500' },
                md: { transform: 'translateY(-25%) translateX(15%)', bg: 'primary.500' },
                lg: { transform: 'translateY(-25%) translateX(35%)', bg: 'primary.500' },
            }}
        >
            <Text fontSize="1.2rem" fontWeight="bold">{title}</Text>
            <Text ml=".8rem">{description || `There are no ${title.toLowerCase()} currently.`}</Text>
        </Flex>
    )
}