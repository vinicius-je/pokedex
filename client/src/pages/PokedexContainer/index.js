import React from 'react'
import PokemonCard from '../../components/PokemonCard'
import SearchBar from '../../components/SearchBar'
import './index.css'

export default function PokedexContainer(props){
    const {pokemon, onNextPage, onPreviousPage, currentPage, pages} = props
    return(
        <div>
        <SearchBar getPokemonByInput={props.getPokemonByInput}></SearchBar>
            <div className="pokedex_container">
                {pokemon.map(pokemon => <PokemonCard pokemon={pokemon}/>)}
                <div className="pagination_container">
                    <div className="pagination_box">
                        <button onClick={onPreviousPage}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h3>{currentPage} de {pages}</h3>
                        <button onClick={onNextPage}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}