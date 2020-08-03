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
    const startingEquipmentURL= classDetails.starting_equipment.url
    
    const startingEquipment = await apiAsync(startingEquipmentURL.substring(5))
    
    console.log(startingEquipment.choice_2)
    
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
    document.getElementById('inventory').value = startingEquipment.starting_equipment
    //spells

    generateAttributes()   
}

async function apiAsync(apiUrl) {
    return fetch(`https://www.dnd5eapi.co/api/${apiUrl}`).then(res => res.json())
}
