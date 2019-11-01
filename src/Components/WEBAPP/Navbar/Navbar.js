import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import logoRojo from "../../../resources/logorojo.png";
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
    active: ''
  };
  componentDidMount = () => {
    var { active } = this.props;
    this._scrolleo();
    this.setState({
      active: window.location.pathname
    })
    // console.log(active);
  };

  _scrolleo = () => {
    $(document).scroll(function () {
      var windowTop = $(document).scrollTop();
      var windowBottom = windowTop + window.innerHeight;
      var elementPositionTop = $(".topnv").offset().top;
      var elementPositionBottom = elementPositionTop + $(".topnv").height();

      if (windowTop <= elementPositionBottom) {
        $(".txt-footer").css("color", "white");
        $(".navbar_morena").removeClass("nvocolor_rojo");
        $(".navbar_morena img").attr("src", logoDS);
        $("#facebookDS").attr("src", facebookB);
        $("#twitterDS").attr("src", twitterB);
        $("#instaDS").attr("src", instagramB);
        $("#ytDS").attr("src", youtubeB);
        $("#footer_morena").css("background-color", "transparent");
        $("#footer_morena").css("box-shadow", "none");

      } else {

        $("#footer_morena").css("background-color", "#cdcdcd");
        $("#footer_morena").css("box-shadow", "0px -2px 7px -3px grey");

        $(".txt-footer").css("color", "#941725");
        $(".navbar_morena").addClass("nvocolor_rojo");
        $(".navbar_morena img").attr("src", logoRojo);
        $("#facebookDS").attr("src", facebookR);
        $("#twitterDS").attr("src", twitterR);
        $("#instaDS").attr("src", instagramR);
        $("#ytDS").attr("src", youtubeR);
      }
    });
  };

  render() {
    // console.log(this.state);
    return (
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <a className="navbar-brand" href="#">Navbar</a>
      //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      //         <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      //         <div className="navbar-nav">
      //             <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
      //             <a className="nav-item nav-link" href="#">Features</a>
      //             <a className="nav-item nav-link" href="#">Pricing</a>
      //             <a className="nav-item nav-link disabled" href="#">Disabled</a>
      //         </div>
      //     </div>
      // </nav>
      <div className="navbar_morena">
        <Link className={`px-3 ${this.state.active === "/trayectoria" ? ("navbarActive") : ("")}`} to="/trayectoria">
          TRAYECTORIA
        </Link>
        <Link className={`px-3 ${this.state.active === "/blog" ? ("navbarActive") : ("")}`} to="/blog">
          BLOG
        </Link>
        <Link className={`px-3 ${this.state.active === "/" ? ("navbarActiveW") : ("")}`} to="/">
          <img style={{ width: "5rem" }} src={logoDS}></img>
        </Link>
        <Link className={`px-3 ${this.state.active === "/edomex" || this.state.active === "/edomex/distritos" || this.state.active === "/edomex/militancia" || this.state.active === "/edomex/pueblo" ? ("navbarActive") : ("")}`} to="/edomex">
          POR EL EDOMEX
        </Link>
        <Link className={`px-3 ${this.state.active === "/noticias" ? ("navbarActive") : ("")}`} to="/noticias">
          NOTICIAS
        </Link>
      </div>
    );
  }
}

export default Navbar;
