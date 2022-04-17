//Imports
import React, { Component } from "react";
import axios from 'axios';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

//Iconos
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogin } from "react-icons/md";

//Componentes
import Loader from "../../commons/Loader/Loader"

class Login extends Component {
    state = {
        form: {
            email: '',
            password: '',
        }
    }

    //Función para validar las credenciales de inicio en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/api/login/getcredentials/${this.state.form.email}/${this.state.form.password}`).then(Response => {
            
            if(Response.data.idusuario==null){
                Swal.fire({
                    title: 'Error!',
                    text: 'Usuario o contraseña incorrectos',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                  })
                return;
            }

            localStorage.setItem('auth', 'true');
            localStorage.setItem('idusuario', Response.data.idusuario);
            localStorage.setItem('iddependencia', Response.data.fkdependencia);
            localStorage.setItem('userName', Response.data.nombre+' '+Response.data.apPaterno+' '+Response.data.apMaterno);
            localStorage.setItem('userEmail', Response.data.email);
            localStorage.setItem('userCargo', Response.data.cargo);
            localStorage.setItem('userRol', Response.data.fkrol);
            ReactDOM.render(<Loader texto1="Bienvenido" texto2={localStorage.getItem('userName')} type="login" />, document.getElementById('root'));
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <div className="Content">
                <div className="Welcome">
                    <h1> BIENVENIDO </h1>
                    <p> Ingresa tu cuenta para continuar </p>
                </div>

                <div className="Login">
                    <div className="log">
                        <form>

                            <div className="User">
                                <div className="icon-user"> <AiOutlineUser /> </div>
                                <input type='text' placeholder="Usuario" name="email" id="email" onChange={this.handleChange} required></input>
                            </div>

                            <div className="Pass">
                                <div className="icon-pass"> <RiLockPasswordLine /> </div>
                                <input type='password' placeholder="Contraseña" name="password" id="password" onChange={this.handleChange} required></input>
                            </div>

                            <div className="btnLog">
                                <button type="submit" onClick={this.handleSubmit}>INGRESAR <MdLogin/></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;