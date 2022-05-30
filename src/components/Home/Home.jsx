import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import portada from '../../assets/Portada_min.png'
import { environment } from '../../config/settings';
import Received from '../Received/Received';


class Home extends Component {

    constructor() {
        super();

        this.state = {
            totalRecibidos: ''
        }

    }

    getTotal() {
        axios.get(`${environment.urlServer}/correspondence/getReceivedTotal/${localStorage.getItem('idusuario')}`).then(res => {
            this.setState({ totalRecibidos: res.data }); //Resultado de consulta [original]
            console.log(this.state.totalRecibidos);
        }).catch(error => {
            console.log(error.message);
        });
    }

    componentDidMount() {
        this.getTotal();
    }

    //Función para ir a los no leídos
    handleSeen() {
        ReactDOM.render(<Received />, document.getElementById('root'));
    }

    render() {
        return (
            <div className='home'>
                <div className='principal'>
                    <div className='home__container'>
                        <h2 className="firstText">Bienvenido <span>{localStorage.getItem("userName")}</span></h2>
                        <img src={portada} alt='Portada' />
                        <br></br>
                        <h1 className='firstText'>Sistema de Correspondencia Digital</h1>
                    </div>

                    <button className='totalRecibidos' onClick={this.handleSeen}>
                        <p>No Leídos: <span>{this.state.totalRecibidos.Total}</span></p>
                    </button>
                </div>
            </div>
        )
    }
}

export default Home;