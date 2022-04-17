import { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Correspondence from '../Correspondence'

//Objetos MATD
import TextField from '@mui/material/TextField';

class Digital extends Component {
    state = {
        showDigital: false,
        showFisica: false,
        data: [],
        dependencias: [],
        usuarios: [],
        tipos: [],
        form: {
            id_Correspondencia: '',
            fechaEmisión: '',
            fechaRecepción: '',
            fk_DependenciaO: localStorage.getItem("iddependencia"),
            fk_UsuarioO: localStorage.getItem("idusuario"),
            fk_DependenciaD: '',
            fk_UsuarioD: '',
            fk_TipoCo: '',
            asunto: '',
            descripción: '',
            observaciones: '',
            formato: 'Digital',
        }
    }

    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        this.getDependences();
        this.getTipoCo();
        console.log(this.state.form);
    }

    //Función para registrar la correspondencia en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        this.insertCorrespondence();
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async e => {
        e.persist();
        if (e.target.name === "fk_DependenciaD") {
            this.getUsers(e.target.value);
        }
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    //Función para insertar en la BD la correspondencia
    //Consumo del metodo INSERT de la API
    insertCorrespondence = async () => {
        if (this.state.form.fk_DependenciaO === "invalido" || this.state.form.fk_DependenciaO === ""
            || this.state.form.fk_UsuarioO === "invalido" || this.state.form.fk_UsuarioO === ""
            || this.state.form.fk_DependenciaD === "invalido" || this.state.form.fk_DependenciaD === ""
            || this.state.form.fk_UsuarioD === "invalido" || this.state.form.fk_UsuarioD === ""
            || this.state.form.fk_TipoCo === "invalido" || this.state.form.fk_TipoCo === "") {
            Swal.fire({
                title: 'No se puede registrar',
                text: 'Porfavor complete todos los campos de forma correcta.',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        delete this.state.form.id_Correspondencia;
        await axios.post("http://localhost:3000/api/correspondence/insert", this.state.form).then(response => {
            this.insertFiles(response);
            this.state.form.fechaEmisión = '';
            this.state.form.fechaRecepción = '';
            this.state.form.fk_DependenciaD = '';
            this.state.form.fk_UsuarioD = '';
            this.state.form.fk_TipoCo = '';
            this.state.form.asunto = '';
            this.state.form.descripción = '';
            this.state.form.observaciones = '';
            Swal.fire({
                title: 'Acción realizada correctamente',
                text: 'Correspondencia registrada exitosamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
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
    getUsers(id) {
        axios.get(`http://localhost:3000/api/user/getUserByDep/${id}`).then(Response => {
            if (Response.data === 'Sin resultados') {
                this.setState({ usuarios: [] });
                return;
            }
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
            <div>
                <h3>Información básica</h3>
                <form>
                    <div className="dates">
                        <TextField InputLabelProps={{ shrink: true }} name="fechaEmisión" required key="fechaEmisión" type="date" id="fechaEmisión" label="Fecha de emisión" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaEmisión : ''}></TextField>
                        <TextField InputLabelProps={{ shrink: true }} name="fechaRecepción" required key="fechaRecepción" type="date" id="fechaRecepción" label="Fecha de recepción" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaRecepción : ''}></TextField>
                    </div>
                    <br />
                    <h3>Información de destinatario</h3>
                    <div className="originInfo">
                        <select className="select" id="fk_DependenciaD" name="fk_DependenciaD" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_DependenciaD : ''}>
                            <option value="invalido">Elige la dependencia destino</option>
                            {this.state.dependencias.map(elemento => (
                                <option key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                            ))}
                        </select>
                        <br />
                        <select className="select" id="fk_UsuarioD" name="fk_UsuarioD" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_UsuarioD : ''}>
                            <option value="invalido">Elige un destinatario</option>
                            {this.state.usuarios.map(elemento => (
                                <option key={elemento.idusuario} value={elemento.idusuario}>{elemento.nombre} {elemento.apPaterno} {elemento.apMaterno}</option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <h3>Información de correspondencia</h3>
                    <div className="originInfo">
                        <select className="select" id="fk_TipoCo" name="fk_TipoCo" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_TipoCo : ''}>
                            <option value="invalido">Elige un tipo de correspondencia</option>
                            {this.state.tipos.map(elemento => (
                                <option key={elemento.idtipo} value={elemento.idtipo}>{elemento.nombre}</option>
                            ))}
                        </select>
                        <br />
                        <TextField required name="asunto" key="asunto" id="asunto" label="Asunto:" onChange={this.handleChange} value={this.state.form ? this.state.form.asunto : ''}></TextField>
                        <br />
                        <TextField multiline name="descripción" key="descripción" rows={10} required id="descripción" label="Descripcion:" onChange={this.handleChange} value={this.state.form ? this.state.form.descripción : ''}></TextField>
                        <br />
                        <TextField multiline name="observaciones" key="observaciones" rows={5} required id="observaciones" label="Observaciones:" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaobservaciones : ''}></TextField>
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
        );
    }
}

export default Digital;