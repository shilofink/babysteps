function armorClass(equipmentText) {

document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 10
    const armorType = document.getElementById("armorClass").value
        if (equipmentText.includes("1 Leather")){
            document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value) + 1
        }
        else if(equipmentText.includes("1 Scale Mail")){
            document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value) + 4
        }
        else if(equipmentText.includes("1 Chain Mail")){
            document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value) + 6
        }
    const shieldType = document.getElementById("armorClass").value
    if (equipmentText.includes("1 Shield")){
        document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value) + 2
    } 
}

