const http = require("http")
const app = require("./app")
/*
  app.set('port', 8080) is similar to setting a "variable" named 
  port to 8080, which you can access later on using app.get('port')
*/
const port = process.env.PORT || 5000
app.set("port", port)
const server = http.createServer(app)
server.on("listening", () => {
  const address = server.address()
  const bind = typeof address === "string" ? "pipe " + address : "port " + port
  console.log("Listening on " + bind)
})
server.listen(port)
