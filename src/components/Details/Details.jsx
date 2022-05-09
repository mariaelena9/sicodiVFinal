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
        if(this.props.tipo === 1){
            ReactDOM.render(<Sent />, document.getElementById('root'));
        } else {
            ReactDOM.render(<Received />, document.getElementById('root'));
        }
    }

    handleResponse = () => {

    }

    render() {
        return (
            <Fragment>
                <div className="detailscontent">
                    <div className="buttonBack" style={{ cursor: "pointer" }} onClick={() => this.handleBack()}>
                        <IoChevronBackOutline />
                        <h3>{this.props.tipo === 1 ? "Enviados" : "Recibidos"}</h3>
                    </div>
                    <br/>
                    
                    <div className="basicInfo">
                        <div className="infoIzq">
                            <h4>Información básica</h4>
                            <p>Fecha de emisión: {new Date(this.state.fechaE).getUTCDate()} de {new Date(this.state.fechaE).toLocaleString('default', { month: 'long' })} del {new Date(this.state.fechaE).getFullYear()}</p>
                            <p>Fecha de recepción: {new Date(this.state.fechaR).getUTCDate()} de {new Date(this.state.fechaR).toLocaleString('default', { month: 'long' })} del {new Date(this.state.fechaR).getFullYear()}</p>
                            <p>Tipo: {this.state.correspondenciaInfo.nombre}</p>
                        </div>
                        <div className="infoDer">
                            <h4>{this.props.tipo===1?"Información del destinatario: ":"Información del remitente: "}</h4>
                            <p>{this.props.tipo===1?"Destino: ":"Origen: "}{this.state.correspondenciaInfo.dependenciaRemitente}</p>
                            <p>{this.props.tipo===1?"Nombre del destinatario: ":"Nombre del remitente: "}{this.state.correspondenciaInfo.remitente}</p>
                            <p>Número de oficio: {this.state.correspondenciaInfo.numOficio}</p>
                        </div>
                    </div>

                    <div className="moreInfo">
                        <div className="bodyMes">
                            <br />
                            <p><b>Asunto</b></p>
                            <p>{this.state.correspondenciaInfo.asunto}</p>
                            <br />
                            <p><b>Descripción</b></p>
                            <p>{this.state.correspondenciaInfo.descripción}</p>
                            <br />
                            <p><b>Observaciones</b></p>
                            <p>{this.state.correspondenciaInfo.observaciones === "" ? "Sin observaciones" : this.state.correspondenciaInfo.observaciones}</p>
                        </div>

                        <br />

                        <div className="options">
                            <div className="files">
                                <p><b>Archivos adjuntos</b></p>
                            </div>
                            <div className="actions">
                                <button className="download">Descargar</button>
                                <button className="follow">Seguimiento</button>
                                <button className="set">Asignar</button>
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