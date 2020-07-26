const races = ["human", "elf", "dwarf", "orc", "halfling"]
const classes = ["fighter", "rogue", "wizard", "cleric", "bard"]
const images = ["Dwarf Bard.jpg","Dwarf Cleric.jpg", "Dwarf Fighter.png", "Dwarf Rogue.png", "Dwarf Wizard.jpg",
"Elf Bard.jpg", "Elf Cleric.jpg", "Elf Fighter.png", "Elf Rogue.jpg", "Elf Wizard.png", 
"Halfling Bard.jpg", "Halfling Cleric.png", "Halfling Fighter.jpg", "Halfling Rogue.jpg", "Halfling Wizard.jpg",  
"Human Bard.png", "Human Cleric.jpg", "Human Fighter.jpg", "Human Rogue.jpg", "Human Wizard.jpg",
"Orc Bard.jpg", "Orc Cleric.png","Orc Fighter.png", "Orc Rogue.jpg", "Orc Wizard.jpg"]
const  attributes= [6,7,8,9,10,11,12,13,14,15,16,17,18]
const level = 2

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

async function myFunc() {
    const apiRaces = await apiAsync('races')
    const apiClasses = await apiAsync('classes')
    
    const race= getRandom(apiRaces.results).name
    const clas= getRandom(apiClasses.results).name
    
    document.getElementById("proficiency").value = level;
    document.getElementById("character").innerHTML = race;
    document.getElementById("job").innerHTML = clas;
    document.getElementById('divImage').innerHTML=
        `<img src="Dudes/${imgSel(race, clas)}" width="200" height="200">`;

    const elements = document.getElementById("attributeNumbers").querySelectorAll("input")
    const attributeList= Array.from(elements)
    
    attributeList.map(formStuff => {
        formStuff.value= getRandom(attributes) 
        console.log(formStuff)
    })   
    modifiers(attributeList) 
}

function modifiers(attributes) {
    const attNumbers = attributes.map(saves => saves.value)
    const mods = attNumbers.map(saves => {
        saves = parseInt(saves)
        if (saves >= 10) {
            saves = saves + 1;
        }
        
        saves = (saves - 11)/2;
        return parseInt(saves)
    })
    const inputs = Array.from(document.getElementById("saves").querySelectorAll("input"));
    mods.map(modNumber => {
        inputs[0].value = modNumber; 
        inputs.shift();
    }) 
    // broken, no verlyvkleyr !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const profSaveStr = document.getElementById("strength");
    profSaveStr.value += 2;
    const profSaveDex = document.getElementById("dexterity");
    profSaveDex.value += 2;
}

async function apiAsync(apiUrl) {
    return fetch(`https://www.dnd5eapi.co/api/${apiUrl}`).then(res => res.json())
}