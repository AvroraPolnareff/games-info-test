import Axios from "axios";

const API_KEY = process.env.RAWG_API_KEY

const axios = Axios.create({
  baseURL: "https://api.rawg.io/api",
  params: API_KEY && {key: API_KEY}
})

/**
 * search
 * Wrapper of api/games
 * @param {number?} page
 * @param {string?} search
 * @param {string?} sort
 * @param {string[]?} platforms

 * @returns {Promise<Game[]>}
 */
export async function fetchGames(page, search, sort, platforms) {
  let params = {
    page_size: 20
  }
  if (search) params.search = search
  if (sort) params.sort = sort
  if (platforms) params.platforms = platforms.join(",")

  const response = await axios.get('/games', {params})

  return response.data.results.map(game => ({
    id: game.id,
    title: game.name,
    thumbnail: cropImageUrl(game.background_image),
    rating: game.rating,
    platforms: game.platforms.map(({platform}) => ({name: platform.name, id: platform.id})),
    releaseDate: game.released.split('-').reverse().join('.')
  }))
}

/**
 *
 * @returns {Promise<Platform[]>}
 */
async function fetchPlatforms() {
  const response = await axios.get('/platforms')
  return response.data.results.map(platform => ({
    id: platform.id,
    name: platform.name
  }))
}

/**
 *
 */
function cropImageUrl(url) {
  const baseUrl = "https://media.rawg.io/media/"
  const restUrl = url.slice(baseUrl.length)
  return baseUrl + "crop/600/400/" + restUrl
}



