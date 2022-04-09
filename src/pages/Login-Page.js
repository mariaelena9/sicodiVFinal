import React, {useState} from "react";
import LogoNay from "../assets/nayaritLogo.png";
import NewLogin from '../components/Log In/Login'
import Header from "../commons/Header/Header";

function LoginPage(){
    return(
        <div className="main">
            <div className="container">
            <Header/>
                <div className="principal">
                    <div className="leftSide">
                        <img className="nayaritLogo" src={LogoNay} alt="LogotipoNayarit"/>
                    </div>

                    <div className="rightSide">
                        <NewLogin/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;