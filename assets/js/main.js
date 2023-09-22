const pokemonList = document.getElementById('pokemonList')
const leftSide = document.getElementById('content-left')
const rightSide = document.getElementById('content-right-informations')
const returnButton = document .getElementById('return-button')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 1080
const limit = 10
let offset = 0;
const pokemonId = new URL(window.location.href).searchParams.get("pokemon")


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                    <a href="pokemon-complemento.html?pokemon=${pokemon.number-1}" class="more-details"><li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
            
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
            
                            <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                        </div>
                    </li></a>
                   
                `).join('')
        pokemonList.innerHTML += newHtml
    })
}
loadPokemonItens(offset, limit)

function loadPokemonInfo(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newLeftSide = `
        <h1>${pokemons[pokemonId].name}</h1>
        <img src="${pokemons[pokemonId].photo}" alt="${pokemons[pokemonId].name}" height="300">
        `
       leftSide.className += pokemons[pokemonId].type
       returnButton.className += pokemons[pokemonId].type

        leftSide.innerHTML += newLeftSide
        const newRightSide = ` 
        <div class="content-right-information">
        <span class="info-title">Altura: </span>
        <span class="info-value">${pokemons[pokemonId].height}</span>
        </div>
        <div class="content-right-information">
        <span class="info-title">Peso: </span>
        <span class="info-value">${pokemons[pokemonId].weight}</span>
        </div>
        <div class="content-right-information">
        <span class="info-title">Habilidade: </span>
        <span class="info-value">${pokemons[pokemonId].ability}</span>
        </div>
    
        `  
        rightSide.innerHTML += newRightSide

    })
}
loadPokemonInfo(0,1281)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


