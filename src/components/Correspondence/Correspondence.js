//Imports
import React, { Component } from "react";
import { useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import axios from 'axios';
import Header from "../../commons/Header/Header";
import Directorio from "../Directory/Directorio";
import "./Correspondence.css"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Menu from "../../commons/Menu/Menu";

class Correspondence extends Component {
    state = {
        data: [],
        dependencias: [],
        usuarios: [],
        tipos: [],
        form: {
            id_Correspondencia: '',
            fechaEmisión: '',
            fechaRecepción: '',
            fechaLimite: '',
            fk_DependenciaO: '',
            fk_UsuarioO: '',
            fk_DependenciaD: '',
            fk_UsuarioD: '',
            fk_TipoCo: '',
            asunto: '',
            descripción: '',
            observaciones: '',
        }
    }


    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        this.getDependences();
        this.getUsers();
        this.getTipoCo();
    }

    //Función para registrar la correspondencia en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        this.insertCorrespondence();
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

    //Función para insertar en la BD la correspondencia
    //Consumo del metodo INSERT de la API
    insertCorrespondence = async () => {
        if (this.state.form.fk_DependenciaO == "invalido" || this.state.form.fk_DependenciaO == ""
            || this.state.form.fk_UsuarioO == "invalido" || this.state.form.fk_UsuarioO == ""
            || this.state.form.fk_DependenciaD == "invalido" || this.state.form.fk_DependenciaD == ""
            || this.state.form.fk_UsuarioD == "invalido" || this.state.form.fk_UsuarioD == ""
            || this.state.form.fk_TipoCo == "invalido" || this.state.form.fk_TipoCo == "") {
            alert("Porfavor complete todos los campos correctamente");
            return;
        }
        delete this.state.form.id_Correspondencia;
        await axios.post("http://localhost:3000/api/correspondence/insert", this.state.form).then(response => {
            this.insertFiles(response);
            this.state.form.fechaEmisión = '';
            this.state.form.fechaRecepción = '';
            this.state.form.fechaLimite = '';
            this.state.form.fk_DependenciaO = '';
            this.state.form.fk_UsuarioO = '';
            this.state.form.fk_DependenciaD = '';
            this.state.form.fk_UsuarioD = '';
            this.state.form.fk_TipoCo = '';
            this.state.form.asunto = '';
            this.state.form.descripción = '';
            this.state.form.observaciones = '';
            ReactDOM.render(<Correspondence />, document.getElementById('root'));
        }).catch(error => {
            console.log(error.message);
        })
    }

    insertFiles(id) {
        console.log(id.data.insertId);
    }

    //Consultar las dependencias de la BD
    getDependences() {
        axios.get("http://localhost:3000/api/dependence/getdependence").then(Response => {
            this.setState({ dependencias: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los usuarios de la BD
    getUsers() {
        axios.get("http://localhost:3000/api/user/getuser").then(Response => {
            this.setState({ usuarios: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los tipos de correspondencia de la BD
    getTipoCo() {
        axios.get("http://localhost:3000/api/typesco/gettypes").then(Response => {
            this.setState({ tipos: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <div className="body">
                <Header />
                <div className="middle">
                    <Menu />
                    <div className="correspondencecontent">
                        <div className="buttonBack">
                            <i><IoChevronBackOutline /></i>
                            <p className="TitlePage">Nueva Correspondencia</p>
                        </div>
                        <br />
                        <h3>Información básica</h3>
                        <form>
                            <div className="dates">
                                <TextField InputLabelProps={{ shrink: true }} name="fechaEmisión" required type="date" id="fechaEmisión" label="Fecha de emisión" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaEmisión : ''}></TextField>
                                <TextField InputLabelProps={{ shrink: true }} name="fechaRecepción" required type="date" id="fechaRecepción" label="Fecha de recepción" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaRecepción : ''}></TextField>
                                <TextField InputLabelProps={{ shrink: true }} name="fechaLimite" required type="date" id="fechaLimite" label="Fecha limite de respuesta" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaLimite : ''}></TextField>
                            </div>

                            <h3>Información de origen</h3>
                            <div className="originInfo">
                                <select className="select" id="fk_DependenciaO" name="fk_DependenciaO" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_DependenciaO : ''}>
                                    <option value="invalido">Elige la dependencia origen</option>
                                    {this.state.dependencias.map(elemento => (
                                        <option key={elemento.id_Dependencia} value={elemento.id_Dependencia}>{elemento.nombre}</option>
                                    ))}
                                </select>
                                <br />
                                <select className="select" id="fechaRecepción" name="fk_UsuarioO" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_UsuarioO : ''}>
                                    <option value="invalido">Elige un remitente</option>
                                    {this.state.usuarios.map(elemento => (
                                        <option key={elemento.id_Usuario} value={elemento.id_Usuario}>{elemento.nombre} {elemento.apellidoMaterno} {elemento.apellidoPaterno}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <h3>Información de destinatario</h3>
                            <div className="originInfo">
                                <select className="select" id="fk_DependenciaD" name="fk_DependenciaD" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_DependenciaD : ''}>
                                    <option value="invalido">Elige la dependencia destino</option>
                                    {this.state.dependencias.map(elemento => (
                                        <option key={elemento.id_Dependencia} value={elemento.id_Dependencia}>{elemento.nombreDependencia}</option>
                                    ))}
                                </select>
                                <br />
                                <select className="select" id="fk_UsuarioD" name="fk_UsuarioD" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_UsuarioD : ''}>
                                    <option value="invalido">Elige un destinatario</option>
                                    {this.state.usuarios.map(elemento => (
                                        <option key={elemento.id_Usuario} value={elemento.id_Usuario}>{elemento.nombre} {elemento.apellidoMaterno} {elemento.apellidoPaterno}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <h3>Información de correspondencia</h3>
                            <div className="originInfo">
                                <select className="select" id="fk_TipoCo" name="fk_TipoCo" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_TipoCo : ''}>
                                    <option value="invalido">Elige un tipo de correspondencia</option>
                                    {this.state.tipos.map(elemento => (
                                        <option key={elemento.id_Tipo} value={elemento.id_Tipo}>{elemento.nombre}</option>
                                    ))}
                                </select>
                                <br />
                                <TextField required name="asunto" id="asunto" label="Asunto:" onChange={this.handleChange} value={this.state.form ? this.state.form.asunto : ''}></TextField>
                                <br />
                                <TextField multiline name="descripción" rows={10} required id="descripción" label="Descripcion:" onChange={this.handleChange} value={this.state.form ? this.state.form.descripción : ''}></TextField>
                                <br />
                                <TextField multiline name="observaciones" rows={5} required id="observaciones" label="Observaciones:" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaobservaciones : ''}></TextField>
                                <br />
                                <p>
                                    Subir archivos:
                                    <br />
                                    <input type="file" accept="image/png, image/jpeg" multiple></input>
                                </p>
                                <br />
                                <button type="submit" onClick={this.handleSubmit}>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Correspondence;