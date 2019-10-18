import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import $ from "jquery";
import YouTube from "react-youtube";
import Footer from "../Footer/Footer";

export class Landing extends Component {
  componentDidMount = () => {};
  _onReady(event) {
    // console.log(event);
    event.target.playVideo();
    event.target.mute();
  }
  render() {
    // https://developers.google.com/youtube/player_parameters
    const opts = {
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1
      }
    };
    return (
      <div>
        <Navbar active={true}></Navbar>
        <div className="cont-vid topnv" style={{ overflow: "hidden" }}>
          <YouTube
            className="h-100 w-100"
            opts={opts}
            videoId="7SoYXlIZ7vU"
            containerClassName="h-100 w-100 position-absolute"
            onReady={this._onReady}
            onEnd={this._onReady}
          />
          {/* <video style={{ position: 'absolute' }} className='h-100 w-100' src={vid} autoPlay loop></video> */}
          <div
            className="w-100 h-100"
            style={{ position: "absolute", backgroundColor: "#9417259e" }}
          >
            <div className="ds_logo">
              <img className="w-100 h-100 img-contain" src={logoDS}></img>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Landing;
