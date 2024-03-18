const LRUCache = require('lru-cache')
const paths = require('../routing/path')
const fs = require('fs')

const arrayUrlAllowCache = fs.readFileSync(paths.urlToCacheSsr).toString().split("\n")
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 30 // 30 seconds
  })

const getCacheKey = (req) => {
    return req.path
}
const getCache = (key) => {
    return ssrCache.get(key)
}
const setCache = (key , value) => {
    return ssrCache.set(key, value)
}
const resetCache = () => {
    ssrCache.reset()
    return true
}
const isExistCache = (key) => {
    return false
    // return ssrCache.has(key)
}

const isAllowCache = (_url) => {
    return false
}

module.exports = {
    getCacheKey,
    getCache,
    setCache,
    resetCache,
    isAllowCache,
    isExistCache,
}
