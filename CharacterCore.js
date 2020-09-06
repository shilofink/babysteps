const  attributes= [6,7,8,9,10,11,12,13,14,15,16,17,18]
const level = 1

async function myFunc() {
    // grabs all races from API
    const apiRaces = await apiAsync('races')

    // grabs random race from APIRACES
    const race= getRandom(apiRaces.results)

    // grabs details from the specific race picked from constant race above
    const raceDetails= await apiAsync(`races/${race.index}`)

    //grabs all class names from API
    const apiClasses = await apiAsync('classes')

    // List of Proficiencies

    // grabs languages from RACEDETAILS
    const languages= raceDetails.languages.map(lan => lan.name)

    // grabs traits of race from RACEDETAILS
    const traits= raceDetails.traits.map(raceTrait => raceTrait.name)

    // grabs random class name from APICLASSES
    const clas= getRandom(apiClasses.results)

    // grabs specific class name from APICLASSES and looks in the INDEX
    const classDetails = await apiAsync(`classes/${clas.index}`)


  


    const skillProficiency = classDetails.proficiency_choices[0]
    const skillProficiency2 = skillProficiency.from
    
    const randomSkill = Math.floor(Math.random() * skillProficiency2.length)

    const skill1 = skillProficiency2.splice(randomSkill, 1)
    const skill2 = skillProficiency2.splice(randomSkill, 1)


    skillProficiency3 = skill1[0].name.substring(7).toLowerCase()
    skillProficiency4 = skill2[0].name.substring(7).toLowerCase()
    console.log(skillProficiency3)
    console.log(skillProficiency4)
    
    
    
    
    
    //inventoryText is unwrapping the name and the quantity
    const inventory = await buildInventory(classDetails.starting_equipment)
    const inventoryText = inventory.map(item => `${item.quantity || 1} ${item.equipment.name}`)
    
    
    const classLevels = await apiAsync(`classes/${clas.index}/levels/${level}`)
    
    generateAttributes() 
   
    
    const proficiencies= classDetails.proficiencies.map(prof => prof.name)
    const savingThrows = classDetails.saving_throws.map(save => save.name)
    
    const profSave1 = document.getElementById(savingThrows.pop())
    profSave1.value = parseInt(profSave1.value) + classLevels.prof_bonus
    const profSave2 = document.getElementById(savingThrows.pop())
    profSave2.value = parseInt(profSave2.value) + classLevels.prof_bonus
    
    document.getElementById("raceInput").value = race.name;
    document.getElementById("classInput").value = clas.name;
    document.getElementById("levelInput").value = level
    //inspiration
    document.getElementById("proficiency").value = classLevels.prof_bonus;
    
    //armor class
    document.getElementById("hitDie").value = hitPointStart(classDetails.hit_die);
    document.getElementById("speed").value = raceDetails.speed;
    
    document.getElementById("features").innerHTML = traits;    
    
    //inventory
    document.getElementById("languages").value  = languages;
    document.getElementById('proficiencies').value = proficiencies
    document.getElementById('inventory').value = inventoryText
    //spells
    const profBonus = document.getElementById("proficiency").value
    document.getElementById(skillProficiency3).value = parseInt(document.getElementById(skillProficiency3).value) + parseInt(profBonus)
    document.getElementById(skillProficiency4).value = parseInt(document.getElementById(skillProficiency4).value) + parseInt(profBonus)
    
}

function hitPointStart(hitDie){
    const con = document.getElementById("constitution").value 
    const conMod = Math.floor((con / 2) - 5)
    const total = hitDie + conMod
    return total
}
function apiAsync(apiUrl) {
    return fetch(`https://www.dnd5eapi.co/api/${apiUrl}`).then(res => res.json())
}
