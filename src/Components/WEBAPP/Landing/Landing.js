import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import $ from "jquery";
import YouTube from "react-youtube";
import Footer from "../Footer/Footer";

export class Landing extends Component {
  state = {
    mediaData: {}
  }
  componentDidMount = () => {
    $('#contacto').parent().css('margin-right', '7%');
    fetch(`http://laravel.danielserrano.com.mx/public/api/home`)
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON);
        this.setState({
          mediaData: responseJSON.Home[responseJSON.Home.length - 1]
        })
      })
      .catch(err => {
        console.log(err);
      });
    // fetch(`http://laravel.danielserrano.com.mx/public/api/content`)
    //   .then(response => response.json())
    //   .then(responseJSON => {
    //     console.log(responseJSON);
    //     this.setState({
    //       mediaData: responseJSON.Content[responseJSON.Content.length - 1]
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

  };
  _onReady(event) {
    event.target.playVideo();
    event.target.mute();
  }
  render() {
    // https://developers.google.com/youtube/player_parameters
    const opts = {
      playerVars: {
        showinfo: 0,
        autoplay: 1,
        controls: 0,
        loop: 1,
      }
    };
    console.log(opts)
    return (
      <div>
        <Navbar active={true}></Navbar>
        <div className="cont-vid topnv" style={{ overflow: "hidden" }}>
          {this.state.mediaData.video_home !== undefined ? (

            <YouTube
              className="h-100 w-100"
              videoId={this.state.mediaData.video_home !== null ? (this.state.mediaData.video_home.split("=")[1].split('&')[0]) : ("7SoYXlIZ7vU")}
              containerClassName="h-100 w-100 position-absolute"
              onReady={this._onReady}
              onEnd={this._onReady}
              opts={opts}
            />
          ) : (null)}
          {/* <video style={{ position: 'absolute' }} className='h-100 w-100' src={vid} autoPlay loop></video> */}
          <div className="w-100 h-100" style={{ position: "absolute", }} >
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