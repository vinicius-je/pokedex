
import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { getPokemonData } from './pokemonApi'

function App() {
  const [pokemon, setPokemon] = useState([]); 
  // get pokemon by search value in SerachBar   
  async function getPokemonByInput(pokemon){
      let pokemon_data = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      setPokemon(pokemon_data)
  }

  useEffect(() => {
      console.log(pokemon)
  }, [pokemon])
  return (
    <div className="App">
      <div className="logo"></div>
      <SearchBar getPokemonByInput={getPokemonByInput}></SearchBar>
    </div>
  );
}

export default App;
