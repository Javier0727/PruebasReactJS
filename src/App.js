import React from "react";
import logo from "./logo.svg";
import backG from "./resources/fondo.png";
import "./App.css";
import NavBar from "./Components/WEBAPP/Navbar/Navbar";
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import { Router, Route, Link, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Landing from "./Components/WEBAPP/Landing/Landing";
import Trayectoria from "./Components/WEBAPP/Trayectoria/Trayectoria";
import Blog from "./Components/WEBAPP/Blog/Blog";
import PorElEdoMex from "./Components/WEBAPP/PorElEdoMex/PorelEdo";
import Noticias from "./Components/WEBAPP/Noticias/Noticias";
import Distritos from "./Components/WEBAPP/Distritos/Distritos";
import Militancia from "./Components/WEBAPP/Militancia/Militancia";
import Pueblo from "./Components/WEBAPP/Pueblo/Pueblo";
import DetalleP from "./Components/WEBAPP/Pueblo/DetalleP";
import DetalleD from "./Components/WEBAPP/Distritos/DetalleD";
import Login from "./Components/ADMIN/Login/Login";
import TrayectoriaAdmin from "./Components/ADMIN/TayectoriaAdmin/TrayectoriaAdmin";
import BlogAdmin from "./Components/ADMIN/BlogAdmin/BlogAdmin";
import LandingAdmin from "./Components/ADMIN/LandingAdmin/LandingAdmin";
import PorelEdoAdmin from "./Components/ADMIN/PorelEdoAdmin/PorelEdoAdmin";
import NoticiasAdmin from "./Components/ADMIN/NoticiasAdmin/NoticiasAdmin";
import UserControl from "./Components/ADMIN/UserControl/UserControl";
import Contacto from "./Components/WEBAPP/Contacto/Contacto";
import ContactoAdmin from "./Components/ADMIN/ContactoAdmin/ContactoAdmin";
import PuebloDos from "./Components/WEBAPP/Pueblo/PuebloDos";

class App2 extends React.Component {
  state = {
    loaded: false
  };

  componentDidMount = () => {
    this.setState({ loaded: true });
  };

  // {/* <Route path="/trayectoria" exact component={Trayectoria} />
  // <Route path="/blog" exact component={Blog} />
  // <Route path="/edomex" exact component={PorElEdoMex} />
  // <Route path="/noticias" exact component={Noticias} />
  // <Route path="/" exact component={Landing} /> */}
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">blog</Link>
            </li>
            <li>
              <Link to="/trayectoria">trayectoria</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Landing} />
          <Route path="/blog" component={Blog} />
          <Route path="/trayectoria" component={Trayectoria} />
        </div>
      </Router>
    );
  }
}

// function App() {
//   return (

//     <Router>
//       <NavBar></NavBar>
//       <Switch>

//         <Route path="/trayectoria" component={Trayectoria} />
//         <Route path="/blog" component={Blog} />
//         <Route path="/edomex" component={PorElEdoMex} />
//         <Route path="/noticias" component={Noticias} />
//         <Route path="/" exact component={Landing} />
//       </Switch>
//     </Router>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/admin" exact component={Login} />
        <Route path="/admin/trayectoria" exact component={TrayectoriaAdmin} />
        <Route path="/admin/blog" exact component={BlogAdmin} />
        <Route path="/admin/danielserrano" exact component={LandingAdmin} />
        <Route path="/admin/edomex" exact component={PorelEdoAdmin} />
        <Route path="/admin/noticias" exact component={NoticiasAdmin} />
        <Route path="/admin/usuarios" exact component={UserControl} />
        <Route path="/admin/contacto" exact component={ContactoAdmin} />

        <Route path="/contacto" exact component={Contacto} />
        <Route path="/trayectoria" exact component={Trayectoria} />
        <Route path="/blog" exact component={Blog} />
        <Route exact path="/noticias" component={Noticias} />
        <Route exact path="/nacion" component={PorElEdoMex} />
        <Route exact path="/nacion/militancia" component={Pueblo} />
        <Route exact path="/nacion/edomex" component={PuebloDos} />
        <Route exact path="/nacion/militancia/:id" component={DetalleP} />
        {/* <Route exact path="/nacion/militancia" component={Militancia} /> */}
        <Route exact path="/nacion/distritos" component={Distritos} />
        <Route exact path="/nacion/distritos/:id" component={DetalleD} />
        <Route exact path="/" component={Landing} />
      </Router>
    );
  }
}

export default App;
