import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../utils/store';

import Menu from './Menu.jsx';
import Medias from './Medias.jsx';
import Accueil from './Accueil.jsx';


/**
 * the application and the routes
 */
export function App(){

    return(
        <>
        <Provider store={store}>
            <BrowserRouter>

                <Routes>

                    <Route path="/menu" element={ <Menu /> } />
                    <Route path="/medias" element={ <Medias /> } />
                    <Route path="/" element={ <Accueil /> } />

                </Routes>

            </BrowserRouter>
        </Provider>
        
        </>
    )
}