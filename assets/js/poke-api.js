const pokeApi = {};


function convertPokemonApiDerailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.Number = pokeDetail.id;
    pokemon.Name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type]=types;
    pokemon.Types = types
    pokemon.Type=type;
    pokemon.Photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiDerailToPokemon)
}

pokeApi.getPokemons= (offeset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offeset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}