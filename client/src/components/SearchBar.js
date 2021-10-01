import React from 'react'

export default function SearchBar(props){
    return(
        <div className="searchbar_container">
            <div className="input_container">
                <input type="text"></input>
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    )
}