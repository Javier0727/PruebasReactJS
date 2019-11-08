import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import logoRojo from "../../../resources/logorojo.png";
import "bootstrap/js/src/collapse.js";
import $ from "jquery";

import facebookB from "../../../resources/facebook_blanco.png";
import facebookR from "../../../resources/facebook_rojo.png";
import twitterB from "../../../resources/twitter_blanco.png";
import twitterR from "../../../resources/twitter_rojo.png";
import instagramB from "../../../resources/instagram_blnco.png";
import instagramR from "../../../resources/instagram_rojo.png";
import youtubeB from "../../../resources/youtube_blanco.png";
import youtubeR from "../../../resources/youtube_rojo.png";
// border-bottom: 2px solid #96050fab;
class Navbar extends React.Component {
  state = {
    validacion: false,
    active: '',
    val: false
  };
  componentDidMount = () => {
    var { active } = this.props;
    // console.log(active)
    // console.log(window.location.pathname)
    if (window.location.pathname == '/trayectoria' || window.location.pathname == "/noticias" || window.location.pathname == '/blog' || window.location.pathname == '/edomex/pueblo' || window.location.pathname == '/edomex/militancia' || window.location.pathname == '/edomex/distritos') {
      this._scrolleo(false);
    } else {
      this._scrolleo(true);
    }
    this.setState({
      active: window.location.pathname,
      val: active
    })
  };

  _scrolleo = (val) => {
    var validacion = this.state.val;
    $(document).scroll(function () {
      if (validacion) {

        var windowTop = $(document).scrollTop();
        var windowBottom = windowTop + window.innerHeight;
        var elementPositionTop = $(".topnv").offset().top;
        var elementPositionBottom = elementPositionTop + $(".topnv").height();
        if (windowTop <= 1) {
          $(".txt-footer").css("color", "white");
          $(".navbar_morena").removeClass("nvocolor_rojo");
          $(".navbar_morena img").attr("src", logoDS);
          $("#facebookDS").attr("src", facebookB);
          $("#twitterDS").attr("src", twitterB);
          $("#instaDS").attr("src", instagramB);
          $("#ytDS").attr("src", youtubeB);
          $("#footer_morena").css("background-color", "transparent");
          $("#footer_morena").css("box-shadow", "none");
          $("#menu_navbar").css("color", "white");

        } else {

          $("#menu_navbar").css("color", "#941725");
          $("#footer_morena").css("background-color", "#cdcdcd9c");
          $("#footer_morena").css("box-shadow", "0px -2px 7px -3px grey");

          $(".txt-footer").css("color", "#941725");
          $(".navbar_morena").addClass("nvocolor_rojo");
          $(".navbar_morena img").attr("src", logoRojo);
          $("#facebookDS").attr("src", facebookR);
          $("#twitterDS").attr("src", twitterR);
          $("#instaDS").attr("src", instagramR);
          $("#ytDS").attr("src", youtubeR);
        }
      }

    });
  };

  render() {
    return (

      <nav className="navbar navbar-expand-lg position-fixed navbar_morena justify-content-end py-0">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          {/* <img alt='MORENA' src={logoDS} style={{ width: '5rem ' }}></img> */}
          <div id='menu_navbar' className='px-2 py-3'>Menú</div>
        </button>

        <div className="collapse navbar-collapse justify-content-center align-items-center" id="navbarSupportedContent">
          <ul id='bg-navbar' className="navbar-nav justify-content-center align-items-md-center align-items-end">
            <li className="nav-item m-md-0 m-3">
              <Link className={`px-3 ${this.state.active === "/trayectoria" ? ("navbarActive") : ("")}`} to="/trayectoria">
                TRAYECTORIA
              </Link>
            </li>
            <li className="nav-item m-md-0 m-3">
              <Link className={`px-3 ${this.state.active === "/blog" ? ("navbarActive") : ("")}`} to="/blog">
                BLOG
              </Link>
            </li>
            <li className={`nav-item m-md-0 m-3 ${this.state.active === "/" ? ("navbarActiveW") : ("")}`}>
              <Link className={`px-3`} to="/">
                <img style={{ width: "5rem" }} src={logoDS}></img>
              </Link>
            </li>
            <li className="nav-item m-md-0 m-3">
              <Link className={`px-3 ${this.state.active === "/edomex" || this.state.active === "/edomex/distritos" || this.state.active === "/edomex/militancia" || this.state.active === "/edomex/pueblo" ? ("navbarActive") : ("")}`} to="/edomex">
                POR EL EDOMEX
              </Link>
            </li>
            <li className="nav-item m-md-0 m-3">
              <Link className={`px-3 ${this.state.active === "/noticias" ? ("navbarActive") : ("")}`} to="/noticias">
                NOTICIAS
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
