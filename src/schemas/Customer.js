// import voodux
const voodux = require('voodux')


const schema = new voodux.Foundation.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  address: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  cards: {
    type: [],
    required: true
  }
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
