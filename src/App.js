//@En este archivo [App.js] descansarán los archivos que se mostrarán en la página principal (one page):

//Imports
import React, {Component} from 'react';
import Header from './commons/Header/Header';
import Loader from './commons/Loader/Loader';
import LoginPage from './pages/Login-Page';
import Sidebar from './commons/Sidebar/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Directorio from './components/Directory/Directorio';
import Correspondence from './components/Correspondence/Correspondence';
import Menu from './commons/Menu/Menu'
import axios from 'axios';
import ReactDOM from 'react-dom';
import Tracking from './components/Tracking/Tracking'
import Login from './components/Login/LoginForm'
import './App.css';
import Inicio from './components/Home/Inicio'
import { AuthProvider } from './context/AuthContext';

function App () {
        return(
            <div>
                {/* <LoginPage/> */}
                {/* <Loader/> */}
                {/* <Loader/> */}
                {/* <Directorio/> */}
                {/* <Correspondence/> */}
                {/* <Menu/> */}
                {/* <Correspondence/> */}
                <Inicio/>
            </div>
        );
}

export default App;