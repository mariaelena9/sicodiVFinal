/* @LOADER */

//Import React library
import React, {useState} from "react";

//Import assets
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 

//Import Styles
import style from "./Loader.css";

//Import components
import Header from "../Header/Header";


function Loader(){
    return(
        
        <div className="App">
            <Header/> 

            <div className="load">

                <div className="spinner"> 
                    {/* LOADING SPINNER */}
                </div>

            </div>
            
        </div>
    );
}

export default Loader;