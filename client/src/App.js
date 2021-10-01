
import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokedexContainer from './components/PokedexContainer'
import { getPokemonData } from './pokemonApi'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=21&offset=0');
    const [previousPage, setPreviousPage] = useState(); 
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [total, setTotalPages] = useState();
    // get pokemon by search value in SerachBar   
    async function getPokemonByInput(pokemon){
        let pokemon_data = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        setPokemon(pokemon_data)
    }

    async function getPokemonsByPage(page){
        try{
            const pokemonArray = await getPokemonData(page);

            setNextPage(pokemonArray.next)
            setPreviousPage(pokemonArray.previous)
            setTotalPages(Math.ceil(pokemonArray.count / 21))

            const promise = pokemonArray.results.map( async (pokemon) => {
            return await getPokemonData(pokemon.url)
            })
            const pokemonData = await Promise.all(promise)
            setPokemon(pokemonData)
        }catch(error){
            console.log(error)
        }
    }

    function loadNextPage(){
        getPokemonsByPage(nextPage)
        setNumberOfPage(num => num === 54 ? num = 54 : num + 1)
    }

    function loadPreviousPage(){
        getPokemonsByPage(previousPage)
        setNumberOfPage(num => num === 1 ? num = 1 : num - 1)
    }

    useEffect(() => {
        getPokemonsByPage(nextPage)
    }, [])

  return (
    <div className="App">
        <Router>
            <div className="logo"></div>
            <SearchBar getPokemonByInput={getPokemonByInput}></SearchBar>
            <PokedexContainer pokemon={pokemon} onNextPage={loadNextPage} onPreviousPage={loadPreviousPage} pages={total} currentPage={numberOfPage}/>
        </Router>
    </div>
  );
}

export default App;
