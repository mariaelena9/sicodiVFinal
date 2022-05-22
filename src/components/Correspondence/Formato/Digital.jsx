/* @FORMATO PARA OPCIÓN DIGITAL */

//Importación de Componente desde React:
import { Component, Fragment } from "react"; //Importación de Component y Fragment

//Importación del DOM:
import ReactDOM from 'react-dom';

/*@Michelle: Axios está optimizado para facilitar el consumo de servicios web, API REST y que devuelvan datos JSON */
//Importación de axios:
import axios from 'axios';

//Importación de Swal (Para alertas emergentes):
import Swal from 'sweetalert2';

//Importación de recursos (iconos):
import { IoChevronBackOutline } from "react-icons/io5";

//Importación de componentes:
import Correspondence from '../Correspondence'

//Archivo de configuración
import { environment } from '../../../config/settings';

//Objetos MATD
import TextField from '@mui/material/TextField';

//_Class Component_
class Digital extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dependencias: [],
            usuarios: [],
            tipos: [],
            selectedFile: [],
            //Datos que se van a registrar en la base de datos [correspondencia]
            form: {
                id_Correspondencia: '',
                numOficio: '',
                fechaEmisión: '',
                fechaRecepción: '',
                fk_DependenciaO: localStorage.getItem("iddependencia"),
                fk_UsuarioO: localStorage.getItem("idusuario"),
                fk_DependenciaD: this.props.data !== undefined ? this.props.data.dependencia : '',
                fk_UsuarioD: this.props.data !== undefined ? this.props.data.usuario : '',
                fk_TipoCo: '',
                asunto: '',
                descripción: '',
                observaciones: '',
                fileName: '',
                formato: 'Digital',
                fk_CorresMain: null
            }
        }
    }

    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        if (this.state.form.fk_DependenciaD !== '') {
            this.getUsers(this.state.form.fk_DependenciaD);
        }
        this.getDependences();
        this.getTipoCo();
        this.state.form.fechaEmisión = new Date().toISOString().substring(0, 10);
        this.state.form.fechaRecepción = new Date().toISOString().substring(0, 10);
    }

    //=========== FUNCIONES ===========

    //Función para registrar la correspondencia en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        this.insertCorrespondence();
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (e) => {
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
    }

    //==================== CONSULTAS INSERT  ====================

    //Función para insertar en la BD la correspondencia
    //Consumo del metodo INSERT de la API
    insertCorrespondence = async () => {
        if (this.state.form.fk_DependenciaO === "invalido" || this.state.form.fk_DependenciaO === ""
            || this.state.form.fk_UsuarioO === "invalido" || this.state.form.fk_UsuarioO === ""
            || this.state.form.fk_DependenciaD === "invalido" || this.state.form.fk_DependenciaD === ""
            || this.state.form.fk_UsuarioD === "invalido" || this.state.form.fk_UsuarioD === ""
            || this.state.form.fk_TipoCo === "invalido" || this.state.form.fk_TipoCo === ""
            || this.state.form.asunto === '' || this.state.form.descripción === ''
            || this.state.form.fechaEmisión === ''
            || this.state.form.numOficio === '') {
            Swal.fire({
                title: 'No se puede registrar',
                text: 'Porfavor complete todos los campos de forma correcta.',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        await axios.post(`${environment.urlServer}/correspondence/insert`, this.state.form).then(response => {
            if (response.data === "ER_DUP_ENTRY") {
                Swal.fire({
                    title: 'No se puede registrar',
                    text: 'Se detectó una entrada duplicada "' + this.state.form.numOficio + '" para el número de oficio, por favor ingrese uno nuevo.',
                    icon: 'warning',
                    showConfirmButton: true
                })
                return;
            }

            if (this.state.selectedFile.length === 0) {
                ReactDOM.render(<Correspondence />, document.getElementById('root'));
                this.state.form.fechaEmisión = '';
                this.state.form.fechaRecepción = '';
                this.state.form.fk_DependenciaD = '';
                this.state.form.fk_UsuarioD = '';
                this.state.form.fk_TipoCo = '';
                this.state.form.asunto = '';
                this.state.form.descripción = '';
                this.state.form.observaciones = '';
                this.state.form.numOficio = '';
            }

            const action = {
                "fk_Correspondencia": response.data.insertId,
                "fk_usuario": localStorage.getItem("idusuario"),
                "actiontype": "Enviado"
            }
            
            axios.post(`${environment.urlServer}/history/insertAction`, action);

            this.insertFiles(this.state.selectedFile[0], this.state.form.fileName, response);
            Swal.fire({
                title: 'Acción realizada correctamente',
                text: 'Correspondencia registrada exitosamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            })
        }).catch(error => {
            console.log(error);
        })
    }

    prepararArchivos = async e => {
        this.state.selectedFile[0] = e.target.files[0];
        this.state.form.fileName = e.target.files[0].name.replaceAll(' ', '_');
    }

    insertFiles = async (file, name, id) => {
        const formData = new FormData();
        formData.append(
            "file",
            file,
            name
        );
        await axios.post(`${environment.urlServer}/files/upload/${id.data.insertId}`, formData)
            .then(response => {
                ReactDOM.render(<Correspondence />, document.getElementById('root'));
                this.state.form.fechaEmisión = '';
                this.state.form.fechaRecepción = '';
                this.state.form.fk_DependenciaD = '';
                this.state.form.fk_UsuarioD = '';
                this.state.form.fk_TipoCo = '';
                this.state.form.asunto = '';
                this.state.form.descripción = '';
                this.state.form.observaciones = '';
                this.state.form.numOficio = '';
            }).catch(error => {
                console.log(error);
            });
    }
    //========================================================

    //==================== CONSULTAS GET  ====================

    //Consultar todas las dependencias de la BD
    getDependences() {
        axios.get(`${environment.urlServer}/dependence/getdependence`).then(Response => {
            this.setState({ dependencias: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar todos los usuarios de la BD filtrados por departamento
    getUsers(id) {
        axios.get(`${environment.urlServer}/user/getUserByDep/${id}/${localStorage.getItem("idusuario")}`).then(Response => {
            if (Response.data === 'Sin resultados') {
                this.setState({ usuarios: [] });
                return;
            }
            this.setState({ usuarios: Response.data });
            if (this.props.data) {
                document.getElementById('fk_DependenciaD').value = this.props.data.dependencia;
                document.getElementById('fk_UsuarioD').value = this.props.data.usuario;
            }
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los tipos de correspondencia de la BD
    getTipoCo() {
        axios.get(`${environment.urlServer}/typesco/gettypes`).then(Response => {
            this.setState({ tipos: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }
    //========================================================

    //Función de botón para regresar a opción de correspondencia
    handleClick(e) {
        e.preventDefault();
        ReactDOM.render(<Correspondence />, document.getElementById('root'));
    }

    //Renderización de Componente
    render() {
        return (
            <Fragment>
                <div className="correspondencecontent">
                    <div className="buttonBack" style={{ cursor: "pointer" }} onClick={this.handleClick}>
                        <IoChevronBackOutline />
                        <h3 className="fontRounded">Modo de correspondencia</h3>
                    </div>
                    <br />

                    {/* CODIFICACIÓN DE CORRESPONDENCIA DIGITAL */}
                    <h3 className="fontRounded">Información básica</h3>
                    <br></br>

                    {/* Inicio de Formulario */}
                    <form method="POST" encType="multipart/form-data">
                        <div className="dates">
                            <TextField
                                id="fechaEmisión"
                                key="fechaEmisión"
                                name="fechaEmisión"
                                label="Fecha de emisión"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ readOnly: true }}
                                required
                                type="date"
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.fechaEmisión : ''}>
                            </TextField>

                            <TextField
                                id="numOficio"
                                key="numOficio"
                                name="numOficio"
                                label="Número de Oficio"
                                InputLabelProps={{ shrink: true }}
                                placeholder="Número de Oficio"
                                required
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.numOficio : ''}>
                            </TextField>
                        </div>

                        <h3 className="fontRounded">Información de destinatario</h3>
                        <br></br>

                        <div className="originInfo">
                            <select
                                id="fk_DependenciaD"
                                name="fk_DependenciaD"
                                className="select"
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.fk_DependenciaD : ''}>
                                <option value="invalido">Elige la dependencia destino</option>
                                {this.state.dependencias.map(elemento => (
                                    <option
                                        key={elemento.iddependencia}
                                        value={elemento.iddependencia}>
                                        {elemento.nombre}
                                    </option>
                                ))}
                            </select>
                            <br />

                            <select
                                id="fk_UsuarioD"
                                name="fk_UsuarioD"
                                className="select"
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.fk_UsuarioD : ''}>
                                <option value="invalido">Elige un destinatario</option>
                                {this.state.usuarios.map(elemento => (
                                    <option
                                        key={elemento.idusuario}
                                        value={elemento.idusuario}>
                                        {elemento.nombre} {elemento.apPaterno} {elemento.apMaterno}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />

                        <h3 className="fontRounded">Información de correspondencia</h3>
                        <br></br>

                        <div className="originInfo">
                            <select
                                id="fk_TipoCo"
                                name="fk_TipoCo"
                                className="select"
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.fk_TipoCo : ''}>
                                <option value="invalido">Elige un tipo de correspondencia</option>
                                {this.state.tipos.map(elemento => (
                                    <option
                                        key={elemento.idtipo}
                                        value={elemento.idtipo}>
                                        {elemento.nombre}
                                    </option>
                                ))}
                            </select>
                            <br />

                            <TextField
                                id="asunto"
                                key="asunto"
                                name="asunto"
                                label="Asunto:"
                                required
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.asunto : ''}>
                            </TextField>
                            <br />

                            <TextField
                                multiline
                                rows={10}
                                id="descripción"
                                key="descripción"
                                name="descripción"
                                label="Descripcion:"
                                required
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.descripción : ''}>
                            </TextField>
                            <br />

                            <TextField
                                multiline
                                rows={5}
                                id="observaciones"
                                key="observaciones"
                                name="observaciones"
                                label="Observaciones:"
                                onChange={this.handleChange}
                                value={this.state.form ? this.state.form.fechaobservaciones : ''}>
                            </TextField>
                            <br />

                            <div className="send-options">
                                <div className="input-archivos">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={this.prepararArchivos}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    onClick={this.handleSubmit}>
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

//Exportación de componente:
export default Digital;