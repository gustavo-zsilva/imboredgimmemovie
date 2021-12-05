import { useEffect } from "react"

export function AdBanner() {

    useEffect(() => {
        try {
            (window['adsbygoogle'] = window['adsbygoogle'] || []).push({})
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <ins
            className="adsbygoogle adbanner-customize"
            style={{
                display: "block",
                width: "100%",
                height: "auto",
            }}
            data-ad-client="ca-pub-3387939318475982"
        />
    )
}