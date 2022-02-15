const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
        'm.media-amazon.com',
        'image.tmdb.org',
    ]
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
  i18n: {
    defaultLocale: 'us',
    locales: ['us', 'pt', 'fr', 'de'],
  }
})
