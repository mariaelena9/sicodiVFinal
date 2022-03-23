/* @LOADER */

//Imports
import React, {useState} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 
import style from "./Loader.css";
import Header from "../Header/Header";

function Loader(){
    return(
        <div className="App">
            {/* <Header/>  */}
            <div className="load">
                <div className="spinner"> 
                    {/* LOADING SPINNER */}
                </div>
            </div>
        </div>
    );
}

export default Loader;