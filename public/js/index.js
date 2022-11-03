const btnLoadMore = document.getElementById("btn-load-more")
const displayPokemons = document.getElementById("pokemon-list-display");
const limit = 12
let offset = 0
const maxRecords = 151

function pokemonsToHtml(pokemon) {
    return `<li class="${pokemon.type}">
    <div class="pokemon-name">
      <h2>${pokemon.name}</h2>
    </div>

    <div class="pokemon-data">
      <div class= "pokemon-type">
        ${pokemon.types.map((type) => `<h3>${type}</h3>`).join("")}
      </div>

      <div class="pokemon-image">
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>
    </div>
  </li>`;
}

function loadPokemons (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        displayPokemons.innerHTML += pokemons.map(pokemonsToHtml).join("")
    });
}

loadPokemons(offset, limit)

btnLoadMore.addEventListener("click", () => {
    offset += limit
    const qntdNextPage = offset + limit

    if (qntdNextPage >= maxRecords) {
        const newLimit = qntdNextPage - maxRecords
        loadPokemons(offset, newLimit)

        btnLoadMore.parentElement.removeChild(btnLoadMore)
        return 
    } else {
        loadPokemons(offset, limit)
    }

})

