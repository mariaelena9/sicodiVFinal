/* @FORMATO PARA OPCIÓN FISICA */

//Importación de Componente desde React:
import { Component } from "react";

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
class Fisica extends Component {
    //Estado inicial
    state = {
        //Catalogos
        dependencias: [],
        usuariosD: [],
        usuariosO: [],
        tipos: [],
        selectedFile: [],
        //Datos que se van a registrar en la base de datos [correspondencia]
        form: {
            id_Correspondencia: '',
            numOficio: '',
            fechaEmisión: '',
            fechaRecepción: '',
            fk_DependenciaO: '',
            fk_UsuarioO: '',
            fk_DependenciaD: '',
            fk_UsuarioD: '',
            fk_TipoCo: '',
            asunto: '',
            descripción: '',
            observaciones: '',
            fileName: '',
            formato: 'Fisica',
        }
    }

    /* @Michelle: componentDidMount()es un hook que se invoca justo después de que se haya montado un componente de React, 
        es decir, después del primer ciclo de vida de render().
    */

    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        this.getDependences(); //Función getDependeces() -> Va a mostrar el combo de las dependencias
        this.getTipoCo();      //Función getTipoCo() ->Va a mostrar el combo de los tipos de correspondencia
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("fechaEmisión")[0].setAttribute('max', today); //Se hace validación de no fecha futura en emisión
        document.getElementsByName("fechaRecepción")[0].setAttribute('max', today); //Se hace validación de no fecha futura en recepción
    }

    //=========== FUNCIONES ===========

    //Función para registrar la correspondencia en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        this.insertCorrespondence();
    }

    /* @Michelle: Asíncrono, no va detener el flujo del proyecto, cada que haya cambios*/

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (e) => {
        e.persist();
        if (e.target.name === "fk_DependenciaD") {
            this.getUsersD(e.target.value);
        }
        if (e.target.name === "fk_DependenciaO") {
            this.getUsersO(e.target.value);
        }

        /* Con el await dentro del async se generá una promesa, entonces si se detiene el flujo */
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
            || this.state.form.fechaEmisión === '' || this.state.form.fechaRecepción === ""
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
                this.state.form.fk_DependenciaO = '';
                this.state.form.fk_UsuarioO = '';
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
            console.log(error.message);
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
                this.state.form.fk_DependenciaO = '';
                this.state.form.fk_UsuarioO = '';
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
    getUsersD(id) {
        axios.get(`${environment.urlServer}/user/getUserByDep/${id}/${localStorage.getItem("idusuario")}`).then(Response => {
            if (Response.data === 'Sin resultados') {
                this.setState({ usuariosD: [] });
                return;
            }
            this.setState({ usuariosD: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los usuarios de la BD
    getUsersO(id) {
        axios.get(`${environment.urlServer}/user/getUserByDep/${id}/${localStorage.getItem("idusuario")}`).then(Response => {
            if (Response.data === 'Sin resultados') {
                this.setState({ usuariosO: [] });
                return;
            }
            this.setState({ usuariosO: Response.data });
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
            <div className="correspondencecontent">
                <div className="buttonBack" style={{ cursor: "pointer" }} onClick={this.handleClick}>
                    <IoChevronBackOutline />
                    <h3 className="fontRounded">Modo de correspondencia | Física</h3>
                </div>
                <br />

                {/* CODIFICACIÓN DE CORRESPONDENCIA DIGITAL */}
                <h3 className="fontRounded">Información básica</h3>
                <br></br>
                {/* Inicio de Formulario */}
                <form>
                    <div className="dates">

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

                        <TextField
                            id="fechaEmisión" //Identificar único
                            key="fechaEmisión" //Llave identificador propio de React -> Ayuda a react a identificar los items
                            name="fechaEmisión" //Nombre identificador
                            label="Fecha de emisión" //Etiqueta
                            InputLabelProps={{ shrink: true }} //Le da la propiedad de encogido al label -> Lo pone arriba del textfield
                            required //El campo es requerido            
                            type="date" //Tipo de info que va a recibir 
                            onChange={this.handleChange} //Función
                            value={this.state.form ? this.state.form.fechaEmisión : ''} //Toma valor 
                        >
                        </TextField>

                        <TextField
                            id="fechaRecepción"
                            key="fechaRecepción"
                            name="fechaRecepción"
                            label="Fecha de recepción"
                            InputLabelProps={{ shrink: true }}
                            required
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.form ? this.state.form.fechaRecepción : ''}>
                        </TextField>


                    </div>

                    <h3 className="fontRounded">Información de remitente</h3>
                    <br></br>

                    <div className="originInfo">
                        <select
                            id="fk_DependenciaO"
                            name="fk_DependenciaO"
                            className="select"
                            onChange={this.handleChange}
                            value={this.state.form ? this.state.form.fk_DependenciaO : ''}>
                            <option value="invalido">Elige la dependencia origen</option>
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
                            id="fk_UsuarioO"
                            name="fk_UsuarioO"
                            className="select"
                            onChange={this.handleChange}
                            value={this.state.form ? this.state.form.fk_UsuarioO : ''}>
                            <option value="invalido">Elige un remitente</option>
                            {this.state.usuariosO.map(elemento => (
                                <option
                                    key={elemento.idusuario}
                                    value={elemento.idusuario}>
                                    {elemento.nombre} {elemento.apPaterno} {elemento.apMaterno}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />

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
                            {this.state.usuariosD.map(elemento => (
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
                            className="asunto"
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
        );
    }
}

//Exportación del componente:
export default Fisica;