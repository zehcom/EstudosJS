
const pokeApi = {}

function convertPokeApiModel(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.pokeId = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.pokeTypes = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [defaultType] = pokemon.pokeTypes
    pokemon.defaultType = defaultType
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemon) => convertPokeApiModel(pokemon))

}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((response) => response.json()) // resposta da url
        .then((jsonBody) => jsonBody.results) //pegando somente o elemento dos pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) //passando para a função um novo fetch para a url de detalhes
        .then((detailRequest) => Promise.all(detailRequest)) //aguarda finalização de todas as requisições
        .then((pokemonsDetails) => pokemonsDetails) //retorna lista de detalhes de cada pokemon
        
}