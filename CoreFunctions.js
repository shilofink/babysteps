function getRandom(array) {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}


function diceRoll(planesInteger) {
    return Math.floor((Math.random() * planesInteger) + 1); 
}

function generateAttributes() {
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

function skills(attributes) {
    const attNumbers = attributes.map(modifier => modifier.value)
    const mods = attNumbers.map(modifier => {
        return Math.floor((modifier / 2) - 5)
    })
    const strengthInputs = Array.from(document.getElementsByClassName("strength"))
    console.log(strengthInputs)
    strengthInputs.map(skill => skill.value = mods[0])
    const dexterityInputs = Array.from(document.getElementsByClassName("dexterity"))
    dexterityInputs.map(skill => skill.value = mods[1])
    const intelligenceInputs = Array.from(document.getElementsByClassName("intelligence"))
    intelligenceInputs.map(skill => skill.value = mods[2])
    const wisdomInputs = Array.from(document.getElementsByClassName("wisdom"))
    wisdomInputs.map(skill => skill.value = mods[4])
    const charismaInputs = Array.from(document.getElementsByClassName("charisma"))
    charismaInputs.map(skill => skill.value = mods[5])
    document.getElementById("passivePerception").value= mods[4] +10
}

