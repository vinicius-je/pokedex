export async function getPokemonData(URL){
    // console.log(URL)
    try {
        const response = await fetch(URL)
        const pokemon_data = await response.json()
        return pokemon_data
    } catch(error){
        console.log(error)
    }
}
