import { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

//Iconos
import { AiOutlineSearch, AiFillEye } from "react-icons/ai";

//Componentes
import Details from "../Details/Details"

//Archivo de configuración
import { environment } from '../../config/settings';

class Sent extends Component {

    state = {
        correspondencias: [],
        dependencias: [],
        corresFiltradas: [],
        keyword: '',
        filtroTipo: 'fk_TipoCo',
        filtroFecha: 'fechaEmisión',
        filtroDepen: 'fk_DependenciaD',
        filtroEstado: 'fk_estatusco'
    }

    componentDidMount() {
        this.getSentCorrespondence();
        this.getDependencies();
    }

    getSentCorrespondence() {
        axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
            this.setState({ correspondencias: res.data });
            this.setState({ corresFiltradas: res.data });
            console.log(this.state.correspondencias);
        }).catch(error => {
            console.log(error.message);
        });
    }

    seeDetails = (id) => {
        ReactDOM.render(<Details idcor={id} tipo={1} />, document.getElementById('root'));
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (event) => {
        await this.setState({ keyword: event.target.value });
        let filtro = this.state.corresFiltradas.filter(user => user.usuarioD.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.state.correspondencias = filtro;
        this.getDependencies();
    }

    handleFilter = async (event) => {
        document.getElementById("keyword").value = "";
        switch (event.target.id) {
            case "tipo":
                this.state.filtroTipo = event.target.value;
                break;
            case "estado":
                this.state.filtroEstado = event.target.value;
                break;
            case "fecha":
                if (event.target.value === "") {
                    this.state.filtroFecha = "fechaEmisión";
                    break;
                }
                this.state.filtroFecha = '"' + event.target.value + '"';
                break;
            case "dependencia":
                this.state.filtroDepen = event.target.value;
                break;
            default:
                break;
        }
        console.log(this.state);
        await axios.get(`${environment.urlServer}/correspondence/filterSent/${this.state.filtroEstado}/${this.state.filtroTipo}/${this.state.filtroFecha}/${this.state.filtroDepen}/${localStorage.getItem("idusuario")}`).then(res => {
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
            <div className="sentcontent">

                {/* TITULO DE PÁGINA */}
                <div className="buttonBack">
                    <p className="TitlePage">Enviados</p>
                </div>

                <br></br>

                {/* BARRA DE BÚSQUEDA */}
                <div className="sentsearch">
                    <div className="icon-search">
                        <AiOutlineSearch />
                    </div>

                    <input
                        type='text'
                        placeholder="Búsqueda de remitente..."
                        name="keyword"
                        id="keyword"
                        onChange={this.handleChange}>
                    </input>
                </div>

                <br></br>

                {/* FILTROS */}
                <div className="filtersDiv">

                    {/* Filtro por dependencia */}
                    <div className="filterInd">
                        <label className="info_para">Filtrar por dependencia</label>
                        <select name="deps" id="dependencia" onChange={this.handleFilter}>
                            <option value="fk_DependenciaD">Selecciona Dependencia</option>
                            {this.state.dependencias.map(elemento => (
                                <option onChange={this.change} key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por fecha de emisión */}
                    <div className="filterInd">
                        <label className="info_para">Filtrar por fecha de emisión</label>
                        <input type="date" id="fecha" label="Filtrar por fecha" onChange={this.handleFilter}></input>
                    </div>
                </div>

                <br></br>

                {/* FILTROS PARA TIPO DE CORRESPONDENCIA */}
                <div className="filters_type--sent">

                    {/* Filtro por estatus de correspondencia */}
                    <div className="filtersbtn">
                        <button value="fk_estatusco" id="estado" className="btnall" onClick={this.handleFilter}>Todos</button>
                        <button value="2" id="estado" className="btnsent" onClick={this.handleFilter}>Enviados</button>
                        <button value="1" id="estado" className="btnproc" onClick={this.handleFilter}>En Proceso</button>
                        <button value="3" id="estado" className="btnstore" onClick={this.handleFilter}>Archivados</button>
                    </div>

                    {/* Filtro por tipo de correspondencia */}
                    <div className="filtersbtn">
                        <button value="fk_TipoCo" id="tipo" className="btnall_type--c" onClick={this.handleFilter}>Todos</button>
                        <button value="1" id="tipo" className="btn_info--c" onClick={this.handleFilter}>Informativos</button>
                        <button value="2" id="tipo" className="btn_req--c" onClick={this.handleFilter}>Requerimentos</button>
                        <button value="3" id="tipo" className="btn_cop--c" onClick={this.handleFilter}>Copias</button>
                    </div>
                </div>

                <br></br>

                {this.state.correspondencias.length === 0 ? <h2>Sin enviados</h2> : ""}

                <table>
                    <tbody>
                        {this.state.correspondencias.map(elemento => (
                            <tr className="sentrow" onClick={() => this.seeDetails(elemento.id_Correspondencia)}>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className="info_para"><span>Para: </span>{elemento.usuarioD}</p>
                                        <p className="info_para"><span>Fecha: </span>
                                            {new Date(elemento.fechaEmisión).getUTCDate() >= 10 ? new Date(elemento.fechaEmisión).getUTCDate() : "0" + new Date(elemento.fechaEmisión).getUTCDate()}/
                                            {new Date(elemento.fechaEmisión).toLocaleString('default', { month: 'short' })}/
                                            {new Date(elemento.fechaEmisión).getFullYear()}
                                        </p>
                                    </div>

                                    <p className="info_para"><span>Asunto: </span>{elemento.asunto}</p>
                                    {/* <p className="info_para" style={{marginTop:"1rem"}}>{elemento.descripción}</p> */}

                                </td>

                                <td style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p className="info_para">{elemento.estatus}</p>

                                    {
                                        elemento.archivo === null ?
                                            <a href="" className="pdfLookGray">
                                                <AiFillEye />
                                            </a>
                                            : <a href={environment.urlServer + "/files/" + elemento.archivo} className="pdfLookBlue">
                                                <AiFillEye />
                                            </a>
                                    }
                                </td>


                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Sent;