//@HOME

//Imports
import React, {Component} from 'react';

import { FaRobot } from "react-icons/fa";

//Componentes
import Header from '../../commons/Header/Header';
import Menu from '../../commons/Menu/Menu';

function Inicio (props) {
return (
    <div className='Home'>
        <Header/>

        <div className='Container'>
            <Menu/>
                <div className='welcome'>
                    <p>{props.page}</p>
                    <h2> ERROR 404: <span>Página en desarrollo.</span> </h2>
                    <i><FaRobot/></i>
                </div>
        </div>     
    </div>
);
}

export default Inicio;