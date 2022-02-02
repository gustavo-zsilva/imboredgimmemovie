import { useState } from 'react'
import { BiGhost } from 'react-icons/bi'

import { Flex, Text } from '@chakra-ui/react'

type GenreTagProps = {
    name: string,
}

export function GenreTag({ name }: GenreTagProps) {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <Flex
            bg="primary.100"
            zIndex={1}
            h="30px"
            py="15px"
            clipPath="polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)"
            borderRadius="4px"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            flex="1"
            transition=".2s"
            _hover={{
                width: '240px'
            }}
            overflow="hidden"
        >
            {/* <BiGhost size={32} /> */}
            <Text>{name}</Text>
        </Flex>
    )
}