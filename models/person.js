const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.REACT_APP_MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: v => {
        return /\d{2,4}-\d+/.test(v)
      },
      message:'Phonenumber must start with 2 or 3 numbers'
    },
    required: true
  } })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema, 'persons')