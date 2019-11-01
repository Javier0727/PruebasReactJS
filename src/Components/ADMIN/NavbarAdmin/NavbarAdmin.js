import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import logoRojo from "../../../resources/logorojo.png";
import $ from "jquery";
import { checkSession } from '../checksession';


class NavbarAdmin extends React.Component {
  state = {
    validacion: false
  };
  componentDidMount = () => {
    checkSession();
    var { active } = this.props;
  };


  render() {
    return (
      <div className="navbar_morena nvocolor_rojo" style={{ flexWrap: 'nowrap', overflow: 'auto', justifyContent: 'center', width: 'auto' }}>
        <Link className="px-3" to="/admin/trayectoria">
          TRAYECTORIA
        </Link>
        <Link className="px-3" to="/admin/blog">
          BLOG
        </Link>
        <Link className="px-3" to="/admin/danielserrano">
          <img style={{ width: "5rem" }} src={logoRojo}></img>
        </Link>
        <Link className="px-3" to="/admin/edomex">
          POR EL EDOMEX
        </Link>
        <Link className="px-3" to="/admin/noticias">
          NOTICIAS
        </Link>
      </div>
    );
  }
}

export default NavbarAdmin;
