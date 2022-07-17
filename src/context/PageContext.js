import React, { createContext, useState } from 'react'

export const PageConext = createContext();

export function PageProvider(props){
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=21&offset=0')
    const [nextPage, setNextPage] = useState();
    const [page, setPage] = useState(1);
    
    return(
        <PageConext.Provider value={[currentPage, setCurrentPage,nextPage, setNextPage, page, setPage]}>
            {props.children}
        </PageConext.Provider>
    )
}