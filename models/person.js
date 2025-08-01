const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.set('runValidators', true)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numChecker = (number) => {
  if (!(number.includes('-')) || number.includes('abcdefghijklmnopqrstuvwxyz')) {
      return false
  } else if ((number.split('').filter(x => x === '-').length > 1)) {
      return false
  }
  const array = number.split('-')
  if ((array[0].length === 2 || array[0].length === 3)) {
      return true
  }
  return false
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: numChecker,
      message: 'Number has to be seperated by - (no more than 1), must not include letters and finally, the first part can have either two or three numbers and the second part has to also consist of numbers'
    },
    required: true
  }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)