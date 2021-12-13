import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PokedexContainer from './pages/PokedexContainer/index';
import PokemonInfo from './pages/PokemonInfo/index'
import { getPokemonData } from './pokemonApi';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=21&offset=0');
    const [previousPage, setPreviousPage] = useState(); 
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [total, setTotalPages] = useState();
    // get pokemon by search value in SerachBar   
    async function getPokemonByInput(pokemon){
        try {
            let pokemon_data = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            setPokemon([pokemon_data])
        } catch (error) {
            setPokemon([])   
        }
    }
    // get pokemon list per page
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
        <BrowserRouter>
            <div className="logo"></div>
            <Routes>
                <Route path="/" element={
                <PokedexContainer getPokemonByInput={getPokemonByInput} pokemon={pokemon} onNextPage={loadNextPage} onPreviousPage={loadPreviousPage} pages={total} currentPage={numberOfPage}/>}/>
                <Route path="/:id" element={<PokemonInfo/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
