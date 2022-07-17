import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageProvider } from './context/PageContext';
import PokedexContainer from './pages/PokedexContainer';
import PokemonInfo from './pages/PokemonInfo/index';
import './index.css';

const rootElement = document.getElementById("root");
render(
  <PageProvider>
  <BrowserRouter>
    <div className="logo"></div>
    <Routes>
        <Route path="/" element={<PokedexContainer/>}/>
        <Route path="/:id" element={<PokemonInfo/>}/>
    </Routes>
  </BrowserRouter>
  </PageProvider>,
  rootElement
);

