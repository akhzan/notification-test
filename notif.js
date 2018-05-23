const express = require('express')
var webPush = require('web-push')

const app = express()

var publicKey =
  'BOONgbA1ZayXMs0CndLWco7Y5it8JFRqrAsGuARoqnB426GXBYnySfw0HOabKMf88LRdPwdz76NhFbtvqkXOIJs'
var privateKey = 'PGA-MVg1_f_4SpBEIUcj7nFmzAtetus0MPG-K_FLTxM'

var pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/fUHaCIQzXTc:APA91bEKw4Ak0dBmpP8hkqLjin7pEa9iaP-q92TA3rvpwDnDoF8NNOlzyplQNsVqRmWW-cho3hbOD3LQhDTGKjghw_FWTDySX0XEqeudwGzD4APhSs5KeOqzJRnVJaZOShzR5bzlija8',
  keys: {
    p256dh:
      'BIxwat3EAYKKN45h9qFSLcga3vpfVra_fTl59JLs1iMaFLP-sd39pL1e09wj_XFbrUIB06moTRtHLMOd0VjRXIc',
    auth: 'wGREPH_IyWZp5vkeQkw3Pg',
  },
}

var payload = 'Here is a payload!'

var options = {
  vapidDetails: {
    subject: 'http://localhost:5000',
    publicKey,
    privateKey,
  },
  gcmAPIKey: 'AIzaSyBB9X_9PPRPGykUA151DGyMUNvx_xpFkMc',
  TTL: 60,
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(9010, () => {
  mainApp()
})

function mainApp() {
  webPush
    .sendNotification(pushSubscription, payload, options)
    .then(e => console.log('done: ', e))
    .catch(e => console.log(e))
}

function generateAndPrintVAPIDKeys() {
  function generateVAPIDKeys() {
    const vapidKeys = webPush.generateVAPIDKeys()

    return {
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey,
    }
  }
  console.log(generateVAPIDKeys())
}
