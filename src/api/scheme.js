/**
 * Game Type Definition
 * @typedef {Object} Game
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} thumbnail
 * @property {number} rating
 * @property {string} releaseDate
 * @property {Array<Platform>} platforms
 */

/**
 * Platform
 * @typedef {Object} Platform
 * @property {string} name,
 * @property {number} id
 */

/**
 * Detailed Game
 * @typedef {Object} DetailedGame
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {number} [metacritic]
 * @property {string} [released]
 * @property {string} [background]
 * @property {string} website
 * @property {number} rating
 * @property {Screenshot[]} screenshots
 * @property {Platform[]} platforms
 */

/**
 * Screenshot
 * @typedef {Object} Screenshot
 * @property {number} id
 * @property {string} full - fullsize image
 * @property {string} mini - resized image
 */

