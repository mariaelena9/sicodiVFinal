//@En este archivo [App.js] descansarán los archivos que se mostrarán en la página principal (one page):

//Imports
import React from 'react';

//Hojas de estilo
import '../src/commons/Header/Header.css';
import '../src/components/Log In/Login.css';

//Componentes
import Home from './components/Home/Inicio'
import LoginPage from './pages/Login-Page';

function App () {
    if(localStorage.getItem('auth')=="true"){
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