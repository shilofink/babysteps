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
    const inventory = await buildInventory(classDetails.starting_equipment.url)
    const inventoryText = inventory.map(item => `${item.quantity} ${item.item.name}`)
    
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
    const inventoryAsArray = Object.values(fullInventory)   //just converting from an Object to an Array

    //if lines 51-55 don't make sense no worries, i can explain later
    const choices = inventoryAsArray.filter(entry => {
        try {
            return entry[0].choose
        } catch(error){}
    })    

    //the .push function just adds whatever is inside the parantheses to the array, in this case chosenInventory
    choices.map(category => {
        const choice = getRandom(category).from
        chosenInventory.push(getRandom(choice))
    })

    return chosenInventory
}

async function apiAsync(apiUrl) {
    return fetch(`https://www.dnd5eapi.co/api/${apiUrl}`).then(res => res.json())
}
