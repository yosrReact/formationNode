const http = require("http")
require("dotenv-flow").config()
const app = require("./app")
console.log(process.env.NODE_ENV, process.env.PORT)
const port = process.env.PORT || 5000
app.set("port", port)
const server = http.createServer(app)
server.listen(port, () => {
  const address = server.address()
  console.log("Listening on " + port)
})
