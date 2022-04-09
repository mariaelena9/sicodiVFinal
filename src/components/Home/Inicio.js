//@HOME

//Imports
import React, {Component} from 'react';
import Header from '../../commons/Header/Header';
import Menu from '../../commons/Menu/Menu';

function Inicio () {
return (
    <div className='Home'>
        <Header/>

        <div className='Container'>
            <Menu/>
                <div className='Welcome'>
                    <h2> ERROR 404: <span>Página en desarrollo.</span> </h2>
                </div>
        </div>

       
        
        

        
        
    </div>
);
}

export default Inicio;