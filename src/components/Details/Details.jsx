/* @DETALLE DE CORRESPONDENCIA */

//Importación de React:
import { Component, Fragment } from "react"; //Importación de Component y Fragment

//Importación del DOM:
import ReactDOM from 'react-dom';

/* @Michelle: Axios está optimizado para facilitar el consumo de servicios web, API REST y que devuelvan datos JSON */
//Importación de axios:
import axios from 'axios';

//Importación de recursos (iconos):
import { IoChevronBackOutline } from "react-icons/io5";
import * as GrIcons from 'react-icons/gr';

//Importación de componentes:
import Sent from "../Sent/Sent";
import Received from "../Received/Received";
import Digital from "../Correspondence/Formato/Digital"
import Assign from "../Assign/Assign";
import Tracking from "../Tracking/Tracking";

//Archivo de configuración
import { environment } from '../../config/settings';

//_Class Component_
class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correspondenciaInfo: [],
            downloadLink: '',
            fechaE: '',
            fechaR: ''
        }
    }

    componentDidMount() {
        this.getCorrespondenceInfo();
    }

    getCorrespondenceInfo() {
        axios.get(`${environment.urlServer}/correspondence/getDetail/${this.props.idcor}`).then(res => {
            this.setState({ correspondenciaInfo: res.data });
            this.setState({ fechaE: this.state.correspondenciaInfo.fechaEmisión });
            this.setState({ fechaR: this.state.correspondenciaInfo.fechaRecepción });

            axios.get(`${environment.urlServer}/files/link/${this.state.correspondenciaInfo.id_Correspondencia}`).then(res => {
                this.setState({ downloadLink: res.data });
            }).catch(error => {
                console.log(error.message);
            });
        }).catch(error => {
            console.log(error.message);
        });
    }

    handleBack = () => {
        if (this.props.tipo === 1) {
            ReactDOM.render(<Sent />, document.getElementById('root'));
        } else {
            ReactDOM.render(<Received />, document.getElementById('root'));
        }
    }

    handleDownload = () => {
        let file = this.state.downloadLink.link.split("/")[2];
        axios.get(`${environment.urlServer}/files/download/${file}`).then(res => {
            document.location.href = res.request.responseURL;
        })
    }

    handleResponse = () => {
        ReactDOM.render(<Digital data={{ usuario: this.state.correspondenciaInfo.idremitente, dependencia: this.state.correspondenciaInfo.iddepremitente }} />, document.getElementById('root'));
    }

    handleTracking = () => {
        ReactDOM.render(<Tracking id={this.state.correspondenciaInfo.fk_CorresMain!=null?this.state.correspondenciaInfo.fk_CorresMain:this.state.correspondenciaInfo.id_Correspondencia} />, document.getElementById('root'));
    }

    goToSetCorrespondence = () => {
        ReactDOM.render(<Assign id={this.state.correspondenciaInfo.id_Correspondencia} />, document.getElementById('root'));
    }

    render() {
        return (
            <Fragment>
                <div className="detailscontent">
                    <div className="buttonBack" style={{ cursor: "pointer" }} onClick={() => this.handleBack()}>
                        <IoChevronBackOutline />
                        <h3 className="fontRounded">{this.props.tipo === 1 ? "Enviados" : "Recibidos"}</h3>
                    </div>
                    <br />

                    <div className="basicInfo">
                        <div className="infoIzq">
                            <h4 className="fontRounded">Información básica</h4>
                            <p className="info_detail"> <span>Fecha de emisión:</span> {new Date(this.state.fechaE).getUTCDate()} de {new Date(this.state.fechaE).toLocaleString('default', { month: 'long' })} del {new Date(this.state.fechaE).getFullYear()}</p>
                            <p className="info_detail"> <span>Fecha de recepción: </span> {new Date(this.state.fechaR).getUTCDate()} de {new Date(this.state.fechaR).toLocaleString('default', { month: 'long' })} del {new Date(this.state.fechaR).getFullYear()}</p>
                            <p className="info_detail"> <span>Tipo:</span> {this.state.correspondenciaInfo.nombre}</p>
                        </div>
                        <div className="infoDer">
                            <h4 className="fontRounded">{this.props.tipo === 1 ? "Información del destinatario: " : "Información del remitente: "}</h4>
                            <p className="info_detail"><span>{this.props.tipo === 1 ? "Destino: " : "Origen: "}</span>{this.state.correspondenciaInfo.dependenciaRemitente}</p>
                            <p className="info_detail"><span>{this.props.tipo === 1 ? "Nombre del destinatario: " : "Nombre del remitente: "}</span>{this.state.correspondenciaInfo.remitente}</p>
                            <p className="info_detail"><span>Número de oficio:</span> {this.state.correspondenciaInfo.numOficio}</p>
                        </div>
                    </div>

                    <div className="moreInfo">
                        <div className="bodyMes">
                            <br />
                            <p className="fontRounded">Asunto</p>
                            <p className="info_detail">{this.state.correspondenciaInfo.asunto}</p>
                            <br />
                            <p className="fontRounded"><b>Descripción</b></p>
                            <p className="info_detail">{this.state.correspondenciaInfo.descripción}</p>
                            <br />
                            <p className="fontRounded"><b>Observaciones</b></p>
                            <p className="info_detail">{this.state.correspondenciaInfo.observaciones === "" ? "Sin observaciones" : this.state.correspondenciaInfo.observaciones}</p>
                        </div>

                        <br />

                        <div className="options">
                            <div className="files">
                                <p className="fontRounded"><b>Archivos adjuntos</b></p>
                                {
                                    this.state.downloadLink === 'Sin archivo' ?
                                        <h4>Sin archivo que mostrar</h4>
                                        : <div className="fileInfo">
                                            <i><GrIcons.GrDocumentPdf /></i>
                                            <p>{this.state.correspondenciaInfo.pdfNombre}</p>
                                            {/* <iframe src={`localhost:3000/files/sellos.pdf &embedded=true`} style={{ width: "100%", height: "700px" }} frameborder="0" ></iframe> */}
                                        </div>
                                }

                            </div>
                            <div className="actions">
                                {
                                    this.state.downloadLink === 'Sin archivo' ?
                                        ""
                                        : <button className="download info_detail" onClick={() => this.handleDownload()}>Descargar</button>
                                }

                                <button className="follow info_detail" onClick={() => this.handleTracking()}>Seguimiento</button>
                                <button className="set info_detail" onClick={() => this.goToSetCorrespondence()}>Asignar</button>
                                {this.state.correspondenciaInfo.idtipo === 1 ? "" : this.props.tipo === 1 ? "" : <button className="answer" onClick={() => this.handleResponse()}>Responder</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

//Exportación de componente:
export default Details;