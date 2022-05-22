//@HOME

//Imports
import { Component } from "react";
import axios from 'axios';

import { Chart } from './Chart';
import { environment } from '../../config/settings';
import moment from 'moment';

const usuarioId = localStorage.getItem("idusuario");

/*
export const data = {
  labels: [`Total de mensajes: 5531`],
  datasets: [
    {
      label: "Mensajes de recibidos",
      data: [2],
      backgroundColor: "rgba(53, 162, 235, 0.2)",
      borderColor: "rgba(53, 162, 235, 1)",
      borderWidth: 1
    },
    {
      label: "Mensajes enviados",
      data: [5],
      backgroundColor: "rgba(74, 191, 133, 0.2)",
      borderColor: "rgba(74, 191, 133, 1)",
      borderWidth: 1
    },
    {
      label: "Mensajes archivados",
      data: [2],
      backgroundColor: "rgba(255, 46, 91, 0.2)",
      borderColor: "rgba(255, 46, 91, 1)",
      borderWidth: 1
    },
    {
      label: "Mensajes en proceso",
      data: [1],
      backgroundColor: "rgba(243, 201, 94, 0.2)",
      borderColor: "rgba(243, 201, 94, 1)",
      borderWidth: 1
    }
  ]
};*/

class Inicio extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      originalData: [],
      originalData2: [],
      recivedMails: [],
      sentMails: []
    };
  }
  componentDidMount() {
    this.getDataFirstTab().then(res => this.setState({ data: res, originalData: res }));
    this.getDataSecondTab().then(res => this.setState({ data2: res, originalData2: res }));

    this.getRecivedCount().then(res => this.setState({ recivedMails: res }));
    this.getSentCount().then(res => this.setState({ sentMails: res }));
  }

  async getRecivedCount() {
    return axios.get(`${environment.urlServer}/correspondence/getReceived/${localStorage.getItem("idusuario")}`).then(res => {
      return res.data;
    }).catch(error => {
      //////console.log(error.message);
    });
  }

  async getSentCount() {

    return axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
      ////console.log(res.data.length);
      return res.data;
    }).catch(error => {
      //console.log(error.message);
      return null;
    });
  };

  async getStatusMail(status) {
    return axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
      //console.log(res.data)
      var filter = res.data.filter((data) => data.fk_estatusco == status);
      //console.log(filter)
      return filter;
    }).catch(error => {
      //console.log(error.message);
    });
  }


  async getDataFirstTab(info) {
    if (!info) {
      const processMail = await this.getStatusMail("1");
      const archivadosMail = await this.getStatusMail("3");

      ////console.log(processMail);

      const data = {
        labels: [`Total de mensajes: ${this.state.recivedMails.length + this.state.sentMails.length}`],
        datasets: [
          {
            label: "Mensajes recibidos",
            data: [this.state.recivedMails.length],
            backgroundColor: "rgba(53, 162, 235, 0.2)",
            borderColor: "rgba(53, 162, 235, 1)",
            borderWidth: 1
          },
          {
            label: "Mensajes enviados",
            data: [this.state.sentMails.length],
            backgroundColor: "rgba(74, 191, 133, 0.2)",
            borderColor: "rgba(74, 191, 133, 1)",
            borderWidth: 1
          },
          {
            label: "Mensajes archivados",
            data: [archivadosMail.length],
            backgroundColor: "rgba(255, 46, 91, 0.2)",
            borderColor: "rgba(255, 46, 91, 1)",
            borderWidth: 1
          },
          {
            label: "Mensajes en proceso",
            data: [processMail.length],
            backgroundColor: "rgba(243, 201, 94, 0.2)",
            borderColor: "rgba(243, 201, 94, 1)",
            borderWidth: 1
          }
        ]
      };
      return data
    } else {

      ////console.log(processMail);

      const data = {
        labels: [`Total de mensajes: ${info.total}`],
        datasets: [
          {
            label: "Mensajes recibidos",
            data: [info.recived],
            backgroundColor: "rgba(53, 162, 235, 0.2)",
            borderColor: "rgba(53, 162, 235, 1)",
            borderWidth: 1
          },
          {
            label: "Mensajes enviados",
            data: [info.send],
            backgroundColor: "rgba(74, 191, 133, 0.2)",
            borderColor: "rgba(74, 191, 133, 1)",
            borderWidth: 1
          },
          {
            label: "Mensajes archivados",
            data: [info.archivados],
            backgroundColor: "rgba(255, 46, 91, 0.2)",
            borderColor: "rgba(255, 46, 91, 1)",
            borderWidth: 1
          },
          {
            label: "Mensajes en proceso",
            data: [info.process],
            backgroundColor: "rgba(243, 201, 94, 0.2)",
            borderColor: "rgba(243, 201, 94, 1)",
            borderWidth: 1
          }
        ]
      };
      return data
    }

  }

  async getRecivedCorrespondenceTypeCount(idCorrespondence) {
    return axios.get(`${environment.urlServer}/correspondence/getReceived/${localStorage.getItem("idusuario")}`).then(res => {
      var filter = res.data.filter((data) => data.fk_TipoCo == idCorrespondence);
      return filter;
    }).catch(error => {
      //console.log(error.message);
    });
  }

  async getSentCorrespondenceTypeCount(idCorrespondence) {
    return axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
      var filter = res.data.filter((data) => data.fk_TipoCo == idCorrespondence);
      return filter;
    }).catch(error => {
      //console.log(error.message);
    });
  }

  async getDataSecondTab(info) {
    if (!info) {
      const recivedInformativo = await this.getRecivedCorrespondenceTypeCount(1);
      const recivedRequerimiento = await this.getRecivedCorrespondenceTypeCount(2);
      const recivedCopia = await this.getRecivedCorrespondenceTypeCount(3);

      const sentInformativo = await this.getSentCorrespondenceTypeCount(1);
      const sentRequerimiento = await this.getSentCorrespondenceTypeCount(2);
      const sentCopia = await this.getSentCorrespondenceTypeCount(3);


      ////console.log(processMail);

      const data = {
        labels: [`Tipo de correspondencia`],
        datasets: [
          {
            label: "Informativo",
            data: [recivedInformativo.length + sentInformativo.length],
            backgroundColor: "rgba(53, 162, 235, 0.2)",
            borderColor: "rgba(53, 162, 235, 1)",
            borderWidth: 1
          },
          {
            label: "Requerimiento",
            data: [recivedRequerimiento.length + sentRequerimiento.length],
            backgroundColor: "rgba(74, 191, 133, 0.2)",
            borderColor: "rgba(74, 191, 133, 1)",
            borderWidth: 1
          },
          {
            label: "Copia",
            data: [recivedCopia.length + sentCopia.length],
            backgroundColor: "rgba(255, 46, 91, 0.2)",
            borderColor: "rgba(255, 46, 91, 1)",
            borderWidth: 1
          }
        ]
      };
      return data
    } else {

      const data = {
        labels: [`Tipo de correspondencia`],
        datasets: [
          {
            label: "Informativo",
            data: [info.informative],
            backgroundColor: "rgba(53, 162, 235, 0.2)",
            borderColor: "rgba(53, 162, 235, 1)",
            borderWidth: 1
          },
          {
            label: "Requerimiento",
            data: [info.requerimiento],
            backgroundColor: "rgba(74, 191, 133, 0.2)",
            borderColor: "rgba(74, 191, 133, 1)",
            borderWidth: 1
          },
          {
            label: "Copia",
            data: [info.copia],
            backgroundColor: "rgba(255, 46, 91, 0.2)",
            borderColor: "rgba(255, 46, 91, 1)",
            borderWidth: 1
          }
        ]
      };
      return data
    }


  }

  render() {
    //console.log(this.state.data);
    ////console.log(data);
    const filterFirstChart = async (e) => {

      var sentMails = this.state.sentMails;
      var recivedMails = this.state.recivedMails;
      var today = new Date();

      var filter = e.target.value;
      if (filter == "all") {
        //console.log("filtramos todos");
        ////console.log(this.state.originalData);
        this.setState({ data: this.state.originalData })
      }
      if (filter == "today") {
        //console.log(this.state.sentMails);

        var filterSentMails = sentMails.filter((data) => moment(data["fechaEmisión"]).isSame(today, 'day'));
        var filterRecivedMails = recivedMails.filter((data) => moment(data["fechaRecepción"]).isSame(today, 'day'));

        var filteredSentProcess = filterSentMails.filter((data) => 1 == data.fk_estatusco);
        var filteredSentArchived = filterSentMails.filter((data) => 3 == data.fk_estatusco);

        var filteredRecivedInProcess = filterRecivedMails.filter((data) => 1 == data.fk_estatusco);
        var filteredRecivedArchived = filterRecivedMails.filter((data) => 3 == data.fk_estatusco);
        const infoArray = {
          send: filterSentMails.length,
          recived: filterRecivedMails.length,
          archivados: filteredSentArchived.length,
          process: filteredSentProcess.length,
          total: filterSentMails.length + filterRecivedMails.length
        }
        // console.log(infoArray);
        const newData = await this.getDataFirstTab(infoArray)
        // console.log(newData);
        this.setState({ data: newData });

      }
      if (filter == "thisWeek") {

        var filterSentMails = sentMails.filter((data) => moment(data["fechaEmisión"]).isSame(today, 'week'));
        var filterRecivedMails = recivedMails.filter((data) => new Date(data["fechaRecepción"]).getDate() >= today.getDate() - 7 && new Date(data["fechaRecepción"]).getMonth() === today.getMonth());

        var filteredSentProcess = filterSentMails.filter((data) => 1 == data.fk_estatusco);
        var filteredSentArchived = filterSentMails.filter((data) => 3 == data.fk_estatusco);

        var filteredRecivedInProcess = filterRecivedMails.filter((data) => 1 == data.fk_estatusco);
        var filteredRecivedArchived = filterRecivedMails.filter((data) => 3 == data.fk_estatusco);
        // console.log(filterSentMails);
        const infoArray = {
          send: filterSentMails.length,
          recived: filterRecivedMails.length,
          archivados: filteredSentArchived.length,
          process: filteredSentProcess.length,
          total: filterSentMails.length + filterRecivedMails.length
        }
        // console.log(infoArray);
        const newData = await this.getDataFirstTab(infoArray)
        // console.log(newData);
        this.setState({ data: newData });
      }
      if (filter == "thisMonth") {

        var filterSentMails = sentMails.filter((data) => moment(data["fechaEmisión"]).isSame(today, 'month'));
        var filterRecivedMails = recivedMails.filter((data) => moment(data["fechaRecepción"]).isSame(today, 'month'));

        var filteredSentProcess = filterSentMails.filter((data) => 1 == data.fk_estatusco);
        var filteredSentArchived = filterSentMails.filter((data) => 3 == data.fk_estatusco);

        var filteredRecivedInProcess = filterRecivedMails.filter((data) => 1 == data.fk_estatusco);
        var filteredRecivedArchived = filterRecivedMails.filter((data) => 3 == data.fk_estatusco);

        const infoArray = {
          send: filterSentMails.length,
          recived: filterRecivedMails.length,
          archivados: filteredSentArchived.length,
          process: filteredSentProcess.length,
          total: filterSentMails.length + filterRecivedMails.length
        }
        // console.log(infoArray);
        const newData = await this.getDataFirstTab(infoArray)
        // console.log(newData);
        this.setState({ data: newData });
      }
    }

    const filterSecondChart = async (e) => {
      var filter = e.target.value;
      var sentMails = this.state.sentMails;
      var recivedMails = this.state.recivedMails;
      var today = new Date();

      if (filter == "all") {
        //console.log("filtramos todos");
        ////console.log(this.state.originalData);
        this.setState({ data2: this.state.originalData2 })
      }
      if (filter == "today") {
        //console.log(this.state.sentMails);

        var filterSentMails = sentMails.filter((data) => moment(data["fechaEmisión"]).isSame(today, 'day'));
        var filterRecivedMails = recivedMails.filter((data) => moment(data["fechaRecepción"]).isSame(today, 'day'));


        var filterSentInformativeMails = sentMails.filter((data) => data.fk_TipoCo == 1 && moment(data["fechaEmisión"]).isSame(today, 'day'));
        var filterRecivedInformativeMails = recivedMails.filter((data) => data.fk_TipoCo == 1 && moment(data["fechaRecepción"]).isSame(today, 'day'));

        var filterSentRequerimientoMails = sentMails.filter((data) => data.fk_TipoCo == 2 && moment(data["fechaEmisión"]).isSame(today, 'day'));
        var filterRecivedRequerimientoMails = recivedMails.filter((data) => data.fk_TipoCo == 2 && moment(data["fechaRecepción"]).isSame(today, 'day'));

        var filterSentCopia = sentMails.filter((data) => data.fk_TipoCo == 3 && moment(data["fechaEmisión"]).isSame(today, 'day'));
        var filterRecivedCopia = recivedMails.filter((data) => data.fk_TipoCo == 3 && moment(data["fechaRecepción"]).isSame(today, 'day'));

        const infoArray = {
          informative: filterSentInformativeMails.length + filterRecivedInformativeMails.length,
          requerimiento: filterSentRequerimientoMails.length + filterRecivedRequerimientoMails.length,
          copia: filterSentCopia.length + filterRecivedCopia.length,
          total: filterSentMails.length + filterRecivedMails.length
        };



        const newData = await this.getDataSecondTab(infoArray)
        //console.log(newData);
        this.setState({ data2: newData });



      }

      if (filter == "thisWeek") {

        var filterSentMails = sentMails.filter((data) => moment(data["fechaEmisión"]).isSame(today, 'week'));
        var filterRecivedMails = recivedMails.filter((data) => moment(data["fechaRecepción"]).isSame(today, 'week'));


        var filterSentInformativeMails = sentMails.filter((data) => data.fk_TipoCo == 1 && moment(data["fechaEmisión"]).isSame(today, 'week'));
        var filterRecivedInformativeMails = recivedMails.filter((data) => data.fk_TipoCo == 1 && moment(data["fechaRecepción"]).isSame(today, 'week'));

        var filterSentRequerimientoMails = sentMails.filter((data) => data.fk_TipoCo == 2 && moment(data["fechaEmisión"]).isSame(today, 'week'));
        var filterRecivedRequerimientoMails = recivedMails.filter((data) => data.fk_TipoCo == 2 && moment(data["fechaRecepción"]).isSame(today, 'week'));

        var filterSentCopia = sentMails.filter((data) => data.fk_TipoCo == 3 && moment(data["fechaEmisión"]).isSame(today, 'week'));
        var filterRecivedCopia = recivedMails.filter((data) => data.fk_TipoCo == 3 && moment(data["fechaRecepción"]).isSame(today, 'week'));

        const infoArray = {
          informative: filterSentInformativeMails.length + filterRecivedInformativeMails.length,
          requerimiento: filterSentRequerimientoMails.length + filterRecivedRequerimientoMails.length,
          copia: filterSentCopia.length + filterRecivedCopia.length,
          total: filterSentMails.length + filterRecivedMails.length
        };



        const newData = await this.getDataSecondTab(infoArray)
        //console.log(newData);
        this.setState({ data2: newData });
      }

      if (filter == "thisMonth") {
        var filterSentMails = sentMails.filter((data) => moment(data["fechaEmisión"]).isSame(today, 'month'));
        var filterRecivedMails = recivedMails.filter((data) => moment(data["fechaRecepción"]).isSame(today, 'month'));


        var filterSentInformativeMails = sentMails.filter((data) => data.fk_TipoCo == 1 && moment(data["fechaEmisión"]).isSame(today, 'month'));
        var filterRecivedInformativeMails = recivedMails.filter((data) => data.fk_TipoCo == 1 && moment(data["fechaRecepción"]).isSame(today, 'month'));

        var filterSentRequerimientoMails = sentMails.filter((data) => data.fk_TipoCo == 2 && moment(data["fechaEmisión"]).isSame(today, 'month'));
        var filterRecivedRequerimientoMails = recivedMails.filter((data) => data.fk_TipoCo == 2 && moment(data["fechaRecepción"]).isSame(today, 'month'));

        var filterSentCopia = sentMails.filter((data) => data.fk_TipoCo == 3 && moment(data["fechaEmisión"]).isSame(today, 'month'));
        var filterRecivedCopia = recivedMails.filter((data) => data.fk_TipoCo == 3 && moment(data["fechaRecepción"]).isSame(today, 'month'));

        const infoArray = {
          informative: filterSentInformativeMails.length + filterRecivedInformativeMails.length,
          requerimiento: filterSentRequerimientoMails.length + filterRecivedRequerimientoMails.length,
          copia: filterSentCopia.length + filterRecivedCopia.length,
          total: filterSentMails.length + filterRecivedMails.length
        };



        const newData = await this.getDataSecondTab(infoArray)
        //console.log(newData);
        this.setState({ data2: newData });

      }

    }


    return (
      <div>
        <div className='Container'>
          <div className="buttonBack">
            <p className="TitlePage">Histórico</p>
          </div>
          <br></br>
          <div className='dateSelector'>
            <p for="date" className="filter-text">Filtrar por: </p>
            <select name="date" id="date" onChange={(e) => filterFirstChart(e)}>
              <option value="all">Todos</option>
              <option value="today">Hoy</option>
              <option value="thisWeek">Esta semana</option>
              <option value="thisMonth">Este mes</option>
            </select>
          </div>
          <div className='chart'>
            {this.state.data.length != 0 ? <Chart data={this.state.data} title={"Resumen de correspondencia"} /> : null}
          </div>
        </div>
        <div className='Container'>
          <div className='dateSelector'>
            <p for="date" className="filter-text">Filtrar por: </p>
            <select name="date" id="date" onChange={(e) => filterSecondChart(e)}>
              <option value="all">Todos</option>
              <option value="today">Hoy</option>
              <option value="thisWeek">Esta semana</option>
              <option value="thisMonth">Este mes</option>
            </select>
          </div>

          <div className='chart'>
            {this.state.data2.length != 0 ? <Chart data={this.state.data2} title={"Resumen por tipo"} /> : null}
          </div>
        </div>
      </div>
    );
  };


}

export default Inicio;