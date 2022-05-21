import React from 'react'

import portada from '../../assets/Portada.png'


function Home() {
    return (
        <div className='home'>
            <div className='principal'>

                <div className='home__container'>
                    <h2 className="firstText">Bienvenido <span>{localStorage.getItem("userName")}</span></h2>
                    <img src={portada} alt='Portada' />

                    <h1 className='firstText'>Sistema de Correspondencia Digital</h1>
                </div>


            </div>


        </div>
    )
}

export default Home;