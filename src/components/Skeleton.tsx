import { Skeleton as ChakraSkeleton, SkeletonProps as ChakraSkeletonProps } from '@chakra-ui/react'

type SkeletonProps = ChakraSkeletonProps

export function Skeleton({ ...props }: SkeletonProps) {
    return (
        <ChakraSkeleton
            {...props}
            startColor="primary.100"
            endColor="primary.200"
        />
    )
}