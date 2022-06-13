const express = require('express')
const axios = require('axios')

//Cliente ID
const clientID = 'ebd8dc560b46b12bac1a'
//Client Secret
const clientSecret = '2659c13xxxxxxxxxxxxxxxxxx142954ed'

const app = express()
app.use(express.static(__dirname + '/public'))

//Envia uma requisição para solicitar um token
app.get('/oauth/redirect', (req, res) => {

  const requestToken = req.query.code
  axios({
    method: 'post',

    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    //token é devolvido e redireciona
    const accessToken = response.data.access_token
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
})

app.listen(8080)
