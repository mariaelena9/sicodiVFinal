/*@LOGIN FORM */

//Import React library
import React, {useState} from "react";

//Import assets
import { AiOutlineUser } from "react-icons/ai"; 
import { RiLockPasswordLine} from "react-icons/ri"; 
import { MdLogin } from "react-icons/md"; 

//Import Styles
import style from "./LoginForm.css";


function LoginForm({Login, error}){
    const [details, setDetails] = useState({name:"", password:""})

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    return(

        <div className="Content">
            
            <div className="Welcome">
                <h1> BIENVENIDO </h1>
                <p> Ingresa tu cuenta para continuar </p>
                
            </div>

            <div className="Login">

                <form onSubmit={submitHandler}>

                    <div className="User">
                        <div className="icon-user"> <AiOutlineUser/> </div>
                        <input type='text' placeholder="Usuario" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}></input>
                    </div>

                    <div className="Pass">
                        <div className="icon-pass"> <RiLockPasswordLine/> </div>
                        <input type='password' placeholder="Contraseña" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}></input>
                    </div>

                    <div className="btnLog">
                        <button type="Submit">INGRESAR</button>
                        <MdLogin></MdLogin>
                    </div>

                </form> 

            </div>
            
        </div>
    );
}


export default LoginForm;

