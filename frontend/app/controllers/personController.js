export const removePerson = (pepole, personToDelete) =>{
    return pepole.splice(pepole.indexOf(personToDelete), 1)
}