/* @LOADER */

//Imports
import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import Inicio from "../../components/Home/Inicio";
import ReactDOM from 'react-dom';
import LogoNay from "../../assets/nayaritLogo.png";

function Loader(){
    useEffect(() => {
        const timer = setTimeout(() => {
            ReactDOM.render(<Inicio/>, document.getElementById('root'));
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <div className="App">
            <Header/>
                <div className="principal">
                    <div className="leftSide">
                        <img className="nayaritLogo" src={LogoNay} alt="LogotipoNayarit"/>
                    </div>

                    <div className="rightSide">
                        <h2>Bienvenido <span>{localStorage.getItem('userName')}</span> </h2>
                    </div>
                </div>
        </div>
    );
}

export default Loader;