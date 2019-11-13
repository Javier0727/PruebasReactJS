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

  state = {
    video: ''
  }

  componentDidMount = () => {
    fetch(`http://laravel.danielserrano.com.mx/public/api/edomex`)
      .then(response => response.json())
      .then(responseJSON => {
        // console.log(responseJSON.Edomex)
        this.setState({
          video: responseJSON.Edomex[responseJSON.Edomex.length - 1]
        })
        // console.log(responseJSON.Edomex.length)
        // console.log(responseJSON.Edomex[responseJSON.Edomex.length - 1])
      })
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
        <div className="topnv" style={{ position: "absolute", top: "-3%" }}></div>
        <Navbar active={false}></Navbar>
        <div className="cont-vid topnv" style={{ overflow: 'hidden', }}>
          <YouTube
            className="h-100 w-100"
            opts={opts}
            videoId={this.state.video !== '' ? (this.state.video.video_one.split('v=')[1].split('&t')[0]) : ('7SoYXlIZ7vU')}
            containerClassName="h-100 w-100 position-absolute"
            onReady={this._onReady}
            onEnd={this._onReady}
          />
          <div className="w-100 h-100" style={{ position: "absolute", backgroundColor: "#9417259e" }} >
            <div className="ds_logo_trayectoria" style={{ display: "flex", justifyContent: "center", color: "white", flexDirection: "column" }}>
              <Link to="/nacion/pueblo" className="text-light p-2 txt_edo">
                Por el EdoMex
              </Link>
              <Link to="/nacion/pueblo" className="text-light p-2 txt_edo">
                Con la militancia
              </Link>
              {/* <Link to="/nacion/militancia" className="text-light p-2 txt_edo">
                Por el EdoMex
              </Link> */}
              <Link to="/nacion/distritos" className="text-light p-2 txt_edo">
                Distritos
              </Link>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default PorElEdoMex;
