import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { PageConext } from './context/PageContext';
import PokedexContainer from './pages/PokedexContainer/index';
import { getPokemonData } from './pokemonApi';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [previousPage, setPreviousPage] = useState(); 
    const [total, setTotalPages] = useState();

    const [currentPage, setCurrentPage, nextPage, setNextPage, page, setPage] = useContext(PageConext);

    // Get pokemon by search value in SearchBar   
    async function getPokemonByInput(pokemon){
        try {
            let pokemon_data = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            setPokemon([pokemon_data]);
        } catch (error) {
            setPokemon([]);
        }
    }
    // Get pokemon list per page
    async function getPokemonsByPage(page){
        try{
            const pokemonArray = await getPokemonData(page);

            setNextPage(pokemonArray.next);
            setPreviousPage(pokemonArray.previous);
            setTotalPages(Math.ceil(pokemonArray.count / 21));

            const promise = pokemonArray.results.map( async (pokemon) => {
                return await getPokemonData(pokemon.url);
            })
            const pokemonData = await Promise.all(promise);
            setPokemon(pokemonData);
        }catch(error){
            console.log(error);
        }
    }

    function loadNextPage(){
        setCurrentPage(nextPage || currentPage);
        getPokemonsByPage(nextPage || currentPage);
        setPage(num => num === 54 ? num = 54 : num + 1);
        window.scrollTo(0, 0);
    }

    function loadPreviousPage(){
        setCurrentPage(previousPage || currentPage);
        getPokemonsByPage(previousPage || currentPage);
        setPage(num => num === 1 ? num = 1 : num - 1);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getPokemonsByPage(currentPage);
    }, [])

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={
            <PokedexContainer getPokemonByInput={getPokemonByInput} pokemon={pokemon} onNextPage={loadNextPage} onPreviousPage={loadPreviousPage} pages={total} currentPage={page}/>}/>
        </Routes>
    </div>
  );
}

export default App;
