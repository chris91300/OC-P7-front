import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../utils/store';

import Menu from './pages/Menu.jsx';
import Medias from './pages/Medias.jsx';
import Accueil from './pages/Accueil.jsx';
import Dashboard from './pages/Dashboard.jsx';


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
                    <Route path="/admin/dashboard" element={ <Dashboard /> } />
                    <Route path="/" element={ <Accueil /> } />

                </Routes>

            </BrowserRouter>
        </Provider>
        
        </>
    )
}