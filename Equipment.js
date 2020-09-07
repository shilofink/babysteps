async function generateEquipment(inventory) {
    const fullData = await Promise.all(inventory.map(async item => {
        const url = item.equipment.url.replace("/api/", "")
        
        return {
            equipment: await apiAsync(url),
            quantity: item.quantity || 1,
        }
    }))

    const filtered = fullData.filter(item => {
        const type = item.equipment.equipment_category.index

        return (type === "weapon" || type === "armor")
    })

    return filtered
}

function generateAttacks(equipment) {
    var finalHtml = ""
    const weapons = equipment.filter(item => item.equipment.equipment_category.index === "weapon")

    weapons.map(item => {
        const damageData = item.equipment.damage
        finalHtml += `<p>${item.equipment.name} - Damage: ${damageData.damage_dice} ${damageData.damage_type.name} </p>`
    })

    return finalHtml
}