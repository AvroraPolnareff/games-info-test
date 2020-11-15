import Axios from "axios";

const API_KEY = process.env.RAWG_API_KEY

const axios = Axios.create({
  baseURL: "https://api.rawg.io/api",
  params: API_KEY && {key: API_KEY}
})

/**
 * search
 * Wrapper of api/games
 * @param {number} [page]
 * @param {string} [search]
 * @param {string} [sort]
 * @param {string[]} [platforms]
 * @returns {Promise<Game[]>}
 */
export async function fetchGames(page, search, sort, platforms) {
  let params = {
    page_size: 20,
    page: page
  }
  console.log(page, search, sort, platforms)
  if (search) params.search = search
  if (sort) params.ordering = sort
  if (platforms.length) params.platforms = platforms.join(",")

  const response = await axios.get('/games', {params})
  console.log(response)

  return response.data.results.map(game => ({
    id: game.id,
    slug: game.slug,
    title: game.name,
    thumbnail: game.background_image && cropImageUrl(game.background_image, 600, 400),
    rating: game.rating,
    platforms: transformPlatforms(game.platforms),
    releaseDate: game.released && transformDate(game.released)
  }))
}

/**
 * fetch detailed info of the game
 * @param {number} id
 * @return DetailedGame
 */
export async function fetchGame(id) {
  const response = await axios.get(`/games/${id}`)
  const screenshotResponse = await axios.get(`/games/${id}/screenshots`)
  const game = response.data
  const screenshots = screenshotResponse.data.results.map(screenshot => ({
    id: screenshot.id,
    full: screenshot.image,
    mini: resizeImage(screenshot.image, 420),
  }))
  return {
    id: game.id,
    slug: game.slug,
    platforms: transformPlatforms(game.platforms),
    released: game.released && transformDate(game.released),
    description: game.description,
    background: game.background_image,
    title: game.name,
    metacritic: game.metacritic,
    rating: game.rating,
    website: game.website,
    screenshots: screenshots
  }
}

/**
 * Wrapper of api/platforms
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
 * get cropped image from server
 * @param {string} url
 * @param {number} width
 * @param {number} height
 * @return string
 */
function cropImageUrl(url, width, height) {
  const baseUrl = "https://media.rawg.io/media/"
  const restUrl = url.slice(baseUrl.length)
  return `${baseUrl}crop/${width}/${height}/${restUrl}`
}

/**
 * get cropped image from server
 * @param {string} url
 * @param {number} [width]
 * @param {number} [height]
 * @return string
 */
function resizeImage(url, width, height) {
  const baseUrl = "https://media.rawg.io/media/"
  const restUrl = url.slice(baseUrl.length)
  return `${baseUrl}resize/${width ?? "-"}/${height ?? "-"}/${restUrl}`
}

function transformPlatforms(platforms) {
  return platforms.map(({platform}) => ({name: platform.name, id: platform.id}))
}

function transformDate(date) {
  return date.split('-').reverse().join('.')
}


