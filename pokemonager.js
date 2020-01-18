(() => {
  class Pokemonager {
    findNames(n) {
      // Returns an array of all the names of n Pokemon from the Pokemon API.
      return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${n}`)
        .then((data) => data.json())
        .then((data) => data.results.map((pokemon) => pokemon.name))
        .catch((err) => console.log("Failed to fetch: ", err));
    }

    findUnderWeight(weight) {
      // Returns an array of all the Pokemon that are under a particular weight.
      const getPokemons = (url) => fetch(url);

      return (async () => {
        const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";
        const pokemonObject = await (await getPokemons(pokemonApiUrl))
          .json()
          .catch(console.log("Failed to fetch"));
        const pokemonsByWeight = [];

        for (let pokemon of pokemonObject.results) {
          const pokemonFullObject = await (await getPokemons(pokemon.url))
            .json()
            .catch(console.log("Failed to fetch urls"));
          if (pokemonFullObject.weight < weight)
            pokemonsByWeight.push(pokemonFullObject);
        }
        return pokemonsByWeight;
      })();
    }
  }
  window.Pokemonager = Pokemonager;
})();
