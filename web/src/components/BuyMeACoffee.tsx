import { BiCoffeeTogo } from 'react-icons/bi'
import { Link, Button, Tooltip } from '@chakra-ui/react'

export function BuyMeACoffee() {
    return (
        <Button
            variant="ghost"
            w="45px"
            h="45px"
            borderRadius="50%"
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