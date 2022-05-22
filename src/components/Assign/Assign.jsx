/* @DETALLE DE ASIGNACIÓN */

//Importación de React:
import { Component, Fragment } from "react"; //Importación de Component y Fragment

//Importación del DOM:
import ReactDOM from 'react-dom';

/* @Michelle: Axios está optimizado para facilitar el consumo de servicios web, API REST y que devuelvan datos JSON */
//Importación de axios:
import axios from 'axios';

import Received from '../Received/Received';

//Importación de Swal (Para alertas emergentes):
import Swal from 'sweetalert2';

//Archivo de configuración
import { environment } from '../../config/settings';

import LogoNay from '../../assets/nayaritRed.png';

//_Class Component_
class Assign extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correspondenciaInfo: [],
            usuarios: [],
            dependencias: [],
            form: {
                fk_DependenciaD: '',
                fk_UsuarioD: ''
            }
        }
    }

    componentDidMount() {
        this.getCorrespondenceInfo();
        this.getDependences();
    }

    getCorrespondenceInfo() {
        axios.get(`${environment.urlServer}/correspondence/getDetail/${this.props.id}`).then(res => {
            this.setState({ correspondenciaInfo: res.data });
            console.log(this.state.correspondenciaInfo);
        }).catch(error => {
            console.log(error.message);
        });
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

    handleSet = () => {
        const correspondencia = {
            'numOficio': this.state.correspondenciaInfo.numOficio,
            'fechaEmisión': this.state.correspondenciaInfo.fechaEmisión.split("T")[0],
            'fechaRecepción': this.state.correspondenciaInfo.fechaRecepción.split("T")[0],
            'fk_DependenciaO': this.state.correspondenciaInfo.iddepremitente,
            'fk_UsuarioO': this.state.correspondenciaInfo.idremitente,
            'fk_DependenciaD': this.state.form.fk_DependenciaD,
            'fk_UsuarioD': this.state.form.fk_UsuarioD,
            'fk_TipoCo': "3",
            'asunto': this.state.correspondenciaInfo.asunto,
            'descripción': this.state.correspondenciaInfo.descripción,
            'observaciones': this.state.correspondenciaInfo.observaciones,
            'formato': this.state.correspondenciaInfo.formato,
            'fk_CorresMain': this.state.correspondenciaInfo.fk_CorresMain!=null?this.state.correspondenciaInfo.fk_CorresMain:this.state.correspondenciaInfo.id_Correspondencia
        }

        axios.post(`${environment.urlServer}/correspondence/insert`, correspondencia).then(response => {
            const action = {
                "fk_Correspondencia": this.state.correspondenciaInfo.fk_CorresMain!=null?this.state.correspondenciaInfo.fk_CorresMain:this.state.correspondenciaInfo.id_Correspondencia,
                "fk_usuario": this.state.form.fk_UsuarioD,
                "actiontype": "Turnado"
            }

            axios.post(`${environment.urlServer}/history/insertAction`, action);

            Swal.fire({
                title: 'Acción realizada correctamente',
                text: 'Correspondencia turnada exitosamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            })

            ReactDOM.render(<Received />, document.getElementById('root'));
        }).catch(error => {
            console.log(error);
        })
    }

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

    render() {
        return (
            <Fragment>
                <div className="assigncontent">
                    <div className="buttonBack">
                        <p className="TitlePage">Asignar</p>
                    </div>

                    <div className="assignView">
                        <div className="assignOption">
                            <img src={LogoNay} style={{ width: "30%" }} alt="Escudo Nayarit Rojo"/>
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

                            <button
                                onClick={this.handleSet}>
                                Enviar
                            </button>
                        </div>

                        <div className="correspondenceInfo">
                            <h3 style={{ textAlign: "center" }}>Información de correspondencia:</h3>
                            <div className="correspondenceRow">
                                <p><b>Oficio</b> #{this.state.correspondenciaInfo.numOficio}</p>
                                <p>Emitido el día {new Date(this.state.correspondenciaInfo.fechaEmisión).getUTCDate() >= 10 ? new Date(this.state.correspondenciaInfo.fechaEmisión).getUTCDate() : "0" + new Date(this.state.correspondenciaInfo.fechaEmisión).getUTCDate()} de {new Date(this.state.correspondenciaInfo.fechaEmisión).toLocaleString('default', { month: 'short' })} del {new Date(this.state.correspondenciaInfo.fechaEmisión).getFullYear()}</p>
                            </div>
                            <div className="correspondenceRow">
                                <div className="correspondenceColumn">
                                    <p><b>Remitente</b></p>
                                    <p>{this.state.correspondenciaInfo.remitente}</p>
                                    <p>{this.state.correspondenciaInfo.dependenciaRemitente}</p>
                                </div>
                                <div className="correspondenceColumn">
                                    <p><b>Destinatario</b></p>
                                    <p>{this.state.correspondenciaInfo.destinatario}</p>
                                    <p>{this.state.correspondenciaInfo.dependenciaDestinatario}</p>
                                </div>
                            </div>
                            <div className="correspondenceRow">
                                <p>Correspondencia {this.state.correspondenciaInfo.formato}</p>
                                <p>Tipo {this.state.correspondenciaInfo.nombre}</p>
                            </div>
                            <div className="correspondenceRow">
                                <div className="correspondenceColumn">
                                    <p><b>Asunto</b></p>
                                    <p>{this.state.correspondenciaInfo.asunto}</p>
                                </div>
                            </div>
                            <div className="correspondenceRow">
                                <div className="correspondenceColumn">
                                    <p><b>Descripción</b></p>
                                    <p>{this.state.correspondenciaInfo.descripción}</p>
                                </div>
                            </div>
                            <div className="correspondenceRow">
                                <div className="correspondenceColumn">
                                    <p><b>Observaciones</b></p>
                                    <p>{this.state.correspondenciaInfo.observaciones === "" ? "Sin observaciones" : this.state.correspondenciaInfo.observaciones}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

//Exportación de componente:
export default Assign;