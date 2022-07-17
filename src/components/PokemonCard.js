import React from 'react'
import './PokemonCard.css'
import { Link } from 'react-router-dom'

export default function PokemonCard(props){
    const id = props.pokemon.id;
    const name = props.pokemon.name;
    const types = props.pokemon.types;
    const img = props.pokemon.sprites.other.dream_world.front_default;
    return(
        <div className="card">
            <Link to={name}>
                <h3 className="pokemon_id">Nº {id}</h3>
                <img src={img} alt={name}></img>
                <h3 className="pokemon_name">{name}</h3>
                <div className="type_container">
                    {types.map(type => {
                        return (<div className={type.type.name}>{type.type.name}</div>)
                    })}
                </div>
            </Link>
        </div>
    )
}
