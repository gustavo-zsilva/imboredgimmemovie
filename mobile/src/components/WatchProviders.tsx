import React, { useEffect, useState } from "react"

import { useMovie } from "../hooks/useMovie"
import { api } from "../services/api"
import axios from 'axios'

import Icon from 'react-native-vector-icons/AntDesign'
import { FactoryMotiView } from "./FactoryMotiView"
import { Row, Image, Text, Flex, Stagger } from "native-base"

type WatchProviderProps = {
    provider_name: string,
    provider_id: number,
    logo_path: string,
}

type RegionProps = {
    country: string,
    countryCode: string,
}

export function WatchProviders() {

    const { movie } = useMovie()
    const [watchProviders, setWatchProviders] = useState<WatchProviderProps[]>([])
    const [userRegion, setUserRegion] = useState<RegionProps>({ country: 'United States', countryCode: 'US' })

    useEffect(() => {
        if (!movie) return

        api.get(`/movie/${movie.id}/watch/providers`)
        .then(response => {
            setWatchProviders(response.data.results[userRegion.countryCode]?.flatrate || [])
        })
        .catch(err => {
            console.error(err)
        })
    }, [movie])

    useEffect(() => {
        axios.get<RegionProps>('http://ip-api.com/json?fields=country,countryCode')
        .then(response => {
            setUserRegion(response.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <Row mb="8px" alignItems="center" flexWrap="wrap">
            <Stagger
                visible={true}
                initial={{
                    opacity: 0,
                    translateY: -30,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0,
                    transition: {
                        type: 'timing',
                        duration: 450,
                        mass: 0.8,
                        stagger: {
                            offset: 30,
                        }
                    }
                }}
            >
                {watchProviders.length > 0 && movie ? watchProviders.map(provider => (
                    <Image
                        key={provider.provider_id}
                        w="45px"
                        h="45px"
                        bg="white.100"
                        mr="12px"
                        mb="12px"
                        borderRadius="2px"
                        source={{ uri: `https://image.tmdb.org/t/p/original${provider.logo_path}` }}
                        alt={provider.provider_name}
                        accessibilityLabel={provider.provider_name}
                    />
                )) : (
                    <Row alignItems="baseline" space="8px" mb="12px">
                        <Icon name="exclamationcircleo" size={24} color="#F7F4F3" />
                        <Text>
                            There are no providers for {userRegion.country}.
                        </Text>
                    </Row>
                )}
            </Stagger>
        </Row>
    )
}