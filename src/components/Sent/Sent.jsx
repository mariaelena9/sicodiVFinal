import { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

//Iconos
import { AiOutlineSearch } from "react-icons/ai";

//Componentes
import Details from "../Details/Details"

//Archivo de configuración
import { environment } from '../../config/settings';

class Sent extends Component {

    state = {
        correspondencias: [],
        dependencias: [],
        corresFiltradas: [],
        keyword: ''
    }

    componentDidMount() {
        this.getSentCorrespondence();
    }

    getSentCorrespondence() {
        axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
            this.setState({ correspondencias: res.data });
            this.setState({ corresFiltradas: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    seeDetails = (id) => {
        ReactDOM.render(<Details idcor={id} />, document.getElementById('root'));
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (event) => {
        await this.setState({ keyword: event.target.value });
        let filtro = this.state.corresFiltradas.filter(user => user.usuarioD.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.state.correspondencias = filtro;
        this.getDependencies();
    }

    handleFilter = (event) => {
        if (event.target.value === "0") {
            this.getSentCorrespondence();
            return;
        }
        axios.get(`${environment.urlServer}/correspondence/filterSent/${event.target.value}`).then(res => {
            this.setState({ correspondencias: res.data });
            this.setState({ corresFiltradas: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    getDependencies = () => { //Consulta todas las dependencias de la BD
        axios.get(`${environment.urlServer}/dependence/getdependence`).then(res => {
            this.setState({ dependencias: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <div className="sentbody">
                <div className="sentcontent">
                    <div className="direction">
                        <div className="sentsearch">
                            <div className="icon-search"> <AiOutlineSearch /> </div>
                            <input type='text' placeholder="Buscar en toda la correspondencia" name="keyword" id="keyword" onChange={this.handleChange}></input>
                        </div>

                        <br />
                        <div className="filtersbtn">
                            <button value="0" className="btnall" onClick={this.handleFilter}>Todos</button>
                            <button value="1" className="btnproc" onClick={this.handleFilter}>Proceso</button>
                            <button value="2" className="btnsent" onClick={this.handleFilter}>Enviado</button>
                            <button value="3" className="btnstore" onClick={this.handleFilter}>Archivado</button>
                        </div>

                        <br />

                        {this.state.correspondencias.length === 0 ? <h2>Sin enviados</h2> : ""}

                        <table>
                            <tbody>
                                {this.state.correspondencias.map(elemento => (
                                    <tr className="sentrow" onClick={() => this.seeDetails(elemento.id_Correspondencia)}>
                                        <td>
                                            <p><b>{elemento.usuarioD}</b></p>
                                            <p><b>{elemento.asunto}</b></p>
                                            <p>{elemento.descripción}</p>
                                        </td>
                                        <td style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <p>{elemento.estatus}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sent;