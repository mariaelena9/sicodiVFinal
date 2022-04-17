/* @LOADER */

//Imports
import React, {useEffect} from "react";
import ReactDOM from 'react-dom';

//Componentes
import Header from "../Header/Header";
import Inicio from "../../components/Home/Inicio";
import LoginPage from "../../pages/Login-Page";

//RECURSOS
import LogoNay from "../../assets/nayaritLogo.png";

function Loader(props){
    useEffect(() => {
        const timer = setTimeout(() => {
            if(props.type == "login"){
                ReactDOM.render(<Inicio page="Inicio"/>, document.getElementById('root'));
            } else if(props.type == "logout"){
                ReactDOM.render(<LoginPage/>, document.getElementById('root'));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <div className="App">
            <Header/>
                <div className="principal">
                    <div className="leftSide">
                        <img className="nayaritLogo" src={LogoNay} alt="LogotipoNayarit"/>
                    </div>

                    <div className="rightSide">
                        <h2 className="firstText">{props.texto1} <span>{props.texto2}</span></h2>
                    </div>
                </div>
        </div>
    );
}

export default Loader;