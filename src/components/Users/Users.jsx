import React, { Component } from 'react'
import { ImPencil2, ImOffice } from 'react-icons/im'
import { ImDisplay } from 'react-icons/im'
import { MdModeEdit, MdOutlineAlternateEmail, MdPassword } from 'react-icons/md'
import { AiFillEdit, AiFillDelete, AiFillInfoCircle } from 'react-icons/ai'
import { BsCursorText, BsFillTelephoneFill } from 'react-icons/bs'
import { RiShieldUserFill, RiUserStarFill } from 'react-icons/ri'
import axios from 'axios'
//Importación de Swal (Para alertas emergentes):
import Swal from 'sweetalert2';
import { environment } from '../../config/settings'

import ModalUpdate from '../Users/ModalUpdate'



class Users extends Component {
    constructor() {
        super();
        this.showModal = this.showModal.bind(this); //Mostrar modal
        this.hideModal = this.hideModal.bind(this); //Ocultar modal
    }

    //Estado Inicial
    state = {
        //Catalogos a utilizar:
        dependencias: [],
        departamentos: [],
        roles: [],
        usuarios: [],
        form: {
            nombre: '',
            apMaterno: '',
            apPaterno: '',
            telefono: '',
            email: '',
            cargo: '',
            fkdpto: '',
            fkrol: '',
            password: ''
        },
        formU: {
            nombre: '',
            apMaterno: '',
            apPaterno: '',
            telefono: '',
            email: '',
            cargo: '',
            fkdpto: '',
            fkrol: '',
            password: '',
            iddependencia: ''
        }
    }

    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        this.getDependences(); //Función getDependence() -> Va a mostrar las dependencias
        this.getDepartments(); //Función getDepartments() -> Va a mostrar los departamentos
        this.getUsers();
    }

    //FUNCIONES PARA EL CONTROL DE VENTANA MODAL
    showModal = (dato) => {
        this.setState({ show: true });
        axios.get(`${environment.urlServer}/user/getUserById/${dato}`).then(res => {
            this.state.formU.idusuario = res.data.idusuario;
            this.state.formU.nombre = res.data.nombre;
            this.state.formU.apMaterno = res.data.apMaterno;
            this.state.formU.apPaterno = res.data.apPaterno;
            this.state.formU.telefono = res.data.telefono;
            this.state.formU.email = res.data.email;
            this.state.formU.cargo = res.data.cargo;
            this.state.formU.fkdpto = res.data.fkdpto;
            this.state.formU.fkrol = res.data.fkrol;
            this.state.formU.password = res.data.password;
            this.state.formU.iddependencia = res.data.iddependencia;

            console.log(this.state.formU);

            document.getElementById("nombreU").value = this.state.formU.nombre;
            document.getElementById("apMaternoU").value = this.state.formU.apMaterno;
            document.getElementById("apPaternoU").value = this.state.formU.apPaterno;
            document.getElementById("telefonoU").value = this.state.formU.telefono;
            document.getElementById("emailU").value = this.state.formU.email;
            document.getElementById("cargoU").value = this.state.formU.cargo;
            document.getElementById("fkdptoU").value = this.state.formU.fkdpto;
            document.getElementById("fkrolU").value = this.state.formU.fkrol;
            document.getElementById("passwordU").value = this.state.formU.password;
            document.getElementById("iddependenciaU").value = this.state.formU.iddependencia;

        }).catch(error => {
            console.log(error.message);
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    //==================== CONSULTAS GET  ====================

    //GET: [DEPENDENCIAS]
    getDependences() {
        axios.get(`${environment.urlServer}/dependence/getdependence`).then(Response => {
            this.setState({ dependencias: Response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //GET: [DEPARTAMENTOS]
    getDepartments() {
        axios.get(`${environment.urlServer}/department/getdepartment`).then(Response => {
            this.setState({ departamentos: Response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    getUsers = () => {
        axios.get(`${environment.urlServer}/user/getAllUsers`).then(
            res => {
                this.setState({ usuarios: res.data });
                console.log(this.state.usuarios);
            }
        );
    }

    //==================== CONSULTAS INSERT  ====================
    insertUser = (e) => {
        e.preventDefault();
        if (this.state.form.nombre === "" ||
            this.state.form.apPaterno === "" ||
            this.state.form.apMaterno === "" ||
            this.state.form.telefono === "" ||
            this.state.form.email === "" ||
            this.state.form.password === '' ||
            this.state.form.fkdpto === 'invalido' || this.state.form.fkdpto === '' ||
            this.state.form.cargo === '' ||
            this.state.form.fkrol === 'invalido' || this.state.fkrol === ''
        ) {
            Swal.fire({
                title: 'No se puede registrar',
                text: 'Porfavor complete todos los campos de forma correcta.',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Este usuario se guardará como está actualmente!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, espera',
            confirmButtonText: 'Sí, guardalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Registrado!',
                    'Este usuario se registró correctamente.',
                    'success'
                )
                axios.post(`${environment.urlServer}/user/insertuser`, this.state.form).then(
                    res => {
                        this.state.form.nombre = '';
                        this.state.form.apMaterno = '';
                        this.state.form.apPaterno = '';
                        this.state.form.telefono = '';
                        this.state.form.email = '';
                        this.state.form.cargo = '';
                        this.state.form.fkdpto = '';
                        this.state.form.fkrol = '';
                        this.state.form.password = '';

                        document.getElementById("nombre").value = "";
                        document.getElementById("apMaterno").value = "";
                        document.getElementById("apPaterno").value = "";
                        document.getElementById("telefono").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("cargo").value = "";
                        document.getElementById("fkdpto").value = "invalido";
                        document.getElementById("fkrol").value = "invalido";
                        document.getElementById("password").value = "";

                        this.getUsers();
                    }
                );
            }
        })

    }

    updateUser = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Estás a punto de actualizar la información de este usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, mejor no',
            confirmButtonText: 'Sí, estoy seguro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Actualizado!',
                    'Este usuario se modificó con éxito.',
                    'success'
                )
                axios.put(`${environment.urlServer}/user/updateUser/${this.state.formU.idusuario}`, this.state.formU).then(
                    res => {
                        this.hideModal();
                        this.getUsers();
                    }
                );
            }
        })
    }

    deleteUser = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Estás a punto de dar de baja a este usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, mejor no',
            confirmButtonText: 'Sí, elimínalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Este usuario se ha dado de baja.',
                    'success'
                )
                axios.put(`${environment.urlServer}/user/deleteUser/${id}`).then(
                    res => {
                        this.getUsers();
                    }
                );
            }
        })
    }

    //=========================================================
    /* @Michelle: componentDidMount()es un hook que se invoca justo después de que se haya montado un componente de React, 
            es decir, después del primer ciclo de vida de render().
        */

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    handleChangeU = async e => {
        e.persist();
        await this.setState({
            formU: {
                ...this.state.formU,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.formU);
    }

    render() {
        return (
            <div className='users'>
                <div className="users__title">
                    <p>Administrador de Usuarios</p>
                </div>

                <div className='tables__info'>
                    <div className='user__insert'>
                        <div className='usersform__title'>
                            <p>Añadir usuario</p>
                        </div>

                        <form className='users__form'>
                            <div>
                                <div>
                                    {/* Nombre Completo */}
                                    <div>
                                        <div className='user__insert-name'>
                                            <div className='icon-text'><BsCursorText /></div>
                                            <input
                                                type="text"
                                                placeholder='Nombre(s)'
                                                name="nombre"
                                                id="nombre"
                                                onChange={this.handleChange}
                                                value={this.state.form ? this.state.form.nombre : ''}
                                            />
                                        </div>
                                    </div>

                                    <div className='user_insert-apellidos'>
                                        <div className='user__insert-materno'>
                                            <div className='icon-text'><BsCursorText /></div>
                                            <input
                                                type="text"
                                                placeholder='Ap. Materno'
                                                name="apMaterno"
                                                id="apMaterno"
                                                onChange={this.handleChange}
                                                value={this.state.form ? this.state.form.apMaterno : ''} />
                                        </div>

                                        <div className='user__insert-paterno'>
                                            <div className='icon-text'><BsCursorText /></div>
                                            <input
                                                type="text"
                                                placeholder='Ap. Paterno'
                                                name="apPaterno"
                                                id="apPaterno"
                                                onChange={this.handleChange}
                                                value={this.state.form ? this.state.form.apPaterno : ''} />
                                        </div>
                                    </div>


                                    {/* Contacto */}
                                    <div className='user__insert-contact'>
                                        <div className='user__insert-tel'>
                                            <div className='icon-text'><BsFillTelephoneFill /></div>
                                            <input
                                                placeholder='telefono'
                                                type="tel"
                                                name="telefono"
                                                id="telefono"
                                                onChange={this.handleChange}
                                                value={this.state.form ? this.state.form.telefono : ''}
                                            />
                                        </div>

                                        <div className='user__insert-email'>
                                            <div className='icon-text'><MdOutlineAlternateEmail /></div>
                                            <input
                                                placeholder='correo'
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={this.handleChange}
                                                value={this.state.form ? this.state.form.email : ''}
                                            />
                                        </div>
                                    </div>

                                    {/*Dependencias */}
                                    <div className='user__insert-cargo'>
                                        <div className='user__insert-depen'>
                                            <div className='icon-text'><ImOffice /></div>
                                            <div className='user__insert-select'>
                                                <select>
                                                    <option selected value="invalido">Elegir dependencia...</option>
                                                    {this.state.dependencias.map(elemento => (
                                                        <option key={elemento.iddependencia}
                                                            value={elemento.iddependencia}
                                                        >
                                                            {elemento.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className='user__insert-depen'>
                                            <div className='icon-text'><ImOffice /></div>
                                            <div className='user__insert-select'>
                                                <select
                                                    name="fkdpto"
                                                    id="fkdpto"
                                                    onChange={this.handleChange}
                                                    value={this.state.form ? this.state.form.fkdpto : ''}>
                                                    <option selected value="invalido">Elegir departamento...</option>
                                                    {this.state.departamentos.map(elemento => (
                                                        <option key={elemento.iddpto}
                                                            value={elemento.iddpto}>
                                                            {elemento.nombre}
                                                        </option>

                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>

                            <div className='users__cargos'>
                                <div className='user__insert-name'>
                                    <div className='icon-text'><BsCursorText /></div>
                                    <input
                                        type="text"
                                        placeholder='Cargo'
                                        name="cargo"
                                        id="cargo"
                                        onChange={this.handleChange}
                                        value={this.state.form ? this.state.form.cargo : ''}
                                    />
                                </div>
                            </div>

                            <div className='users__roles'>

                                <div className='user__insert-rol'>
                                    <div className='icon-text'><ImOffice /></div>
                                    <div className='user__insert-select'>
                                        <select
                                            name="fkrol"
                                            id="fkrol"
                                            onChange={this.handleChange}
                                            value={this.state.form ? this.state.form.fkrol : ''}>
                                            <option selected>Elegir rol</option>
                                            <option value="1">One</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='user__insert-pass'>
                                    <div className='icon-text'><MdPassword /></div>
                                    <input
                                        type="text"
                                        placeholder='password'
                                        name="password"
                                        id="password"
                                        onChange={this.handleChange}
                                        value={this.state.form ? this.state.form.password : ''}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='btn__user'>
                                    <button className='btn__user--insert' onClick={this.insertUser}>Registrar</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* TABLA PARA VISUALIZAR USUARIOS */}
                    <div className='user__container'>
                        <div className="users__title--view">
                            <p>Lista de Usuarios</p>
                        </div>

                        <div className='user_sub--view'>
                            <p>Filtrado para búsqueda</p>
                        </div>

                        <div className='user-filter'>
                            <div className='dep-filter--user'>
                                <p>Dependencia:</p>
                                <select>
                                    <option value="iddpto">Todas</option>
                                </select>
                            </div>

                            <div className='dpto-filter--user'>
                                <p>Departamento:</p>
                                <select>
                                    <option value="iddpto">Todos</option>
                                </select>
                            </div>
                        </div>

                        <div className='roles-filter--user'>
                            <div>
                                <button className='btn_all'>
                                    <p>Todos</p>
                                </button>
                            </div>

                            <div>
                                <button className='btn_admin'>
                                    <p>Administradores</p>
                                </button>
                            </div>

                            <div>
                                <button className='btn_capture'>
                                    <p>Capturistas</p>
                                </button>
                            </div>

                            <div>
                                <button className='btn_remitente'>
                                    <p>Activos</p>
                                </button>
                            </div>

                            <div>
                                <button className='btn_destinatario'>
                                    <p>Inactivos</p>
                                </button>
                            </div>
                        </div>

                        <div id='div1'>
                            <table class="table">
                                <thead class="thead">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre Completo</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Contraseña</th>
                                        <th scope="col">Rol</th>
                                        <th>Estado</th>
                                        <th scope="col" colSpan={3}>Opciones</th>

                                    </tr>
                                </thead>
                                <tbody class="tbody">
                                    {this.state.usuarios.map(elemento => (
                                        <tr class="tdata">
                                            <td>{elemento.idusuario}</td>
                                            <td>{elemento.nombre} {elemento.apMaterno} {elemento.apPaterno}</td>
                                            <td>{elemento.email}</td>
                                            <td>{elemento.password}</td>
                                            <td>{elemento.fkrol}</td>
                                            <td>{elemento.fkestatus === 1 ? "Activo" : "Inactivo"}</td>

                                            <td><button className='btn_edit--user' title='Editar' onClick={() => this.showModal(elemento.idusuario)}><AiFillEdit /></button></td>
                                            <td><button className='btn_delete--user' title='Eliminar' onClick={() => this.deleteUser(elemento.idusuario)}><AiFillDelete /></button></td>
                                            <td><button className='btn_info--user' title='Info'><AiFillInfoCircle /></button></td>

                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <ModalUpdate show={this.state.show} handleClose={this.hideModal}>
                            <div className="modalContent">
                                <h1 style={{ textAlign: "center", width: "100%", borderBottom: "solid violet 2px" }}>Modificación</h1>
                                <form className='users__form'>
                                    <div className='user__insert--data'>
                                        <div className='user__insert-personal'>

                                            {/* Nombre Completo */}
                                            <div className='user__insert-contact_first'>
                                                <div className='user__insert-name'>
                                                    <div className='icon-text'><BsCursorText /></div>
                                                    <input
                                                        type="text"
                                                        placeholder='Nombre(s)'
                                                        name="nombre"
                                                        id="nombreU"
                                                        onChange={this.handleChangeU}
                                                        value={this.state.formU ? this.state.formU.nombre : ''}
                                                    />
                                                </div>

                                                <div className='user__insert-materno'>
                                                    <div className='icon-text'><BsCursorText /></div>
                                                    <input
                                                        type="text"
                                                        placeholder='Ap. Materno'
                                                        name="apMaterno"
                                                        id="apMaternoU"
                                                        onChange={this.handleChangeU}
                                                        value={this.state.formU ? this.state.formU.apMaterno : ''} />
                                                </div>

                                                <div className='user__insert-paterno'>
                                                    <div className='icon-text'><BsCursorText /></div>
                                                    <input
                                                        type="text"
                                                        placeholder='Ap. Paterno'
                                                        name="apPaterno"
                                                        id="apPaternoU"
                                                        onChange={this.handleChangeU}
                                                        value={this.state.formU ? this.state.formU.apPaterno : ''} />
                                                </div>
                                            </div>

                                            {/* Contacto */}
                                            <div className='user__insert-contact'>
                                                <div className='user__insert-tel'>
                                                    <div className='icon-text'><BsFillTelephoneFill /></div>
                                                    <input
                                                        placeholder='telefono'
                                                        type="tel"
                                                        name="telefono"
                                                        id="telefonoU"
                                                        onChange={this.handleChangeU}
                                                        value={this.state.formU ? this.state.formU.telefono : ''}
                                                    />
                                                </div>

                                                <div className='user__insert-email'>
                                                    <div className='icon-text'><MdOutlineAlternateEmail /></div>
                                                    <input
                                                        placeholder='correo'
                                                        type="email"
                                                        name="email"
                                                        id="emailU"
                                                        onChange={this.handleChangeU}
                                                        value={this.state.formU ? this.state.formU.email : ''}
                                                    />
                                                </div>

                                                <div className='user__insert-pass'>
                                                    <div className='icon-text'><MdPassword /></div>
                                                    <input
                                                        type="text"
                                                        placeholder='password'
                                                        name="password"
                                                        id="passwordU"
                                                        onChange={this.handleChangeU}
                                                        value={this.state.formU ? this.state.formU.password : ''}
                                                    />
                                                </div>
                                            </div>

                                            {/*Dependencias */}
                                            <div className='user__insert-cargo'>

                                                <div className='user__insert-depen'>
                                                    <div className='icon-text'><ImOffice /></div>
                                                    <div className='user__insert-select'>
                                                        <select
                                                            id="iddependenciaU"
                                                            value={this.state.formU ? this.state.formU.iddependencia : ''}>
                                                            <option selected value="invalido">Elegir dependencia...</option>
                                                            {this.state.dependencias.map(elemento => (
                                                                <option key={elemento.iddependencia}
                                                                    value={elemento.iddependencia}
                                                                >
                                                                    {elemento.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='user__insert-depen'>
                                                    <div className='icon-text'><ImOffice /></div>
                                                    <div className='user__insert-select'>
                                                        <select
                                                            name="fkdpto"
                                                            id="fkdptoU"
                                                            onChange={this.handleChangeU}
                                                            value={this.state.formU ? this.state.formU.fkdpto : ''}>
                                                            <option selected value="invalido">Elegir departamento...</option>
                                                            {this.state.departamentos.map(elemento => (
                                                                <option key={elemento.iddpto}
                                                                    value={elemento.iddpto}>
                                                                    {elemento.nombre}
                                                                </option>

                                                            ))}
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>

                                    <div className='users__cargos'>
                                        <div className='user__insert-materno'>
                                            <div className='icon-text'><BsCursorText /></div>
                                            <input
                                                type="text"
                                                placeholder='Cargo'
                                                name='cargo'
                                                id='cargoU'
                                                onChange={this.handleChangeU}
                                                value={this.state.formU ? this.state.formU.cargo : ''} />


                                        </div>

                                        <div className='user__insert-depen'>
                                            <div className='icon-text'><ImOffice /></div>
                                            <div className='user__insert-select'>
                                                <select
                                                    name="fkrol"
                                                    id="fkrolU"
                                                    onChange={this.handleChangeU}
                                                    value={this.state.formU ? this.state.formU.fkrol : ''}>
                                                    <option selected>Elegir rol</option>
                                                    <option value="1">One</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <div className='btn__user'>
                                            <button className='btn__user--insert' onClick={this.updateUser}>Actualizar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </ModalUpdate>
                    </div>

                </div>

            </div>
        )
    }

}

export default Users;