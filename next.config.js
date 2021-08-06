module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.themoviedb.org'],
  },
  env: {
    MONGO_URI: "mongodb+srv://moinulMovie:Moinul06101910@cluster1.qnspl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    API_KEY:process.env.API_KEY,
    API_URL : process.env.API_URL,
    IMAGE_BASE_URL : process.env.IMAGE_BASE_URL,
    POSTER_SIZE : process.env.POSTER_SIZE,
  }
}
