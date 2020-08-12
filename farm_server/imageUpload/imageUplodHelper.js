const util = require('util');
const googlecloudStorage = require('./index');
const bucket = googlecloudStorage.bucket('sime13') ;



const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file
  console.log(file, 'test image ')
  const imageFile = bucket.file(originalname.replace(/ /g, "_"))
  const imageBuilder = imageFile.createWriteStream({
    resumable: false
  })
  imageBuilder.on('finish', () => {
    
    const image_Url = util.format(
      `https://storage.googleapis.com/${bucket.name}/${imageFile.name}`
    )
    resolve(image_Url)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong !!`)
  })
  .end(buffer)
})

module.exports = uploadImage
