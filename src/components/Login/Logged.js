/* @LOGGED */

//Import React library
import React, { useState } from "react";
import { Component } from "react";

//Import Styles
import logged from "./Logged.css";

//Import components
import LoginForm from "./LoginForm";
import axios from 'axios';
import Loader from "../../commons/Loader/Loader";



function Logged() {
  const adminUser = { user: "Michelle", password: "12345" };

  const [user, setUser] = useState({ name: "", user: "" });
  const [error, setError] = useState("");

  const Login = details => {
    console.log("Logged in");

    if (details.name == adminUser.user && details.password == adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        password: details.password
      });
    } else {
      console.log("Details do not match!");
      setError("Details do not match");
    }
  }

  return (
    <div className="App">
      {(user.user != "") ? (
        <div className="welcome">

          <h2> Bienvenido, <span>{user.name}</span> </h2>
          {/* <Loader/> */}

        </div>
      ) : (

        <LoginForm />

      )}

    </div>
  );
}

export default Logged;