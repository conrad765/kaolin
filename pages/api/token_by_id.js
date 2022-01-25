import nc from 'next-connect'
import path from 'path'
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
  const dirRelativeToPublicFolder = 'assets'
  const dir = path.resolve('./public', dirRelativeToPublicFolder)
  const filenames = fs.readdirSync(dir)
  // console.log(process.cwd,'process');
  // console.log(path.join(process.cwd(), 'data/data.json'),'hello')
  const rarityFile=path.join(process.cwd(), dirRelativeToPublicFolder, filenames[0])
  const metadataFile = path.join(process.cwd(), dirRelativeToPublicFolder, filenames[1])
  // console.log(rarityFile, 'filenames');
  
  
  fs.readFile(rarityFile, 'utf8',  (err, data) => {
    if (err) {
      console.error(err, 'error')
      return res.json(err)
    }

    const allNft = JSON.parse(data)

    const { id } = req.body
    for (var i = 0; i < allNft.rarity.length; i++){
      var item = allNft.rarity[i];
      if (item.name.substr(13) == id) {
        fs.readFile(
          metadataFile,
          'utf8',
          (err, data2) => {
            if (err) {
              console.error(err, 'error')
              return res.json(err)
            }
            // "(.*?)": \{
            //Use above regex to convert quoted string to space
            const nftdetails = JSON.parse(data2)
            for (var j = 0; j < nftdetails.length; j++){
              var item2 = nftdetails[j];
              if (item2.name.substr(13) == id) {
                item.imageLink = item2.imageLink
                 res.status(200).send(item)
                break;
                
              }
            }
          }
        )
        break;
      } else {
      }
    }
  })
})

export default handler
