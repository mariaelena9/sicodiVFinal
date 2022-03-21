//@En este archivo [App.js] descansarán los archivos que se mostrarán en la página principal (one page):

//importaciones
// import React, {useState} from 'react';
import React, {Component} from 'react';

import Header from './commons/Header/Header';
import Loader from './commons/Loader/Loader';
import LoginPage from './pages/Login-Page';
import Sidebar from './commons/Sidebar/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Directorio from './components/Directory/Directorio';
import Correspondence from './components/Correspondence/Correspondence';
import axios from 'axios';
import ReactDOM from 'react-dom';

import './App.css';


function App () {
        const element = <Correspondence/>;
        ReactDOM.render(element, document.getElementById('root'));
        return(
            //Aquí van a ir todas las exportaciones
            // <Router>
            //     {/* <Header/>
            //     <LoginPage/>
            //     <Loader/>
            //     <Sidebar/> */}
            //     {/* <Principal/> */}
            //     {/* <Directorio/> */}
            //     <Correspondence/>
            // </Router>
            <Router id="root">
            </Router>
        )
}

export default App;
