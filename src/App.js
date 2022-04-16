//@En este archivo [App.js] descansarán los archivos que se mostrarán en la página principal (one page):

//Imports
import React from 'react';

//Hojas de estilo
import './commons/Header/Header.css';
import './commons/Menu/Menu.css';
import './components/Correspondence/Correspondence.css';
import './components/Directory/Directorio.css'
import './components/Directory/Modal.css';
import './components/Home/Inicio.css'
import './components/Log In/Login.css';
import './components/Tracking/Tracking.css'
import './pages/Login-Page.css'

//Componentes
import Home from './components/Home/Inicio'
import LoginPage from './pages/Login-Page';

function App () {
    if(localStorage.getItem('auth')==="true"){
        return(
            <div>
                <Home/>
            </div>
        );
    } else {
        return(
            <div>
                <LoginPage/>
            </div>
        );
    }
}

export default App;