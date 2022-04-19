//@HOME

//Imports
import React, {Component} from 'react';

import { FaRobot } from "react-icons/fa";

function Inicio (props) {
return (
    <div className='Home'>
        <div className='Container'>
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