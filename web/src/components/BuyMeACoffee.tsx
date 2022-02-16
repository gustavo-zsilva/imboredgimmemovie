import { BiCoffeeTogo } from 'react-icons/bi'
import { Link, Button, Tooltip } from '@chakra-ui/react'

export function BuyMeACoffee() {
    return (
        <Button
            variant="ghost"
            _hover={{ bg: "dark.600" }}
            w="45px"
            h="45px"
            borderRadius="50%"
            aria-label="Support Developer"
        >
            <Tooltip
                label="Buy me a coffee!"
                mt=".4rem"
            >
                <Link
                    href="https://www.buymeacoffee.com/gustavozx"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BiCoffeeTogo size={24} />
                </Link>
            </Tooltip>
        </Button>
    )
}