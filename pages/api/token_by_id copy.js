import nc from 'next-connect'
import path from 'path'
import axios from 'axios'
const fs = require('fs')
const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
}).post(async (req, res) => {
  axios.get("https://kaolin-nine.vercel.app/assets/rarity.json").then(response => {
    const data = response.data;
    const allNft = data

    const { id } = req.body
    for (var i = 0; i < allNft.rarity.length; i++) {
      var item = allNft.rarity[i]
      if (item.name.substr(13) == id) {
        axios.get("https://kaolin-nine.vercel.app/assets/supersheeparweave.json").then(response2 => {
          const data2 = response2.data
          // "(.*?)": \{
          //Use above regex to convert quoted string to space
          const nftdetails = data2;
          for (var j = 0; j < nftdetails.length; j++) {
            var item2 = nftdetails[j]
            if (item2.name.substr(13) == id) {
              item.imageLink = item2.imageLink
              res.status(200).send(item)
              break
            }
          }
        })
        .catch(err=>console.log(err,'err getting image links'))
        break
      } else {
      }
    }
  })
  .catch(err=>console.log(err,'err getting rarity'))
})

export default handler
