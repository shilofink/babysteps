const races = ["human", "elf", "dwarf", "orc", "halfling"]
const apiRaces = fetchApi("races")
const classes = ["fighter", "rogue", "wizard", "cleric", "bard"]
const images = ["Dwarf Bard.jpg","Dwarf Cleric.jpg", "Dwarf Fighter.png", "Dwarf Rogue.png", "Dwarf Wizard.jpg",
"Elf Bard.jpg", "Elf Cleric.jpg", "Elf Fighter.png", "Elf Rogue.jpg", "Elf Wizard.png", 
"Halfling Bard.jpg", "Halfling Cleric.png", "Halfling Fighter.jpg", "Halfling Rogue.jpg", "Halfling Wizard.jpg",  
"Human Bard.png", "Human Cleric.jpg", "Human Fighter.jpg", "Human Rogue.jpg", "Human Wizard.jpg",
"Orc Bard.jpg", "Orc Cleric.png","Orc Fighter.png", "Orc Rogue.jpg", "Orc Wizard.jpg"]
const  attributes= [6,7,8,9,10,11,12,13,14,15,16,17,18]

function imgSel(race,clas) {
    if (race==="dwarf"){
        if (clas==="bard") {
            return images[0]
            }
        if (clas==="cleric") {
            return images[1]
            }
        if (clas==="fighter") {
            return images[2]
            }
        if (clas==="rogue") {
            return images[3]
            }
        if (clas==="wizard") {
            return images[4]
            }
        }

        if (race==="elf"){
        if (clas==="bard") {
            return images[5]
                }
        if (clas==="cleric") {
            return images[6]
            }
        if (clas==="fighter") {
            return images[7]
            }
        if (clas==="rogue") {
            return images[8]
            }
        if (clas==="wizard") {
            return images[9]
            }
        }
    
    if (race==="halfling"){
        if (clas==="bard") {
            return images[10]
        }
        if (clas==="cleric") {
            return images[11]
        }
        if (clas==="fighter") {
            return images[12]
        }
        if (clas==="rogue") {
            return images[13]
        }
        if (clas==="wizard") {
            return images[14]
        }
    }

    if (race==="human"){
        if (clas==="bard") {
            return images[15]
        }
        if (clas==="cleric") {
            return images[16]
        }
        if (clas==="fighter") {
            return images[17]
        }
        if (clas==="rogue") {
            return images[18]
        }
        if (clas==="wizard") {
            return images[19]
        }
    }

    if (race==="orc"){
    if (clas==="bard") {
        return images[20]
        }
    if (clas==="cleric") {
        return images[21]
        }
    if (clas==="fighter") {
        return images[22]
        }
    if (clas==="rogue") {
        return images[23]
        }
    if (clas==="wizard") {
        return images[24]
        }
    }
} 

function getRandom(array) {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}

function myFunc() {
    const race= getRandom(races)
    const clas= getRandom(classes)
    
    document.getElementById("job").innerHTML = clas
    document.getElementById("race").innerHTML = race
    document.getElementById('characterImage').innerHTML=
        `<img src="Dudes/${imgSel(race, clas)}" width="200" height="200">`

    const elements = document.getElementById("attributeList").querySelectorAll(".attribute")
    const attributeList= Array.from(elements)
    
    attributeList.map(formStuff => {
        formStuff.value= getRandom(attributes) 
    })   
}

function fetchApi(randomApiUrl) {
    fetch(`https://www.dnd5eapi.co/api/${randomApiUrl}`).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        console.log(data.results[0].name);
        return data.results
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}
