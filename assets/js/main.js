const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const switchDark = document.getElementById("lightmode");
const switchLight = document.getElementById("darkmode");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

switchLight.addEventListener("click", () => {
  document.body.style.backgroundColor = "#131313";
  document.querySelector(".content").style.backgroundColor = "#393939";
  document.querySelector(".content").style.color = "#fff";
  document.getElementById("lightmode").style.display = "inline";
  document.getElementById("darkmode").style.display = "none";
});
switchDark.addEventListener("click", () => {
  document.body.style.backgroundColor = "#f6f8fc";
  document.querySelector(".content").style.backgroundColor = "#ffffff";
  document.querySelector(".content").style.color = "#000";
  document.getElementById("lightmode").style.display = "none";
  document.getElementById("darkmode").style.display = "inline";
});
