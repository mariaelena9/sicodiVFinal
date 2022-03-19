/* @DIRECTORIO */

//Import React library
import React, {Component} from "react";

//Import assets
import { IoChevronBackOutline } from "react-icons/io5"; 

//Import components
import Sidebar from "../../commons/Sidebar/Sidebar";

//Import Styles
import style from './Directorio.css'
import '../../App.css';

import { FaUserTie } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import axios from 'axios';
import Header from "../../commons/Header/Header";



class Directorio extends Component{
    state = {
        data: [],
        form:{
            idUsuario: '',
            nombre: '',
            apellido: '',
        }
    }
    //Se ejecutará al momento de montar el componente
    componentDidMount(){
        this.getUser();
    }

    getUser = () => {
        axios.get("http://localhost:3000/api/user/getuser").then( Response => {
            this.setState({data: Response.data});
        }).catch(error => {
            console.log(error.message);
        });
    }

    render(){
        return(
        
        <div className="main">

                    <Header/>
                    
            <div className="contentDirectory">
                <Sidebar/>

                <div className="direction">
                    <div className="back">
                        <IoChevronBackOutline/> 
                        <p className="TitlePage">Directorio</p>
                    </div>
                    
                    <div className='directorio'>
                    {this.state.data.map( user => {
                        return(
                            <div className='Tarjeta'>
                                <div className="img-contact">
                                    <FaUserTie/>
                                </div>

                                <div className="info-contact">
                                    
                                    <div className="name-contact">
                                        <p><b>{user.nombre} {user.apellido}</b></p>
                                    </div>

                                    <div className="id-contact">
                                        <p>{user.idUsuario}</p>
                                    </div>

                                    
                                </div>

                            <div className="img-message">
                                <AiFillMessage/>
                            </div>
                                
                            </div>
                        );
                    })}
                    </div>
                </div> 
            </div>

        </div>
        )
    }
}

export default Directorio;

