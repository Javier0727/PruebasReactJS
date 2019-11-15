import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import logoRojo from "../../../resources/logorojo.png";
import $ from "jquery";
import DS from '../../../resources/fotoDS1.png';
import Footer from "../Footer/Footer";

import facebookR from "../../../resources/facebook_rojo.png";
import twitterR from "../../../resources/twitter_rojo.png";
import instagramR from "../../../resources/instagram_rojo.png";
import youtubeR from "../../../resources/youtube_rojo.png";
import ScrollLeft from "../scrollLeft";
import ScrollRight from "../scrollRight";

export class Noticias extends Component {
  state = {
    columData: [],
    videcolumData: []
  }
  componentDidMount = () => {
    $(".navbar_morena").addClass("nvocolor_rojo");
    $(".navbar_morena img").attr("src", logoRojo);

    $("#facebookDS").attr("src", facebookR);
    $("#twitterDS").attr("src", twitterR);
    $("#instaDS").attr("src", instagramR);
    $("#ytDS").attr("src", youtubeR);
    $('#contacto').css('color', '#941725');
    $('#menu_navbar').css('color', '#941725');
    fetch('http://laravel.danielserrano.com.mx/public/api/noticias')
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON.noticias)
        var columna = [],
          videocolumna = [];
        responseJSON.noticias.forEach(noticia => {
          if (noticia.categoria === 'columna') {
            columna.push({ 'titulo': noticia.titulo, 'link': noticia.link_one, 'img': noticia.img_one, 'id': noticia.id, 'status': noticia.status })
          } else {
            videocolumna.push({ 'titulo': noticia.titulo, 'link': noticia.link_one, 'img': noticia.img_one, 'id': noticia.id, 'status': noticia.status })
          }
        });
        this.setState({
          columData: columna,
          videcolumData: videocolumna
        })
        // console.log(columna)
      })
  };

  render() {
    // console.log(this.state.columData)
    return (
      <div>
        <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
        <Navbar active={false}></Navbar>
        <div style={{ paddingTop: "7%" }} className="px-5 mt-md-0  mt-5">
          <div style={{ justifyContent: "center", height: '80vh', }} className="row mx-0 mb-4">
            <div className="col-12 px-0">
              <h1 className="morena_red">VIDEOCOLUMNAS</h1>
            </div>

            <div id='scroll_vc' className="row flex-nowrap w-100 scroll_custom position-relative px-4" style={{ overflowX: "auto" }} >
              {this.state.videcolumData.length > 0 ? (
                this.state.videcolumData.map(videoColumna =>
                  videoColumna.status === 1 ? (
                    < div key={videoColumna.id} className="col-12 col-md-4 px-3 mt-3" >
                      <div style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        {/* <div style={{ position: 'absolute', color: 'white', zIndex: '99' }}> {videoColumna.titulo} </div> */}
                        <a className='h-100 w-100' href={videoColumna.link} target='_blank' style={{ position: 'relative' }}>
                          <img className='w-100 h-100  noticia_cont position-absolute' alt='MORENA' onError={(event) => event.target.src = DS} src={videoColumna.img}></img>
                        </a>
                      </div>
                    </div>
                  ) : (null)

                )
              ) : (null)}
              <ScrollLeft selector='#scroll_vc'></ScrollLeft>
              <ScrollRight selector='#scroll_vc'></ScrollRight>
              {/*  */}
            </div>
          </div>
          <div style={{ justifyContent: "center", height: '80vh' }} className="row mx-0 mb-4">
            <div className="col-12 px-0">
              <h1 className="morena_red">COLUMNAS</h1>
            </div>

            <div id='scroll_v' className="row flex-nowrap w-100 scroll_custom position-relative px-4" style={{ overflowX: "auto" }} >
              {this.state.columData.length > 0 ? (
                this.state.columData.map(Columna =>
                  Columna.status === 1 ? (
                    <div key={Columna.id} className="col-12 col-md-4 px-3 mt-3">
                      <div style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        {/* <div style={{ position: 'absolute', color: 'white', zIndex: '99' }}> {Columna.titulo} </div> */}
                        <a className='h-100 w-100' href={Columna.link} target='_blank' style={{ position: 'relative' }}>
                          <img className='w-100 h-100 noticia_cont position-absolute' alt='MORENA' onError={(event) => event.target.src = DS} src={Columna.img}></img>
                        </a>
                      </div>
                    </div>
                  ) : (null)

                )
              ) : (null)}
              <ScrollLeft selector='#scroll_v'></ScrollLeft>
              <ScrollRight selector='#scroll_v'></ScrollRight>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}

export default Noticias;
