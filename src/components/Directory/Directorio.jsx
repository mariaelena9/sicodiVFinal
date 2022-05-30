/* @DIRECTORIO */

//Importación de React:
import React, { Component, Fragment } from "react"; //Importación de Component y Fragment

//Importación del DOM:
import ReactDOM from "react-dom";

/*@Michelle: Axios está optimizado para facilitar el consumo de servicios web, API REST y que devuelvan datos JSON */
//Importación de axios:
import axios from 'axios';

//Importación de Swal (Para alertas emergentes):
import Swal from 'sweetalert2';

//Archivo de configuración
import { environment } from '../../config/settings';

//Importación de recursos (iconos):
import { FaUserTie } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";

//Importación de componentes
import Modal from './Modal.jsx';
import Digital from "../Correspondence/Formato/Digital";

//_Class Component_
class Directorio extends Component {
    //CONSTRUCTOR DEL COMPONENTE
    constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    //FUNCIONES PARA EL CONTROL DE VENTANA MODAL
    showModal = (dato) => {
        this.setState({ show: true });
        axios.get(`${environment.urlServer}/user/getuser/${dato}`).then(res => {
            this.setState({
                idUsuario: res.data.idusuario,
                fkdependencia: res.data.iddependencia,
                fkdpto: res.data.Departamento,
                name: res.data.UserName,
                email: res.data.email,
                depa: res.data.cargo,
                phone: res.data.telefono
            });
        }).catch(error => {
            console.log(error.message);
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    //=============================================================

    //ARREGLO DE ESTADO, CONTIENE LAS VARIABLES Y ARREGLOS UTILIZADOS EN EL COMPONENTE
    state = {
        data: [],
        data2: [],
        dependencias: [],
        keyword: '',
        form: {
            idUsuario: '',
            fkdpto: '',
            name: '',
            lastNameP: '',
            lastNameM: '',
            email: '',
            depa: '',
            phone: '',
        },
        show: false,
    }

    componentDidMount() { //Se ejecutará al momento de montar el componente
        this.getUser();
        this.getDependencies();
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (event) => {
        await this.setState({ keyword: event.target.value });
        this.state.data = this.state.data2.filter(user => user.nombre.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.getDependencies();
    }

    getUser = () => { //Consulta todos los usuarios de la BD
        axios.get(`${environment.urlServer}/user/getusers/${localStorage.getItem('idusuario')}`).then(res => {
            this.setState({ data: res.data }); //Resultado de consulta [original]
            this.setState({ data2: res.data }); //Resultado de consulta [copia]
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

    change = (event) => { //Al cambiar el combobox consulta los usuarios filtrados por dependencia
        document.getElementById("keyword").value = "";
        axios.get(`${environment.urlServer}/user/getUserByDep/${event.target.value}/${localStorage.getItem("idusuario")}`).then(res => {
            if (res.data === 'Sin resultados') {
                Swal.fire({
                    title: 'Ups!',
                    text: 'No hay usuarios registrados en esta dependencia',
                    icon: 'warning',
                    showConfirmButton: true
                })
                this.setState({ data: [] });
                this.setState({ data2: [] });
            } else {
                this.setState({ data: res.data });
                this.setState({ data2: res.data });
            }
        }).catch(error => {
            console.log(error.message);
        });
    }

    handleWriteTo = async (event) => {
        ReactDOM.render(<Digital data={event} />, document.getElementById('root'));
    }

    render() { //Renderiza los elementos gráficos del componente
        return (
            <Fragment>
                <div className="contentDirectory">
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <div className="modalContent">
                            <div className="modalName">
                                <p className="p-letter">{this.state.name}</p>
                                <BsFillPersonFill />
                            </div>
                            <p className="p-letter"><b>Departamento:</b> {this.state.fkdpto}</p>
                            <br></br>
                            <div className="modalEmail">
                                <div className="icon-modal"><BsEnvelopeFill /> </div>
                                <p className="p-letter">{this.state.email}</p>
                            </div>
                            <div className="modalPos">
                                <div className="icon-modal"><MdWork /></div>
                                <p className="p-letter">{this.state.depa}</p>
                            </div>
                            <div className="modalPhone">
                                <div className="icon-modal"><AiFillPhone /> </div>
                                <p className="p-letter">{this.state.phone}</p>
                            </div>
                            <div className='modalButton'>
                                <button type="button" onClick={() => this.handleWriteTo({ usuario: this.state.idUsuario, dependencia: this.state.fkdependencia })}>
                                    Escribir
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <div className="headerDirectory">
                        <div className="buttonBack">
                            <p className="TitlePage">Directorio</p>
                        </div>

                        <div className="Search">
                            <input type='text' placeholder="Nombre de contacto..." name="keyword" id="keyword" onChange={this.handleChange}></input>
                            <div className="icon-search"> <AiOutlineSearch /> </div>
                        </div>
                    </div>

                    <div className='directorio'>
                        <div className="filter">
                            <p className="filter-text">Dependencia: </p>
                            <select name="deps" id="depselect" onChange={this.change}>
                                <option value="iddpto">Selecciona Dependencia</option>
                                {this.state.dependencias.map(elemento => (
                                    <option onChange={this.change} key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <br />

                        {this.state.data.map(user => {
                            return (
                                <div className='Tarjeta'>

                                    <div className="img-contact">
                                        <FaUserTie />
                                    </div>

                                    <div className="info-contact">
                                        <div className="name-contact">
                                            <p><b>{user.nombre} {user.apMaterno} {user.apPaterno}</b></p>
                                        </div>

                                        <div className="email-contact">
                                            <p>{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="img-message" onClick={() => this.showModal(user.idusuario)}> <MdEmail /></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }
}

//Exportación del componente:
export default Directorio;