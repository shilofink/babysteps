function generateProficiency(classDetails) {
    if(classDetails.name === "Monk"){
        const skillProficiency = classDetails.proficiency_choices[2]
        const skillProficiency2 = skillProficiency.from
        const randomSkill = Math.floor(Math.random() * skillProficiency2.length)
        const skill1 = skillProficiency2.splice(randomSkill, 1)
        const randomSkill2 = Math.floor(Math.random() * skillProficiency2.length)
        const skill2 = skillProficiency2.splice(randomSkill2, 1)
        skillProficiency3 = skill1[0].name.substring(7).toLowerCase()
        skillProficiency4 = skill2[0].name.substring(7).toLowerCase()
        console.log(skillProficiency3)
        console.log(skillProficiency4)
        
    }
    else{
        const skillProficiency = classDetails.proficiency_choices[0]
        const skillProficiency2 = skillProficiency.from    
        const randomSkill = Math.floor(Math.random() * skillProficiency2.length)
        const skill1 = skillProficiency2.splice(randomSkill, 1)
        const randomSkill2 = Math.floor(Math.random() * skillProficiency2.length)
        const skill2 = skillProficiency2.splice(randomSkill2, 1)    
        skillProficiency3 = skill1[0].name.substring(7).toLowerCase()
        skillProficiency4 = skill2[0].name.substring(7).toLowerCase()
        console.log(skillProficiency3)
        console.log(skillProficiency4)
        
    }
   
} 