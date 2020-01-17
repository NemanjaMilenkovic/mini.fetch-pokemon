(() => {
  class Pokemonager {




    // This should return an array of all the names of n Pokemon from the Pokemon API.

    findNames(n) {
      const pokemonArray = fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + n).then((resolve) => {
        return resolve.json();
      }).then((array) => {
        let pokemonArray = array.results;
        return pokemonArray.map((pokemon => {
          return pokemon.name;
        }));
      }
      ).catch((err => console.log("There was an error")));
      return pokemonArray;
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    findUnderWeight(weight) {
      // Your code here.
      // ** LIMIT TO THE FIRST 10 POKEMON
      // We don't want to make too many unnecessary calls to the Pokemon API
      const pokemonArray = fetch('https://pokeapi.co/api/v2/pokemon/?limit=10').then((resolve) => {
        return resolve.json();
      }).then((array) => {
        let pokemonArray = array.results;
        let results = [];
        let newPokemonUrlArray = [];
        pokemonArray.filter((pokemon => {
          // console.log(pokemon.url);
          newPokemonUrlArray.push(pokemon.url);
        }));
        for (let url of newPokemonUrlArray) {
          fetch(url).then((resolve) => {
            return resolve.json();
          }).then((arr) => {
            if (arr.weight < weight) results.push(arr[0]);
            // console.log(arr.weight);

          })
        }
        console.log("this is a result -------> ", results);

        return results;
      }
      ).catch((err => console.log("There was an error")));
      return pokemonArray;
    }
  }

  window.Pokemonager = Pokemonager;
})();
