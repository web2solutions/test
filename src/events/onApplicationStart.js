/* global */

const getListOfDrinks = async () => {
  return new Promise((resolve, reject) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
      .then(response => response.json())
      .then(data => resolve(data));
  })
}


const getDrink = async (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => resolve(data))
  })
}

const formatDrink = (d) => {
  const drink = {...d}
  return {
    "idDrink": drink.idDrink,
    "strDrink": drink.strDrink,
    "strTags": drink.strTags || '',
    "strCategory": drink.strCategory,
    "strIBA": drink.strIBA || '',
    "strAlcoholic": drink.strAlcoholic,
    "strGlass": drink.strGlass || '',
    "strInstructions": drink.strInstructions || '',
    "strInstructionsES": drink.strInstructionsES || '',
    "strInstructionsDE": drink.strInstructionsDE || '',
    "strInstructionsFR": drink.strInstructionsFR || '',
    "strInstructionsIT": drink.strInstructionsIT || '',
    "ingredients": []
  }
}


const addDrinksToDb = async (Drink) => {
  const drinksListResponse = await getListOfDrinks()
  // console.log('drinksListResponse', drinksListResponse.drinks)
  const drinksToDrink = []
  for (let x = 0; x < drinksListResponse.drinks.length; x++) {
    const drink = drinksListResponse.drinks[x]
    drinksToDrink.push(drink.idDrink)
  }

  return Promise.all(drinksToDrink.map(idDrink => {
      return Promise.resolve(getDrink(idDrink))
    }))
    .then(drinks => {
      const newDocuments = []
      drinks.forEach(objDrink => {
        const drink = objDrink.drinks[0]
        // console.log(drink)
        const newDrink = formatDrink(drink)
        for (let x = 1; x <= 15; x++) {
          const fieldName = `strIngredient${x}`
          if (drink[fieldName]) {
            newDrink.ingredients.push(drink[fieldName])
          }
        }
        newDocuments.push(newDrink)
      })

      return Promise.all(newDocuments.map(drink => {
          // console.log('adding drink', drink)
          return Promise.resolve(Drink.add(drink))
        }))
        .then(responses => {
          console.log(responses)
          return responses
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

export default function onApplicationStart (eventObj) {
  ; (async () => {
    const { /* data, */ foundation, error } = eventObj
    if (error) {
      throw new Error(`Error starting foundation stack: ${error}`)
    }
    const { User, Product, Drink } = foundation.data

    const cDrinks = await Drink.count()
    if (cDrinks.data < 1) {
      await addDrinksToDb(Drink)

      const Eduardo = await User.add({
        name: 'Eduardo Almeida',
        username: 'web2'
      })
      console.debug('Eduardo', Eduardo)

      const Volvo = await Product.add({
        name: 'Volvo XC90',
        vendor: 'Volvo',
        price_cost: 150000
      })

      console.debug('Volvo', Volvo)
    }
  })()
}
