import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getPokemonData } from '../pokemonApi';
import { Link } from 'react-router-dom';
import './PokemonInfo.css'

export default function PokemonInfo(){

    const URL = 'https://pokeapi.co/api/v2/pokemon/'
    const match = useRouteMatch();

    const [pokemon, setPokemon] = useState();
    const [pokemonChain, setPokemonChain] = useState([]);
    const [pokemonLink, setPokemonLink] = useState([]);
    const [reloadPage, setReloadPage] = useState(false);

    async function getPokemon(){
        let pokemon_data = await getPokemonData(`${URL}${match.params.id}`);
        setPokemon(pokemon_data);

        let pokemon_species = await getPokemonData(pokemon_data.species.url);
        let pokemon_chain = await getPokemonData(pokemon_species.evolution_chain.url);

        let pokemon_name = [];
        // get the each pokemon from evolution chain
        if(pokemon_chain !== null){
            if(pokemon_chain.chain.species.name !== undefined){
                pokemon_name.push(pokemon_chain.chain.species.name)
            }
            if(pokemon_chain.chain.evolves_to[0] !== undefined){
                pokemon_name.push(pokemon_chain.chain.evolves_to[0].species.name)
            }
            if(pokemon_chain.chain.evolves_to[0].evolves_to[0] !== undefined){
                pokemon_name.push(pokemon_chain.chain.evolves_to[0].evolves_to[0].species.name)
            }
            setPokemonLink(pokemon_name)
            // reset pokemon chain on load page
            if(pokemonChain !== []){
                setPokemonChain([])
            }
            // get the image of all pokemons in the evolution chain
            pokemon_name.forEach( async (pokemon_name) => {
                let pokemon_data = await getPokemonData(`${URL}${pokemon_name}`);
                let pokemon_img = pokemon_data.sprites.other.dream_world.front_default;
                setPokemonChain(item => [...item, pokemon_img])
            })
        }
    }  
    
    useEffect(() => {
        getPokemon()
    },[])


    useEffect(() => {
        if(reloadPage){
            getPokemon()
            setReloadPage(!reloadPage)
        }
    },[reloadPage])

    return(
        <div className="pokemon_data_wrapper">
            {pokemon !== undefined ? 
                <div className="pokemon_data_container">
                    <div className="pokemon_box1">
                        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}></img>
                        <h3>{pokemon.name}</h3>
                        <div className="attributes_container">
                            <div>
                                <p>HEIGHT</p>
                                <p>{pokemon.height} m</p>
                            </div>
                            <div>
                                <p>WEIGHT</p>
                                <p>{pokemon.weight} kg</p>
                            </div>
                        </div>
                    </div>
                    <div className="pokemon_box2">
                    <h3>Evolution</h3>
                        <div className="evolution_container">
                            {pokemonChain !== undefined ? 
                                pokemonChain.map((img, index) => 
                                <Link to={pokemonLink[index]}>
                                    <div className="circle">
                                        <img src={img} alt={pokemonLink[index]} onClick={() => setReloadPage(true)}></img>
                                    </div>
                                </Link>):
                                "No evolution"
                            }
                        </div>
                    <h3>Stats</h3>
                    <div className="stats_container">
                        <div>
                            <p>HP</p>
                            <p>{pokemon.stats[0].base_stat}</p>
                        </div>
                        <div>
                            <p>ATK</p>
                            <p>{pokemon.stats[1].base_stat}</p>
                        </div>
                        <div>
                            <p>DEF</p>
                            <p>{pokemon.stats[2].base_stat}</p>
                        </div>
                        <div>
                            <p>SPEED</p>
                            <p>{pokemon.stats[5].base_stat}</p>
                        </div>
                        <div>
                            <p>SP. ATK</p>
                            <p>{pokemon.stats[3].base_stat}</p>
                        </div>
                        <div>
                            <p>SP. DEF</p>
                            <p>{pokemon.stats[4].base_stat}</p>
                        </div>
                    </div>
                    </div>
                </div>
            : 'loading'}
            <button></button>
        </div>
    )
}





