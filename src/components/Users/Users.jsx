import React, { Component } from 'react'
import axios from 'axios'

//Iconos
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md';
import { AiFillEdit, AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
import { BsFillPersonFill, BsCursorText, BsFillTelephoneFill } from 'react-icons/bs';
import { ImOffice } from 'react-icons/im';

//Importación de Swal (Para alertas emergentes):
import Swal from 'sweetalert2';

//Importación de entorno de API
import { environment } from '../../config/settings';

//Componentes
import ModalUpdate from './ModalUpdate';
import ModalUserInfo from './ModalUserInfo';

class Users extends Component {
    constructor() {
        super();
        this.showModalU = this.showModalU.bind(this); //Mostrar modal
        this.hideModalU = this.hideModalU.bind(this); //Ocultar modal

        this.showModalInfo = this.showModalInfo.bind(this); //Mostrar modal
        this.hideModalInfo = this.hideModalInfo.bind(this); //Ocultar modal
    }

    //Estado Inicial
    state = {
        //Catalogos a utilizar:
        dependencias: [],
        departamentos: [],
        dptosFilter: [],
        roles: [],
        usuarios: [],
        filters: {
            dependencia: 'fkdependencia',
            departamento: 'fkdpto',
            rol: 'fkrol',
            estado: 'u.fkestatus'
        },
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
        this.getUsers();
        this.getRoles();
    }

    //FUNCIONES PARA EL CONTROL DE VENTANA MODAL
    showModalU = (dato) => {
        this.setState({ showU: true });

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

            this.getDepartments(res.data.iddependencia, "update");

        }).catch(error => {
            console.log(error.message);
        });
    };

    hideModalU = () => {
        this.setState({ showU: false });
    };

    //FUNCIONES PARA EL CONTROL DE VENTANA MODAL
    showModalInfo = (dato) => {
        this.setState({ showInfo: true });

        axios.get(`${environment.urlServer}/user/getuser/${dato}`).then(res => {
            this.setState({
                idUsuario: res.data.idusuario,
                name: res.data.UserName,
                phone: res.data.telefono,
                email: res.data.email,
                cargo: res.data.cargo,
                dependencia: res.data.Dependencia,
                departamento: res.data.Departamento,
                rol: res.data.rol
            });
        }).catch(error => {
            console.log(error.message);
        });
    };

    hideModalInfo = () => {
        this.setState({ showInfo: false });
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

    getRoles() {
        axios.get(`${environment.urlServer}/rol/getAllRoles`).then(
            res => {
                this.setState({ roles: res.data });
            }
        ).catch(
            error => {
                console.log(error.message);
            }
        );
    }

    //GET: [DEPARTAMENTOS]
    getDepartments(id, type) {
        axios.get(`${environment.urlServer}/department/getdepartment/${id}`).then(Response => {
            if (type == "filter") {
                this.setState({ dptosFilter: Response.data });
            } else {
                this.setState({ departamentos: Response.data });
            }
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

    getUsersByType(id) {
        axios.get(`${environment.urlServer}/user/getUsersByType/${id}`).then(
            res => {
                this.setState({ usuarios: res.data });
            }
        );
    }

    getUsersByStatus(st) {
        axios.get(`${environment.urlServer}/user/getUsersByStatus/${st}`).then(
            res => {
                this.setState({ usuarios: res.data });
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
                        this.state.departamentos = [];

                        document.getElementById("nombre").value = "";
                        document.getElementById("apMaterno").value = "";
                        document.getElementById("apPaterno").value = "";
                        document.getElementById("telefono").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("cargo").value = "";
                        document.getElementById("dependencia").value = "invalido";
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
                if (this.state.form.nombreU === "" ||
                    this.state.form.apPaternoU === "" ||
                    this.state.form.apMaternoU === "" ||
                    this.state.form.telefonoU === "" ||
                    this.state.form.emailU === "" ||
                    this.state.form.passwordU === '' ||
                    this.state.form.fkdptoU === 'invalido' || this.state.form.fkdptoU === '' ||
                    this.state.form.cargoU === '' ||
                    this.state.form.fkrolU === 'invalido' || this.state.fkrolU === ''
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

                Swal.fire(
                    'Actualizado!',
                    'Este usuario se modificó con éxito.',
                    'success'
                )
                axios.put(`${environment.urlServer}/user/updateUser/${this.state.formU.idusuario}`, this.state.formU).then(
                    res => {
                        this.hideModal();
                        this.getUsers();
                        this.state.departamentos = [];
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
        if (e.target.id === "dependencia") {
            if (e.target.value == "invalido") {
                this.setState({ departamentos: [] });
                return;
            }
            this.getDepartments(e.target.value, "register");
        }

        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    handleChangeU = async e => {
        e.persist();
        if (e.target.id === "iddependenciaU") {
            if (e.target.value == "invalido") {
                this.setState({ departamentos: [] });
                return;
            }
            this.getDepartments(e.target.value, "update");
        }

        await this.setState({
            formU: {
                ...this.state.formU,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.formU);
    }

    handleFilter = async (event) => {
        switch (event.target.id) {
            case "verTodos":
                this.state.filters.rol = "fkrol";
                this.state.filters.estado = "u.fkestatus";
                break;
            case "dependenciaFilter":
                this.state.filters.dependencia = event.target.value;

                if (event.target.value == "fkdependencia") {
                    this.setState({ dptosFilter: [] });
                    return;
                }

                this.getDepartments(event.target.value, "filter");
                break;
            case "dptoFilter":
                this.state.filters.departamento = event.target.value;
                break;
            case "rolFilter":
                this.state.filters.rol = event.target.value;
                break;
            case "estadoFilter":
                this.state.filters.estado = event.target.value;
                break;
            default:
                break;
        }
        this.getUsersFiltered();
    }

    getUsersFiltered() {
        axios.get(`${environment.urlServer}/user/getUsersFiltered/${this.state.filters.dependencia}/${this.state.filters.departamento}/${this.state.filters.rol}/${this.state.filters.estado}`).then(
            res => {
                this.setState({ usuarios: res.data });
            }
        );
    }

    render() {
        return (
            <div className='users'>
                <div className="headerDirectory">
                    <div className="buttonBack">
                        <p className="TitlePage">Administración de usuarios</p>
                    </div>
                </div>

                <br/>

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
                                                <select
                                                    id="dependencia"
                                                    onChange={this.handleChange}>
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
                                            {
                                                this.state.roles.map(
                                                    elemento => (
                                                        < option value={elemento.idrol} > {elemento.nombre}</option>
                                                    )
                                                )
                                            }
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
                                <select id="dependenciaFilter" onChange={this.handleFilter}>
                                    <option value="fkdependencia">Todas</option>
                                    {
                                        this.state.dependencias.map(
                                            dep => (
                                                <option value={dep.iddependencia}>{dep.nombre}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>

                            <div className='dpto-filter--user'>
                                <p>Departamento:</p>
                                <select id="dptoFilter" onChange={this.handleFilter}>
                                    <option value="fkdpto">Todos</option>
                                    {
                                        this.state.dptosFilter.map(
                                            dpto => (
                                                <option value={dpto.iddpto}>{dpto.nombre}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='roles-filter--user'>
                            <div>
                                <button id="verTodos" className='btn_all' onClick={this.handleFilter}>
                                    Todos
                                </button>
                            </div>

                            <div>
                                <button id="rolFilter" value="1" className='btn_admin' onClick={this.handleFilter}>
                                    Administradores
                                </button>
                            </div>

                            <div>
                                <button id="rolFilter" value="2" className='btn_capture' onClick={this.handleFilter}>
                                    Capturistas
                                </button>
                            </div>

                            <div>
                                <button id="estadoFilter" value="1" className='btn_remitente' onClick={this.handleFilter}>
                                    Activos
                                </button>
                            </div>

                            <div>
                                <button id="estadoFilter" value="2" className='btn_destinatario' onClick={this.handleFilter}>
                                    Inactivos
                                </button>
                            </div>
                        </div>

                        <div id='div1'>
                            <table class="table">
                                <thead class="thead">
                                    <tr>
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
                                            <td>{elemento.nombre} {elemento.apMaterno} {elemento.apPaterno}</td>
                                            <td>{elemento.email}</td>
                                            <td>{elemento.password}</td>
                                            <td>{elemento.roleName}</td>
                                            <td>{elemento.fkestatus === 1 ? "Activo" : "Inactivo"}</td>

                                            <td><button className='btn_edit--user' title='Editar' onClick={() => this.showModalU(elemento.idusuario)}><AiFillEdit /></button></td>
                                            <td><button className='btn_delete--user' title='Eliminar' onClick={() => this.deleteUser(elemento.idusuario)}><AiFillDelete /></button></td>
                                            <td><button className='btn_info--user' title='Info' onClick={() => this.showModalInfo(elemento.idusuario)}><AiFillInfoCircle /></button></td>

                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <ModalUpdate showU={this.state.showU} handleCloseU={this.hideModalU}>
                            <div className="modalContent">
                                <h1 style={{ textAlign: "center", width: "100%", borderBottom: "solid #780727 2px" }}>Modificación</h1>
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
                                                            name='iddependencia'
                                                            onChange={this.handleChangeU}
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
                                                    {
                                                        this.state.roles.map(
                                                            elemento => (
                                                                <option value={elemento.idrol}>{elemento.nombre}</option>
                                                            )
                                                        )
                                                    }
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

                        <ModalUserInfo showInfo={this.state.showInfo} handleCloseInfo={this.hideModalInfo}>
                            <div className="infoContent">
                                <h2 style={{ textAlign: "center", width: "100%", borderBottom: "solid #780727 2px", paddingBottom: "10px" }}>Información de usuario</h2>
                                <div className='cabeceraInfo'>
                                    <div className='personIcon'>
                                        <BsFillPersonFill />
                                    </div>
                                    <div className='infoGeneral'>
                                        <p><b>Nombre: </b>{this.state.name}</p>
                                        <p><b>Cargo: </b>{this.state.cargo}</p>
                                    </div>
                                </div>
                                <div className='infoPersonal'>
                                    <p><b>Teléfono: </b>{this.state.phone}</p>
                                    <p><b>Correo: </b>{this.state.email}</p>
                                </div>
                                <div className='infoEmpleado'>
                                    <p><b>Dependencia: </b>{this.state.dependencia}</p>
                                    <p><b>Departamento: </b>{this.state.departamento}</p>
                                </div>
                                <p className='infoTipo'><b>Usuario de tipo: </b>{this.state.rol}</p>
                            </div>
                        </ModalUserInfo>
                    </div>

                </div >

            </div >
        )
    }

}

export default Users;