const pokeApi = {}

function convertApiDataToTemplate(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.type = type
    pokemon.types = types
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertApiDataToTemplate)
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
    .then ((detailsRequest) => Promise.all(detailsRequest))
    .then ((pokemonsDetails) => pokemonsDetails)
}
