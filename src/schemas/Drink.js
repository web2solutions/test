// import voodux
const voodux = require('voodux')




const schema = new voodux.Foundation.Schema({
    "idDrink": {
        type: String,
        required: true,
        index: true
    },
    "strDrink": {
        type: String,
        required: true,
        index: true
    },
    "strTags": {
        type: String,
        index: true,
        default: ''
    },
    "strCategory": {
        type: String,
        required: true,
        index: true
    },
    "strIBA": {
        type: String,
        index: true,
        default: ''
    },
    "strAlcoholic": {
        type: String,
        required: true,
        index: true
    },
    "strGlass": {
        type: String,
        required: true,
        index: true
    },
    "strInstructions": {
        type: String,
        index: true
    },
    "strInstructionsES": {
        type: String,
        index: true
    },
    "strInstructionsDE": {
        type: String,
        index: true
    },
    "strInstructionsFR": {
        type: String,
        index: true
    },
    "strInstructionsIT": {
        type: String,
        index: true
    },
    "ingredients": {
        type: [],
        required: true,
        index: true,
        default: []
    }
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
