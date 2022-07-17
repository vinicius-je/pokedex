import React, { useContext, useEffect, useState } from 'react';
import { PageConext } from '../../context/PageContext';
import { getPokemonData } from '../../pokemonApi';
import './index.css';
// Components
import BackBtn from '../../components/BackBtn';
import PokemonCard from '../../components/PokemonCard';
import SearchBar from '../../components/SearchBar';

export default function PokedexContainer(){
    const [pokemon, setPokemon] = useState([]);
    const [previousPage, setPreviousPage] = useState(); 
    const [totalPages, setTotalPages] = useState();

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

    return(
        <div className="pokedex_container">
            <SearchBar getPokemonByInput={getPokemonByInput}></SearchBar>
            {pokemon[0] ? 
            <>
                <div className="pokedex_card_container">
                    {pokemon.map(pokemon => <PokemonCard pokemon={pokemon} key={pokemon.id}/>) }
                </div> 
                <div className="pagination_container">
                    <div className="pagination_box">
                        <button onClick={loadPreviousPage}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h3>{page} de {totalPages}</h3>
                        <button onClick={loadNextPage}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </>: 
            <>
                <h3>Pokémon Not Found</h3>
                <BackBtn onClick={() => getPokemonsByPage(currentPage)}/>
            </>}
        </div>
    )
}