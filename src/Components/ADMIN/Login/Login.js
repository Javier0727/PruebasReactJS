import React, { Component } from "react";
// import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import logoRojo from "../../../resources/logorojo.png";

export class Login extends Component {
  state = {
    user: "",
    pass: ""
  };

  _login = () => {
    if (this.state.user !== "" && this.state.pass !== "") {
      fetch("http://laravel.danielserrano.com.mx/public/usuario/login", {
        method: "POST",
        body: JSON.stringify({
          'email': "root@edomex.com",
          'pass': "root1234"
          // email: this.state.user,
          // pass: this.state.pass
        })
      })
        .then(response => response.json())
        .then(responseJSON => {
          console.log(responseJSON);
        })
        .catch(err => { console.log(err); alert('Error, intentarlo más tarde.') })
    } else {
      alert("Ingresar Usuario y Contraseña.");
    }
  };

  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(148, 23, 37, 0.62)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            // backgroundImage: `url(${logoDS})`,
            // backgroundSize:'container',
            // backgroundPosition:'top',
            // backgroundRepeat:'no-repeat'
          }}
        >
          <div
            className="bg-light p-5"
            style={{
              height: "20rem",
              width: "40rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "5px"
              //   backgroundImage: `url(${logoRojo})`,
              //   backgroundSize: "80%",
              //   backgroundPosition: "center",
              //   backgroundRepeat: "no-repeat"
            }}
          >
            <label style={{ placeSelf: "flex-start" }}>Usuario</label>
            <input
              onChange={event => this.setState({ user: event.target.value })}
              type="text"
              className="form-control mb-3"
            ></input>
            <label style={{ placeSelf: "flex-start" }}>Contraseña</label>
            <input
              onChange={event => this.setState({ pass: event.target.value })}
              type="password"
              className="form-control mb-3"
            ></input>
            <div
              className="p-3 bg-danger form-control w-25"
              style={{
                cursor: "pointer",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              onClick={() => this._login()}
            >
              Entrar
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
