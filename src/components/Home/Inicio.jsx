/* @HOME */

//Importación de React:
import React, { Component, Fragment } from 'react'; //Caracteristica Component

//Importación de Axios:
import axios from 'axios';

//Importación de Chart para el diseño y desarrollo de gráfica:
import { Chart } from './Chart';

import { environment } from '../../config/settings';


const usuarioId = localStorage.getItem("idusuario");

// _Class Component_
class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [] 
        };
    }

    componentDidMount() {
        this.getData().then(res => this.setState({ data: res }))
    }

    //Gráfica para contabilizar los recibidos
    async getRecivedCount() {
        return axios.get(`${environment.urlServer}/correspondence/getReceived/${localStorage.getItem("idusuario")}`).then(res => {
            return res.data.length;
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Gráfica para contabilizar los enviados
    async getSentCount() {

        return axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
            //console.log(res.data.length);
            return res.data.length;
        }).catch(error => {
            console.log(error.message);
            return null;
        });
    };

    async getStatusMail(status) {
        return axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
            console.log(res.data)
            var filter = res.data.filter((data) => data.fk_estatusco == status);
            console.log(filter)
            return filter.length;
        }).catch(error => {
            console.log(error.message);
        });
    }


    async getData() {

        const sentMails = await this.getSentCount();
        const recivedMails = await this.getRecivedCount();
        const processMail = await this.getStatusMail("1");
        const archivadosMail = await this.getStatusMail("3");

        //console.log(processMail);

        const data = {
            labels: [`Total de mensajes: ${recivedMails + sentMails}`],
            datasets: [
                {
                    label: "Mensajes recibidos",
                    data: [recivedMails],
                    backgroundColor: "rgba(53, 162, 235, 0.2)",
                    borderColor: "rgba(53, 162, 235, 1)",
                    borderWidth: 1
                },
                {
                    label: "Mensajes enviados",
                    data: [sentMails],
                    backgroundColor: "rgba(74, 191, 133, 0.2)",
                    borderColor: "rgba(74, 191, 133, 1)",
                    borderWidth: 1
                },
                {
                    label: "Mensajes archivados",
                    data: [archivadosMail],
                    backgroundColor: "rgba(255, 46, 91, 0.2)",
                    borderColor: "rgba(255, 46, 91, 1)",
                    borderWidth: 1
                },
                {
                    label: "Mensajes en proceso",
                    data: [processMail],
                    backgroundColor: "rgba(243, 201, 94, 0.2)",
                    borderColor: "rgba(243, 201, 94, 1)",
                    borderWidth: 1
                }
            ]
        };
        return data;
    }

    render() {
        console.log(this.state.data);
        //console.log(data);
        return (
            <div style={{width: '95vw', display: 'flex', justifyContent: 'right'  }}>
                <div className='Container'>
                {this.state.data.length != 0 ? <Chart data={this.state.data} /> : null}
                </div>
            </div>
            
        );
    };
}

//Exportación de componente:
export default Inicio;