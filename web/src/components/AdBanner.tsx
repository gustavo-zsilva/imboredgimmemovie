import { useEffect } from "react"

export function AdBanner() {

    useEffect(() => {
        const ads = document.getElementsByClassName("adsbygoogle").length
        for (var i = 0; i < ads; i++) {
            try {
                (window['adsbygoogle'] = window['adsbygoogle'] || []).push({})
            } catch (err) {
                console.error(err)
            }
        }
    }, [])

    return (
        <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3387939318475982"
            data-ad-slot="1273010104"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    )
}