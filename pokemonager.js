(() => {
  class Pokemonager {
    // This should return an array of all the names of n Pokemon from the Pokemon API.

    findNames(n) {
      const pokemonArray = fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${n}`
      )
        .then((resolve) => {
          return resolve.json();
        })
        .then((array) => {
          let pokemonArray = array.results;
          return pokemonArray.map((pokemon) => {
            return pokemon.name;
          });
        })
        .catch((err) => console.log("There was an error"));
      return pokemonArray;
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    findUnderWeight(weight) {
      // Your code here.
      // ** LIMIT TO THE FIRST 10 POKEMON
      // We don't want to make too many unnecessary calls to the Pokemon API

      const getPokemons = (url) => fetch(url);

      const findPokemonsByWeight = async () => {
        const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";
        const pokemonObject = await (await getPokemons(pokemonApiUrl)).json();
        const pokemonsUrls = pokemonObject.results.map((pokemon) => {
          return pokemon.url;
        });
        const pokemonsByWeight = [];

        for (let url of pokemonsUrls) {
          const pokemonFullObject = await (await getPokemons(url)).json();
          if (pokemonFullObject.weight < weight)
            pokemonsByWeight.push(pokemonFullObject);
        }
        return pokemonsByWeight;
      };
      return findPokemonsByWeight();
    }
  }
  window.Pokemonager = Pokemonager;
})();
