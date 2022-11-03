const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

function pokemonsToHtml(pokemon) {
    return `<li class="grass">
    <div class="pokemon-name">
      <h2>${pokemon.name}</h2>
    </div>

    <div class="pokemon-data">
      <div class="pokemon-type">
        <h3>GRASS</h3>
        <h3>POISON</h3>
      </div>

      <div class="pokemon-image">
        <img src="public/images/bulbasaur.svg" alt="${pokemon.name}">
      </div>
    </div>
  </li>`;
}

const displayPokemons = document.getElementById("pokemon-list-display");

pokeApi.getPokemons().then((pokemons) => {
    const listItems = [];
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
		listItems.push(pokemonsToHtml(pokemon))
	}

    console.log(listItems);
});
