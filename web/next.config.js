module.exports = {
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
    defaultLocale: 'en',
    locales: ['en', 'pt'],
  }
}
