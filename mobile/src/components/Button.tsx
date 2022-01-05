import React, { ButtonHTMLAttributes } from 'react'
import { Button as NativeButton, IButtonProps } from "native-base"

type ButtonProps = IButtonProps

export function Button({ ...props }: ButtonProps) {
    return (
        <NativeButton
            w="50px"
            h="50px"
            borderRadius={50}
            bg="white.100"
            color="base.700"
            _pressed={{ bg: "white.200" }}
            {...props}
        />
    )
}