// acesso para o documento html atual e passando a classe
const pokemonList = document.getElementById('pokemonList') //bloco q a lista sera inserida
const loadMore = document.getElementById('loadMoreButton')
const limit = 30;
let offset = 0;
const maxOffset = 151;
// console.log(pokeApi.getPokemons())

function convertTypeToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => {
        return`<li class="type ${typeSlot}">${typeSlot}</li>`
    })
}

function convertToli (pokemon) {
   return `
   <li class="pokemon ${pokemon.defaultType}">
                <span class="number">#${pokemon.pokeId}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${convertTypeToLi(pokemon.pokeTypes).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
   ` 
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertToli).join('') // innerHTML é para concatenar no html
    })
}
loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    console.log(`offset -> ${offset}`)
    console.log(`qtdrecord -> ${qtdRecordNextPage}`)
    
    if (qtdRecordNextPage >= maxOffset){
        const newLimit =  maxOffset - offset
        console.log(`newLimit -> ${newLimit}`)
        
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }
})

console.log('resultado sincrono lala')