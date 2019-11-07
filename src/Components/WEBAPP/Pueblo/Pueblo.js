import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import logoRojo from "../../../resources/logorojo.png";
import DS from '../../../resources/fotoDS1.png';
import $ from "jquery";
import Footer from "../Footer/Footer";

import facebookR from "../../../resources/facebook_rojo.png";
import twitterR from "../../../resources/twitter_rojo.png";
import instagramR from "../../../resources/instagram_rojo.png";
import youtubeR from "../../../resources/youtube_rojo.png";
class Pueblo extends Component {
  state = {
    modal: false,
    id: 0,
    video: '',
    listadoData: {}
  };
  componentDidMount = () => {
    $(".navbar_morena").addClass("nvocolor_rojo");
    $(".navbar_morena img").attr("src", logoRojo);
    $("#facebookDS").attr("src", facebookR);
    $("#twitterDS").attr("src", twitterR);
    $("#instaDS").attr("src", instagramR);
    $("#ytDS").attr("src", youtubeR);


    fetch('http://laravel.danielserrano.com.mx/public/api/pueblo')
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON.Pueblo)
        this.setState({ listadoData: responseJSON.Pueblo })
      })
  };
  render() {
    return (
      <div>
        <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
        <Navbar active={false}></Navbar>
        {this.state.modal ? (
          <div className="modal_cont" style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
            <div className="w-75 h-75 degradado_solid">
              <img style={{ objectFit: 'contain' }} onError={(event) => event.target.src = DS} src={this.state.video}></img>
              {/* <iframe className='h-100 w-100' src="https://www.youtube.com/embed/7SoYXlIZ7vU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
            </div>
            <div className="close_modal" onClick={() => this.setState({ modal: false, id: 0 })} >
              X
            </div>
          </div>
        ) : null}
        <div style={{ paddingTop: "7%" }} className="px-5">
          <div style={{ justifyContent: "center" }} className="row mx-0 mb-5 pb-5">
            <div className="col-12 px-0">
              <h1 className="morena_red">PUEBLO ORGANIZADO</h1>
            </div>
            {this.state.listadoData.length != undefined ? (
              this.state.listadoData.map(pueblo =>
                pueblo.status === 1 ? (
                  <div key={pueblo.id} className="col-12 col-md-5 px-3 mt-3">
                    <div onClick={() => this.setState({ modal: true, id: pueblo.id, video: pueblo.img_one })} className="bg-dark" style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(${pueblo.img_one})`, backgroundPosition: 'center', backgroundSize: 'cover' }} >
                    </div>
                  </div>
                ) : (null)
              )
            ) : (null)}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Pueblo;
