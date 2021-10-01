import React, { useState } from 'react'

export default function SearchBar(props){
    const [inputValue, setInputValue] = useState();
    const {getPokemonByInput} = props

    return(
        <div className="searchbar_container">
            <div className="input_container">
                <input type="text" value={inputValue} onInput={(e) => setInputValue(e.target.value)} placeholder="Serach pokemon"></input>
                <button onClick={() => getPokemonByInput(inputValue)}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    )
}