const files = require.context('.', false, /\.vue$/)
const pages = files.keys().map((key) => files(key).default)
export default pages