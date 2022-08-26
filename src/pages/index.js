const files = require.context('.', false, /\.vue$/)
const pages = files.keys().map((key) => files(key).default)
pages.sort((a, b) => a.index - b.index)
export default pages