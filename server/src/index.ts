import { Request, Response } from 'express'

import puppeteer from 'puppeteer'

export async function getDeepLinks(req: Request, res: Response) {
    
    const { countryCode, movie } = req.query
    
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(`https://www.justwatch.com/${countryCode}/filme/${movie}`)

        const deepLinks = await page.evaluate(() => {
            const providers = []

            const streamDiv = document.querySelector('.price-comparison__grid__row--stream')

            if (!streamDiv) return null

            streamDiv.querySelectorAll('.price-comparison__grid__row__element')
                .forEach(element => {
                    const link = element.querySelector('a').href
                    const name = element.querySelector('img').title

                    providers.push({
                        name,
                        link,
                    })
                })

            return providers
        })

        await browser.close()

        res.json({ status: '201', deepLinks })
    } catch (err) {
        console.error(err)
        res.json({ status: '500', error: err.message })
    }
}