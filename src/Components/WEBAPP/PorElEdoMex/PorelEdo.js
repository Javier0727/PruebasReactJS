import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import danielPerfil from "../../../resources/perfildaniel.png";
import nombreDS from "../../../resources/nombreDS.png";
import logoRojo from "../../../resources/logorojo.png";
import $ from "jquery";
import YouTube from "react-youtube";
import Footer from "../Footer/Footer";

export class PorElEdoMex extends Component {
  componentDidMount = () => {
    // $(".navbar_morena").addClass("nvocolor_rojo");
    // $(".navbar_morena img").attr("src", logoRojo);
  };
  _onReady(event) {
    // console.log(event);
    event.target.playVideo();
    event.target.mute();
  }
  render() {
    const opts = {
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1
      }
    };
    return (
      <div>
        <div
          className="topnv"
          style={{ position: "absolute", top: "-3%" }}
        ></div>
        <Navbar active={false}></Navbar>
        <div className="cont-vid topnv" style={{overflow: 'hidden',}}>
          <YouTube
            className="h-100 w-100"
            opts={opts}
            videoId="7SoYXlIZ7vU"
            containerClassName="h-100 w-100 position-absolute"
            onReady={this._onReady}
            onEnd={this._onReady}
          />
          <div
            className="w-100 h-100"
            style={{ position: "absolute", backgroundColor: "#9417259e" }}
          >
            <div
              className="ds_logo_trayectoria"
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                flexDirection: "column"
              }}
            >
              <Link to="/edomex/pueblo" className="h1 text-light p-2">
                Pueblo Organizado
              </Link>
              <Link to="/edomex/militancia" className="h1 text-light p-2">
                Con la militancia
              </Link>
              <Link to="/edomex/distritos" className="h1 text-light p-2">
                Distritos
              </Link>
              {/* <img className="w-100 h-100 img-contain" src={logoDS}></img> */}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default PorElEdoMex;
