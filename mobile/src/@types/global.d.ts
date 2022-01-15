import * as React from 'react'

declare global {
    type RootStackParamList = {
        Credits: undefined,
        ForYou: undefined,
        Liked: undefined,
    }

    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}