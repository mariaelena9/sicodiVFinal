//Imports
import { Component } from "react";
import axios from 'axios';

//Archivo de configuracion
import { environment } from '../../config/settings';

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
            this.setState({ fechaE: this.state.correspondenciaInfo.fechaEmisión.substring(0, 10) });
            this.setState({ fechaR: this.state.correspondenciaInfo.fechaRecepción.substring(0, 10) });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <div className="detailscontent">
                <div className="basicInfo">
                    <div className="infoIzq">
                        <h4>Información básica</h4>
                        <p>Fecha de emisión: {this.state.fechaE}</p>
                        <p>Fecha de recepción: {this.state.fechaR}</p>
                        <p>Tipo: {this.state.correspondenciaInfo.nombre}</p>
                    </div>
                    <div className="infoDer">
                        <h4>Información del remitente</h4>
                        <p>Origen: {this.state.correspondenciaInfo.dependenciaRemitente}</p>
                        <p>Nombre del remitente: {this.state.correspondenciaInfo.remitente}</p>
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
                        <p>{this.state.correspondenciaInfo.observaciones}</p>
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
                            <button className="answer">Responder</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;