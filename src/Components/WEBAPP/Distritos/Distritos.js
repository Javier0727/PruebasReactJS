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

class Distritos extends Component {
  state = {
    distritosData: {}
  }
  componentDidMount() {
    $(".navbar_morena").addClass("nvocolor_rojo");
    $(".navbar_morena img").attr("src", logoRojo);

    $("#facebookDS").attr("src", facebookR);
    $("#twitterDS").attr("src", twitterR);
    $("#instaDS").attr("src", instagramR);
    $("#ytDS").attr("src", youtubeR);

    fetch("http://laravel.danielserrano.com.mx/public/api/distritos/collection/list")
      .then(response => response.json())
      .then(responseJSON => {
        // console.log(responseJSON)
        this.setState({
          distritosData: responseJSON.collection
        })
      })
  }

  render() {
    return (
      <div>
        <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
        <Navbar active={false}></Navbar>
        <div style={{ paddingTop: "7%" }} className="px-5 mt-md-0  mt-5">
          <div style={{ justifyContent: "center" }} className="row mx-0 mb-4">
            <div className="col-12 px-0">
              <h1 className="morena_red">DISTRITOS</h1>
            </div>

            <div className="row w-100 scroll_custom" >
              {this.state.distritosData.length > 0 ? (
                this.state.distritosData.map(distrito =>
                  distrito.collection ? (
                    <div key={distrito.id} className="col-12 col-md-4 px-3 mt-3">
                      <div onClick={() => this.props.history.push(`/edomex/distritos/${distrito.id}`)} className="bg-dark" style={{ height: "13rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} >
                        <img className='w-100 h-100' alt='MORENA' onError={(event) => event.target.src = DS} src={distrito.img_one != null ? (distrito.img_one) : (DS)} />
                        <div style={{ position: 'absolute', color: 'white' }}>Dtto. {distrito.numero} {distrito.title}</div>
                      </div>
                    </div>
                  ) : (null)
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

export default Distritos;
