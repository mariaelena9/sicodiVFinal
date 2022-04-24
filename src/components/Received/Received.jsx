import { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

//Componentes
import Details from "../Details/Details"

//Iconos
import { AiOutlineSearch } from "react-icons/ai";

//Archivo de configuracion
import { environment } from '../../config/settings';

class Received extends Component {
    state = {
        correspondencias: [],
        corresFiltradas: [],
        keyword: ''
    }

    componentDidMount() {
        this.getReceivedCorrespondence();
    }

    seeDetails = (id) => {
        ReactDOM.render(<Details idcor={id} />, document.getElementById('root'));
    }

    getReceivedCorrespondence() {
        axios.get(`${environment.urlServer}/correspondence/getReceived/${localStorage.getItem("idusuario")}`).then(res => {
            this.setState({ correspondencias: res.data });
            this.setState({ corresFiltradas: res.data });
            console.log(this.state.correspondencias);
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <div className="sentcontent">
                <div className="sentsearch">
                    <div className="icon-search"> <AiOutlineSearch /> </div>
                    <input type='text' placeholder="Buscar en toda la correspondencia" name="keyword" id="keyword" onChange={this.handleChange}></input>
                </div>

                <br />
                <div className="filtersbtn">
                    <button value="0" className="btnall" onClick={this.handleFilter}>Todos</button>
                    <button value="1" className="btnproc" onClick={this.handleFilter}>Informativos</button>
                    <button value="2" className="btnsent" onClick={this.handleFilter}>Requerimentos</button>
                    <button value="3" className="btnstore" onClick={this.handleFilter}>Copias</button>
                </div>

                <br />

                {this.state.correspondencias.length === 0 ? <h2>Sin enviados</h2> : ""}

                <table>
                    <tbody>
                        {this.state.correspondencias.map(elemento => (
                            <tr className="sentrow" onClick={() => this.seeDetails(elemento.id_Correspondencia)}>
                                <td>
                                    <p><b>{elemento.usuarioO}</b></p>
                                    <p><b>{elemento.asunto}</b></p>
                                    <p>{elemento.descripción}</p>
                                </td>
                                <td style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p>{elemento.tipo}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Received;