const http = require("http")
const app = require("./app")
/*
  app.set('port', 8080) is similar to setting a "variable" named 
  port to 8080, which you can access later on using app.get('port')
*/
const port = process.env.PORT || 5001
app.set("port", port)
const server = http.createServer(app)
server.listen(port, () => {
  const address = server.address()
  console.log("Listening on " + port)
})
