const files = require.context('.', false, /\.vue$/)
const pages = files.keys().map((key) => files(key).default)
console.log(pages)
pages.sort((a, b) => a.data().index - b.data().index)
console.log(pages)
export default pages