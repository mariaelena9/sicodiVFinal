/* @LOADER */

//Imports
import React, {useState, useEffect} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 
import style from "./Loader.css";
import Header from "../Header/Header";
import Inicio from "../../components/Home/Inicio";
import { render } from "@testing-library/react";

function Loader(){
    
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Cargado");
            render(
                <div>
                    <Inicio/>
                </div>
            ); 
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <div className="App">
            <h2> Bienvenido </h2>
        </div>
    );
}

export default Loader;