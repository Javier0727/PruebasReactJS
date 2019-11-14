import React, { Component } from "react";
import $ from "jquery";
import facebookB from "../../../resources/facebook_blanco.png";
import facebookR from "../../../resources/facebook_rojo.png";
import twitterB from "../../../resources/twitter_blanco.png";
import twitterR from "../../../resources/twitter_rojo.png";
import instagramB from "../../../resources/instagram_blnco.png";
import instagramR from "../../../resources/instagram_rojo.png";
import youtubeB from "../../../resources/youtube_blanco.png";
import youtubeR from "../../../resources/youtube_rojo.png";

export class Footer extends Component {
  render() {
    return (
      <div id="footer_morena" className="w-100" style={{ position: "fixed", bottom: "0", height: "4rem" }}>
        <div className="row mx-0 py-3 h-100">
          <div className="col-12 h-100" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div className='h-100 w-100 d-flex align-items-center'>
              <a href='https://www.facebook.com/DanielSerranoP/' target='_blank' className='h-100 mx-2'>
                <img style={{ height: "100%", width: "auto", cursor: "pointer" }} alt="DANIEL SERRANO" id="facebookDS" src={facebookB} />
              </a>
              <a href='https://twitter.com/daniel_ser' target='_blank' className='h-100 mx-2'>
                <img style={{ height: "100%", width: "auto", cursor: "pointer" }} alt="DANIEL SERRANO" id="twitterDS" src={twitterB} />
              </a>
              <a href='https://www.instagram.com/danielserranopalacios/' target='_blank' className='h-100 mx-2'>
                <img style={{ height: "100%", width: "auto", cursor: "pointer" }} alt="DANIEL SERRANO" id="instaDS" src={instagramB} />
              </a>
              <a href='https://www.youtube.com/c/DanielSerranoP' target='_blank' className='h-100 mx-2'>
                <img style={{ height: "100%", width: "auto", cursor: "pointer" }} alt="DANIEL SERRANO" id="ytDS" src={youtubeB} />
              </a>
            </div>
            <div className='h4'>
              <a id='contacto' style={{ color: 'white' }} href='mailto:contacto@danielserrano.com.mx'>
                Contacto
              </a>
            </div>
          </div>
          {/* <div
            className="col-md-10 col-12 h-100 txt-footer"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "white"
            }}
          >
            <div style={{ cursor: "pointer" }}>CONTACTO</div>
            <div style={{ cursor: "pointer" }} className="mx-5">
              AVISO DE PRIVACIDAD
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Footer;
