import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { PageProvider } from './context/PageContext';
import PokemonInfo from './pages/PokemonInfo/index'

const rootElement = document.getElementById("root");
render(
  <PageProvider>
  <BrowserRouter>
    <div className="logo"></div>
    <Routes>
        <Route path="/" element={<App/>}/>
      <Route path="/:id" element={<PokemonInfo/>}/>
    </Routes>
  </BrowserRouter>
  </PageProvider>,
  rootElement
);

