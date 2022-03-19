import React, {useState} from "react";
// import LoginForm from "../components/Login/LoginForm";
import LogoNay from "../assets/nayaritLogo.png";
import style from "../components/Login/LoginForm.css"
import Logged from "../components/Login/Logged";



function LoginPage(){
    
    return(
        <div className="main">

            <div className="leftSide">
                <img className="nayaritLogo" src={LogoNay} alt="LogotipoNayarit"/>
            </div>

            <div className="rightSide">
                <Logged/>
            </div>

        </div>
    );
}



export default LoginPage;