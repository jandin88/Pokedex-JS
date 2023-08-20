

const pokemonList = document.getElementById("pokemonsList");
const loadMorebutton = document.getElementById("loadMore");

const limit = 20
let offset = 0;

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.Type}" >
                <span class="number">#${pokemon.Number}</span>
                <span class="name">${pokemon.Name}</span>

                <div class="details">
                    <ol class="types">
                    ${pokemon.Types.map((type) => `<li class="type ${type}" >${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.Photo}"
                        alt="${pokemon.Name}">
                </div>
            </li>`
        ).join('')
        pokemonList.innerHTML += newHtml

    })
}
loadPokemonsItens(offset, limit) 
loadMorebutton.addEventListener("click", () => {
    offset +=limit

    loadPokemonsItens(offset, limit)
})




