module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com']
  },
  env: {
    API_KEY: process.env.API_KEY,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  }
}
