const  attributes= [6,7,8,9,10,11,12,13,14,15,16,17,18]
const level = 1

async function myFunc() {
    const apiRaces = await apiAsync('races')
    const race= getRandom(apiRaces.results)
    const raceDetails= await apiAsync(`races/${race.index}`)
    const apiClasses = await apiAsync('classes')
    // List of Proficiencies
    const languages= raceDetails.languages.map(lan => lan.name)
    
    const traits= raceDetails.traits.map(raceTrait => raceTrait.name)
    const clas= getRandom(apiClasses.results)
    
    const classDetails = await apiAsync(`classes/${clas.index}`)
    
    const proficiencies= classDetails.proficiencies.map(prof => prof.name)

    //here buildInventory returns full item Objects, since we'll probably use the URLs later
    //inventoryText is unwrapping the name and the quantity
    console.log("class: ", clas)
    const inventory = await buildInventory(classDetails.starting_equipment.url)
    const inventoryText = inventory.map(item => `${item.quantity || 1} ${item.equipment.name}`)
    
    const classLevels = await apiAsync(`classes/${clas.index}/levels/${level}`)
    
    document.getElementById("raceInput").value = race.name;
    document.getElementById("classInput").value = clas.name;
    document.getElementById("levelInput").value = level
    //inspiration
    document.getElementById("proficiency").value = classLevels.prof_bonus;
     //armor class
    document.getElementById("hitDie").value = diceRoll(10);
    document.getElementById("speed").value = raceDetails.speed;

    document.getElementById("features").innerHTML = traits;
    //inventory
    document.getElementById("languages").value  = languages;
    document.getElementById('proficiencies').value = proficiencies
    document.getElementById('inventory').value = inventoryText
    //spells

    generateAttributes()   
}

async function buildInventory(startingEquipmentURL) {
    const chosenInventory = []
    const fullInventory = await apiAsync(startingEquipmentURL.substring(5))
    fullInventory.starting_equipment.map(item => {
        console.log("pushed 0 ", item.equipment.name)
        chosenInventory.push(item) //basic equipment
    })
    // const inventoryAsArray = Object.values(fullInventory)   //just converting from an Object to an Array
    const choices = await makeChoices(fullInventory.starting_equipment_options)
    choices.map(choice => chosenInventory.push(choice))

    return chosenInventory.flat()
}

async function makeChoices(options) {
    const allthethings = await Promise.all( 
        options.map(async choiceArray => {
            if (choiceArray.from.equipment_category) {
                const callResult = await apiAsync(choiceArray.from.equipment_category.url.substring(5))
                const item = {
                    equipment: getRandom(callResult.equipment),
                    quantity: 1
                }
                console.log("pushed 1 ", item.equipment.name)
                return item
            }

            const choice = getRandom(choiceArray.from)
            if (Array.isArray(choice)) { return choice }

            if (choice.equipment){
                console.log("pushed 2 ", choice.equipment.name)
                return choice
            } else if (choice.equipment_option) {
                if (choice.equipment_option.from.equipment_category) {
                    const callResult = await apiAsync(choice.equipment_option.from.equipment_category.url.substring(5))
                    const item = {
                        equipment: getRandom(callResult.equipment),
                        quantity: 1
                    }
                    console.log("pushed 3 ", item.equipment.name)
                    return item
                } else if (Array.isArray(choice.equipment_option.from)){
                    const returnedChoice = getRandom(choice.equipment_option.from)
                    console.log("pushed 4 ", returnedChoice.equipment.name)
                    return returnedChoice
                }
            }
        })
    )
    console.log("make choices returns: ", allthethings)
    return allthethings
}

async function apiAsync(apiUrl) {
    return fetch(`https://www.dnd5eapi.co/api/${apiUrl}`).then(res => res.json())
}
