import React, {useState} from "react";
import LogoNay from "../assets/nayaritLogo.png";
import Logged from "../components/Login/Logged";
import Header from "../commons/Header/Header";
import style from "../components/Login/LoginPage.css"

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
                        <Logged/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;