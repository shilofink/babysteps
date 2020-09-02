async function buildInventory(startingEquipmentURL) {
  const chosenInventory = []
  const apiInventoryData = await apiAsync(startingEquipmentURL.substring(5))
  
  //starting equipment
  apiInventoryData.starting_equipment.map(item => {
      chosenInventory.push(item)
    })
    
    //chosen equipment
    const choices = await makeChoices(apiInventoryData.starting_equipment_options)
    choices.map(choice => chosenInventory.push(choice))
    
    return chosenInventory.flat()
}

async function makeChoices(options) {
    const chosenLevelOne = await Promise.all(options.map(async option => {
        const chosenOptions = await chooseFrom(option.choose, option.from)
        return chosenOptions.flat()
    })
    )
    console.log()

  const unwrapped = []
  chosenLevelOne.map(option => {
      option.map(subOption => unwrapped.push(subOption))
  })

  const chosenLevelTwo = await Promise.all(unwrapped.map(async item => {
      if(item.equipment_option){
          const category = item.equipment_option.from
          const url = (category.url === undefined) ? category.equipment_category.url : category.url
          const quantity = item.equipment_option.choose
          return chooseFromCategory(quantity, url.substring(5))
      }
      return item
  }))

  return chosenLevelTwo.flat()
}

function chooseFrom(quantity, optionArray) {
  var numberOfChoices = quantity
  const chosenArray = []

  if (optionArray.equipment_category){       
      return chooseFromCategory(quantity, optionArray.equipment_category.url.substring(5))
  }

  for (numberOfChoices; numberOfChoices > 0; numberOfChoices--){
      chosenArray.push(getRandom(optionArray))
  }

  return chosenArray
}

async function chooseFromCategory(quantity, url){
  var numberOfChoices = quantity
  const fullItemsArray = []
  const categoryArray = await apiAsync(url)
  const chosenFromCategory = []

  for (numberOfChoices; numberOfChoices > 0; numberOfChoices--){
      chosenFromCategory.push(getRandom(categoryArray.equipment))
  }

  const fullItems = chosenFromCategory.map(item => {
      return {
          equipment: item,
          quantity: 1,
      }
  })

  fullItemsArray.push(fullItems)
  return fullItemsArray
}