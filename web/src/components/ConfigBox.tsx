import { ReactNode } from "react";
import { Flex, Heading, Text, Select } from "@chakra-ui/react";

type ConfigBoxProps = {
    title: string,
    description: string,
    children: ReactNode,
}

export function ConfigBox({ title, description, children }: ConfigBoxProps) {
    return (
        <Flex flexDir="column" gridGap=".2rem">
            <Heading as="h3" fontSize="1.2rem">
                {title}
            </Heading>
            <Text fontSize=".9rem" opacity=".5">
                {description}
            </Text>
            <Flex mt=".4rem">
                {children}
            </Flex>
        </Flex>
    )
}