const races = ["human", "elf", "dwarf", "orc", "halfling"]
const classes = ["fighter", "rogue", "wizard", "cleric", "bard"]
const images = ["Dwarf Bard.jpg","Dwarf Cleric.jpg", "Dwarf Fighter.png", "Dwarf Rogue.png", "Dwarf Wizard.jpg",
"Elf Bard.jpg", "Elf Cleric.jpg", "Elf Fighter.png", "Elf Rogue.jpg", "Elf Wizard.png", 
"Halfling Bard.jpg", "Halfling Cleric.png", "Halfling Fighter.jpg", "Halfling Rogue.jpg", "Halfling Wizard.jpg",  
"Human Bard.png", "Human Cleric.jpg", "Human Fighter.jpg", "Human Rogue.jpg", "Human Wizard.jpg",
"Orc Bard.jpg", "Orc Cleric.png","Orc Fighter.png", "Orc Rogue.jpg", "Orc Wizard.jpg"]
const  attributes= [6,7,8,9,10,11,12,13,14,15,16,17,18]
const level = 1

function imgSel(race,clas) {
    if (race==="Dwarf"){
        if (clas==="Bard") {
            return images[0]
            }
        if (clas==="Cleric") {
            return images[1]
            }
        if (clas==="Fighter") {
            return images[2]
            }
        if (clas==="Rogue") {
            return images[3]
            }
        if (clas==="Wizard") {
            return images[4]
            }
        }

        if (race==="Elf"){
        if (clas==="Bard") {
            return images[5]
                }
        if (clas==="Cleric") {
            return images[6]
            }
        if (clas==="Fighter") {
            return images[7]
            }
        if (clas==="Rogue") {
            return images[8]
            }
        if (clas==="Wizard") {
            return images[9]
            }
        }
    
    if (race==="Halfling"){
        if (clas==="Bard") {
            return images[10]
        }
        if (clas==="Cleric") {
            return images[11]
        }
        if (clas==="Fighter") {
            return images[12]
        }
        if (clas==="Rogue") {
            return images[13]
        }
        if (clas==="Wizard") {
            return images[14]
        }
    }

    if (race==="Human"){
        if (clas==="Bard") {
            return images[15]
        }
        if (clas==="Cleric") {
            return images[16]
        }
        if (clas==="Fighter") {
            return images[17]
        }
        if (clas==="Rogue") {
            return images[18]
        }
        if (clas==="Wizard") {
            return images[19]
        }
    }

    if (race==="Orc"){
    if (clas==="Bard") {
        return images[20]
        }
    if (clas==="Cleric") {
        return images[21]
        }
    if (clas==="Fighter") {
        return images[22]
        }
    if (clas==="Rogue") {
        return images[23]
        }
    if (clas==="Wizard") {
        return images[24]
        }
    }
}

function getRandom(array) {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}

function diceRoll(planesInteger) {
    return Math.floor((Math.random() * planesInteger) + 1); 
}

function skills(attributes) {
    const attNumbers = attributes.map(modifier => modifier.value)
    const mods = attNumbers.map(modifier => {
        return Math.floor((modifier / 2) - 5)
    })
    const strengthInputs = Array.from(document.getElementById("skill").querySelectorAll("#strength"))
    strengthInputs.map(skill => skill.value = mods[0])
    const dexterityInputs = Array.from(document.getElementById("skill").querySelectorAll("#dexterity"))
    dexterityInputs.map(skill => skill.value = mods[1])
    const intelligenceInputs = Array.from(document.getElementById("skill").querySelectorAll("#intelligence"))
    intelligenceInputs.map(skill => skill.value = mods[2])
    const wisdomInputs = Array.from(document.getElementById("skill").querySelectorAll("#wisdom"))
    wisdomInputs.map(skill => skill.value = mods[4])
    const charismaInputs = Array.from(document.getElementById("skill").querySelectorAll("#charisma"))
    charismaInputs.map(skill => skill.value = mods[5])
}

async function myFunc() {
    const apiRaces = await apiAsync('races')
    const race= getRandom(apiRaces.results)
    const raceDetails= await apiAsync(`races/${race.index}`)
    const apiClasses = await apiAsync('classes')
    const languages= raceDetails.languages.map(lan => lan.name)
    const traits= raceDetails.traits.map(raceTrait => raceTrait.name)
    const clas= getRandom(apiClasses.results)
    
    const classDetails = await apiAsync(`classes/${clas.index}`)
    
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
    document.getElementById("languages").value = languages;
    //spells
    
    document.getElementById('divImage').innerHTML=
        `<img src="Dudes/${imgSel(race, clas)}" width="200" height="200">`;

    const elements = document.getElementById("attributeNumbers").querySelectorAll("input")
    const attributeList= Array.from(elements)
    
    attributeList.map(formStuff => {
        formStuff.value= getRandom(attributes) 
    })   
    modifiers(attributeList) 
    skills(attributeList)
}

function modifiers(attributes) {
    const attNumbers = attributes.map(saves => saves.value)
    const mods = attNumbers.map(saves => {
        return Math.floor((saves / 2) - 5)
    })

    const inputs = Array
        .from(document.getElementById("saves")
        .querySelectorAll("input"))

    mods.map(modNumber => {
        inputs[0].value = modNumber; 
        inputs.shift();
    }) 

    const profSaveStr = document.getElementById("strength")
    profSaveStr.value = parseInt(profSaveStr.value) + 2
    const profSaveDex = document.getElementById("dexterity");
    profSaveDex.value = parseInt(profSaveDex.value) + 2
}

async function apiAsync(apiUrl) {
    return fetch(`https://www.dnd5eapi.co/api/${apiUrl}`).then(res => res.json())
}
