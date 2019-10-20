import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import $ from "jquery";

import logoRojo from "../../../resources/logorojo.png";
import DS from '../../../resources/fotoDS1.png';
import facebookR from "../../../resources/facebook_rojo.png";
import twitterR from "../../../resources/twitter_rojo.png";
import instagramR from "../../../resources/instagram_rojo.png";
import youtubeR from "../../../resources/youtube_rojo.png";

class Militancia extends Component {

  state = {
    militanciaData: []
  }
  componentDidMount() {
    $(".navbar_morena").addClass("nvocolor_rojo");
    $(".navbar_morena img").attr("src", logoRojo);

    $("#facebookDS").attr("src", facebookR);
    $("#twitterDS").attr("src", twitterR);
    $("#instaDS").attr("src", instagramR);
    $("#ytDS").attr("src", youtubeR);

    fetch('http://laravel.danielserrano.com.mx/public/api/militancia')
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON.Militancia)
        var dataMilitancia = [];
        responseJSON.Militancia.forEach(militancia => {
          console.log(militancia)
          dataMilitancia.push(militancia)
        });
        this.setState({
          militanciaData: dataMilitancia
        })
        console.log(this.state.militanciaData);
      })
  }

  render() {
    return (
      <div>
        <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
        <Navbar active={false}></Navbar>
        <div style={{ paddingTop: "7%" }} className="px-md-5 px-2 mt-md-0 mt-5">
          <div style={{ justifyContent: "center" }} className="row mx-0 mb-4">
            <div className="col-12 px-0">
              <h2 className="morena_red">CON LA MILITANCIA</h2>
            </div>

            <div className="row flex-nowrap w-100 scroll_custom" style={{ overflowX: "auto", display: 'flex', alignItems: 'center' }} >
              {this.state.militanciaData.length > 0 ? (
                this.state.militanciaData.map(militancia =>
                  <div key={militancia.id} className="col-12 col-md-8 px-3 mt-3">
                    <div className="bg-dark" style={{ height: "24rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                      <img className='w-100 h-100' alt='MORENA' onError={(event) => event.target.src = DS} src={militancia.img_one}></img>
                    </div>
                  </div>
                )
              ) : (null)}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Militancia;
