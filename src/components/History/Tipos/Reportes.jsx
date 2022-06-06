//@HOME

//Imports
import { Component } from "react";
import axios from 'axios';
import ReactDOM from 'react-dom';

import { environment } from '../../../config/settings';
import moment from 'moment';
import {IoChevronBackOutline} from 'react-icons/io5';
import History from '../History'
import {AiFillPrinter} from 'react-icons/ai'
import './Reportes.css';
import { height } from "@mui/system";



const usuarioId = localStorage.getItem("idusuario");

class Reportes extends Component {


  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      allOriginData: [],
      scrolleable : true
    };
  }
  componentDidMount() {
    this.getAll().then(res => this.setState({ allData: res, allOriginData: res }));
  }

  async getAll() {
    return axios.get(`${environment.urlServer}/correspondence/getAllFromUser/${usuarioId}`).then(res => {
      return res.data;
    }).catch(error => {
      //////console.log(error.message);
    });
  } 
  handleClick(e) {
    e.preventDefault();
    ReactDOM.render(<History />, document.getElementById('root'));
  };

  

  render() {
    //console.log(this.state.data);
    ////console.log(data);

    const imprimir = async (e) => {
      await this.setState({"scrolleable" : false});
      await window.print();
      await this.setState({"scrolleable" : true});
  
      
    }

    const data = this.state.allOriginData;
    const filterByDate = async (e) => {
      console.log(e.target.value)
      if (e.target.value.length > 0) {
        
        //console.log(data);
        console.log((e.target.value));
        console.log(new Date(data[0]["fechaRecepción"]));
        
        let filterInfo = data.filter((_data) => moment(_data.fechaRecepción).isSame((e.target.value), 'day'));
        console.log(filterInfo);
        this.setState({allData : filterInfo});
      } else {
        this.setState({allData : data});
      }
    }
    const filterByState = async (e) => {
        var status = e.target.id;
        const data = this.state.allOriginData;
        if(status == "all") {
            this.setState({allData : data});
        } else {
            const data = this.state.allOriginData;
            let filterInfo = data.filter((_data) => _data.estatus == status);
            console.log(filterInfo);
            this.setState({allData : filterInfo});
        }
        
    };
    
    



    return (
      <div id="mainContent" style={this.state.scrolleable ? {overflow: "scroll",
      height: "90vh",
      padding: "1em"} : {height : "100%"}}>
        <div className="buttonBack" style={{ cursor: "pointer" }} onClick={this.handleClick}>
          <IoChevronBackOutline />
          <h3 style={{cursor: "pointer"}} className="fontRounded">Volver</h3>
        </div>
        <br />
        <div className='' style={{width:"100%"}}>
            <div className="users__title--view">
                <p>Reportes</p>
            </div>
                    
        <div className='user_sub--view'>
            <p>Filtrado para búsqueda</p>
        </div>
        <div className='roles-filter--user'>
            <div>
                <button id="all" className='btn_all' onClick={filterByState}>
                    Todos
                </button>
                </div>

            <div>
                <button id="Enviado" value="1" className='btn_admin' onClick={filterByState}>
                    Enviados
                </button>
            </div>

            <div>
                <button id="Archivado" value="2" className='btn_capture' onClick={filterByState}>
                    Archivados
                </button>
            </div>

            <div>
                <button id="En proceso" value="1" className='btn_remitente' onClick={filterByState}>
                    En Proceso
                </button>
            </div>
        </div>
        <br />
        <div id='div1'>
            <div className="filterInd" style={{textAlign: "left"}}>
                <label style={{paddingRight: "1em"}} className="info_de">Filtrar por fecha de emisión</label>
                <input type="date" id="fecha" label="Filtrar por fecha" onChange={filterByDate}></input>
            </div>
            <div onClick={imprimir} style={{textAlign: "right", cursor: "pointer"}} className="info_de">
              <label style={{verticalAlign: "super",
    paddingRight: "0.2em", cursor:"pointer"}}>Imprimir</label>
              <AiFillPrinter/>
            </div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Para</th>
                        <th scope="col">De</th>
                        <th>Fecha</th>
                        <th>Estatus</th>
                        <th>Num. Oficio</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                {this.state.allData.map(elemento => (
                        <tr className="tdata">
                            <td>{elemento.id_Correspondencia}</td>                                            
                            <td>{elemento.usuarioD}</td>
                            <td>{elemento.usuarioO}</td>
                            <td>{new Date(elemento.fechaRecepción).getDate() + "/" + (new Date(elemento.fechaRecepción).getMonth() + 1) + "/" + new Date(elemento.fechaRecepción).getFullYear()}</td>
                            <td>{elemento.estatus}</td>
                            <td>{elemento.numOficio}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>                        
        </div>
      </div>
    );
  };


}

export default Reportes;