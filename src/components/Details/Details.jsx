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

//Importación de componentes:
import Sent from "../Sent/Sent";
import Received from "../Received/Received";
import Digital from "../Correspondence/Formato/Digital"

//Archivo de configuración
import { environment } from '../../config/settings';

//_Class Component_
class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correspondenciaInfo: [],
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
            console.log(res.data);
            console.log(this.state.correspondenciaInfo);
            this.setState({ fechaE: this.state.correspondenciaInfo.fechaEmisión });
            this.setState({ fechaR: this.state.correspondenciaInfo.fechaRecepción });
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

    handleResponse = () => {
        ReactDOM.render(<Digital data={{ usuario: this.state.correspondenciaInfo.idremitente, dependencia: this.state.correspondenciaInfo.iddepremitente }} />, document.getElementById('root'));
    }

    render() {
        return (
            <Fragment>
                <div className="detailscontent">
                    <div className="buttonBack" style={{ cursor: "pointer" }} onClick={() => this.handleBack()}>
                        <IoChevronBackOutline />
                        <h3 className="fontRounded">{this.props.tipo === 1 ? "Enviados" : "Recibidos"}</h3>
                    </div>
                    <br/>
                    
                    <div className="basicInfo">
                        <div className="infoIzq">
                            <h4 className="fontRounded">Información básica</h4>
                            <p className="info_detail"> <span>Fecha de emisión:</span> {new Date(this.state.fechaE).getUTCDate()} de {new Date(this.state.fechaE).toLocaleString('default', { month: 'long' })} del {new Date(this.state.fechaE).getFullYear()}</p>
                            <p className="info_detail"> <span>Fecha de recepción: </span> {new Date(this.state.fechaR).getUTCDate()} de {new Date(this.state.fechaR).toLocaleString('default', { month: 'long' })} del {new Date(this.state.fechaR).getFullYear()}</p>
                            <p className="info_detail"> <span>Tipo:</span> {this.state.correspondenciaInfo.nombre}</p>
                        </div>
                        <div className="infoDer">
                            <h4 className="fontRounded">{this.props.tipo===1?"Información del destinatario: ":"Información del remitente: "}</h4>
                            <p className="info_detail"><span>{this.props.tipo===1?"Destino: ":"Origen: "}</span>{this.state.correspondenciaInfo.dependenciaRemitente}</p>
                            <p className="info_detail"><span>{this.props.tipo===1?"Nombre del destinatario: ":"Nombre del remitente: "}</span>{this.state.correspondenciaInfo.remitente}</p>
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
                            </div>
                            <div className="actions">
                                <button className="download info_detail">Descargar</button>
                                <button className="follow info_detail">Seguimiento</button>
                                <button className="set info_detail">Asignar</button>
                                {this.state.correspondenciaInfo.idtipo === 1? "": this.props.tipo===1? "": <button className="answer" onClick={() => this.handleResponse()}>Responder</button>}
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