import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../utils/store';

import Menu from './pages/Menu.jsx';
import Medias from './pages/Medias.jsx';
import Accueil from './pages/Accueil.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Page404 from './pages/Page404.jsx';
import PageProfil from './pages/PageProfil.jsx';


/**
 * the application and the routes
 */
export function App(){

    return(
        <>
        <Provider store={store}>
            <BrowserRouter>

                <Routes>

                    <Route path="/profil" element={ <PageProfil /> } />
                    <Route path="/menu" element={ <Menu /> } />
                    <Route path="/medias" element={ <Medias /> } />
                    <Route path="/admin/dashboard" element={ <Dashboard /> } />
                    <Route path="/" element={ <Accueil /> } />
                    <Route path="*" element={<Page404 />} />

                </Routes>

            </BrowserRouter>
        </Provider>
        
        </>
    )
}