/* @DETALLE DE ASIGNACIÓN */

//Importación de React:
import { Component, Fragment } from "react"; //Importación de Component y Fragment

//Importación del DOM:
import ReactDOM from 'react-dom';

/* @Michelle: Axios está optimizado para facilitar el consumo de servicios web, API REST y que devuelvan datos JSON */
//Importación de axios:
import axios from 'axios';

//Archivo de configuración
import { environment } from '../../config/settings';

//_Class Component_
class Assign extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correspondenciaInfo: []
        }
    }

    componentDidMount() {
        this.getCorrespondenceInfo();
    }

    getCorrespondenceInfo() {
        axios.get(`${environment.urlServer}/correspondence/getDetail/${this.props.id}`).then(res => {
            this.setState({ correspondenciaInfo: res.data });
            console.log(res.data);
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <Fragment>
                <div className="assigncontent">
                    <div className="buttonBack">
                        <p className="TitlePage">Asignar</p>
                    </div>

                    <div className="assignView">
                        <div className="correspondenceInfo">

                        </div>

                        <div className="assignOption">

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

//Exportación de componente:
export default Assign;