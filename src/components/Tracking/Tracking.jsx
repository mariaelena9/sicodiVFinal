/* @DIRECTORIO */

//Imports
import React, { Component } from "react";
import axios from 'axios';

//Archivo de configuración
import { environment } from '../../config/settings';

//Iconos
import { RiMailSendLine } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { BsArchiveFill } from "react-icons/bs";

class Tracking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            historyData: [],
            numOficio: ''
        }
    }

    componentDidMount() { //Se ejecutará al momento de montar el componente
        if (this.props.id !== undefined) {
            this.getHistory();
        }
    }

    handleChange = async (event) => {
        this.state.numOficio = event.target.value;
        console.log(this.state.numOficio);
    }

    handleSearch = () => {
        console.log(this.state.numOficio);
        axios.get(`${environment.urlServer}/history/getHistoryByOficio/${this.state.numOficio}`).then(Response => {
            this.setState({ historyData: Response.data });
            let no = this.state.historyData[0];
            this.setState({ numOficio: no.numOficio });
        }).catch(error => {
            console.log(error.message);
        });
    }

    getHistory = () => {
        axios.get(`${environment.urlServer}/history/getHistoryById/${this.props.id}`).then(Response => {
            this.setState({ historyData: Response.data });
            console.log(this.state.historyData);
            let no = this.state.historyData[0];
            this.setState({ numOficio: no.numOficio });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <div className="contentTracking">

                <div className="buttonBack">
                    <p className="TitlePage">Seguimiento</p>
                </div>
                <br></br>
                <div className="numOficio">
                    <h2>No. Oficio: {this.state.numOficio}</h2>
                </div>

                <br />

                <div className="trackingPane">
                    {this.state.historyData.map(point => (
                        <div className="trackCard">
                            <div className="izq">
                                <p>{point.actiontype === "Enviado" ? <RiMailSendLine /> : point.actiontype === "Turnado" ? <FaExchangeAlt /> : <BsArchiveFill />}</p>
                            </div>
                            <div className="der">
                                <p><b>{point.actiontype}</b></p>
                                <p><b>El día:</b> {new Date(point.actiondate).getUTCDate()} de {new Date(point.actiondate).toLocaleString('default', { month: 'long' })} del {new Date(point.actiondate).getFullYear()}</p>
                                <p><b>{point.actiontype === "Turnado" ? "A:" : "Por:"}</b> {point.userName}</p>
                            </div>
                        </div>
                    ))}
                    {this.state.historyData.length===0?"Sin historial de movimientos":""}
                </div>

            </div>
        )
    }
}

export default Tracking;