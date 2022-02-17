import { BiCoffeeTogo } from 'react-icons/bi'
import { Link, Tooltip } from '@chakra-ui/react'

export function BuyMeACoffee() {
    return (
        <Tooltip label="Buy me a coffee!">
            <Link
                href="https://www.buymeacoffee.com/gustavozx"
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ bg: "dark.600" }}
                w="45px"
                h="45px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                aria-label="Support Developer"
            >
                <BiCoffeeTogo size={24} />
            </Link>
        </Tooltip>
    )
}