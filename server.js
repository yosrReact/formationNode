const http = require("http")
//createServer accepet un callback qui a comme paramètre la requete et la réponse
const server = http.createServer((req, res) => {
  res.end("Voilà la réponse du serveur !")
})
// si pas de variable d'environnement PORT, on va écouter le port 5000
server.listen(process.env.PORT || 5000)
