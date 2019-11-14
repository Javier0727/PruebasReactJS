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

import flecha from '../../../resources/flecha_rojo.png'
import ScrollRight from "../scrollRight";
import ScrollLeft from "../scrollLeft";

class Blog extends Component {
  state = {
    modal: false,
    id: 0,
    video: '',
    listadoData: {},
    group: [],
    blogText: '',
    tipo: 0
  };

  componentDidMount = () => {


    $(".navbar_morena").addClass("nvocolor_rojo");
    $(".navbar_morena img").attr("src", logoRojo);
    $("#facebookDS").attr("src", facebookR);
    $("#twitterDS").attr("src", twitterR);
    $("#instaDS").attr("src", instagramR);
    $("#ytDS").attr("src", youtubeR);
    $('#contacto').css('color', '#941725');

    fetch('http://laravel.danielserrano.com.mx/public/api/blog')
      .then(response => response.json())
      .then(responseJSON => {
        // console.log(responseJSON.blog)
        let grupo = [],
          numeroG;

        let data = [];
        responseJSON.blog.map(nota => {
          if (nota.status === 1) {
            data.push(nota)
          }
        })
        numeroG = Math.ceil(data.length / 4);
        for (let index = 0; index < numeroG; index++) {
          grupo.push(data.splice(0, 4))
        }
        this.setState({ listadoData: responseJSON.blog, group: grupo })
      })
  };

  _scrollRight = () => {
    let restante = document.querySelector('#contenedorBlog').scrollLeft;
    document.querySelector('#contenedorBlog').scrollTo({
      top: 0,
      left: restante + 300,
      behavior: 'smooth'
    })
  }

  _scrollLeft = () => {
    let restante = document.querySelector('#contenedorBlog').scrollLeft;
    document.querySelector('#contenedorBlog').scrollTo({
      top: 0,
      left: restante - 300,
      behavior: 'smooth'
    })
  }
  // https://img.youtube.com/vi/yXrlhebkpIQ/0.jpg
  // https://img.youtube.com/vi/yXrlhebkpIQ/maxresdefault.jpg
  render() {
    return (
      <div>
        <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
        <Navbar active={false}></Navbar>
        {this.state.modal ? (
          this.state.tipo === 1 ? (
            <div className="modal_cont" style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
              <div className="w-75 h-75 bg-danger">
                <iframe className='h-100 w-100' src={`https://www.youtube.com/embed/${this.state.video.split('=')[1].split('&')[0]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="close_modal" onClick={() => this.setState({ modal: false, id: 0 })} >
                X
            </div>
            </div>
          ) : (
              <div className="modal_cont" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                <div className="w-50 h-75 bg-light p-3" style={{ overflow: 'auto', }} dangerouslySetInnerHTML={{ __html: JSON.parse(this.state.blogText) }}>
                  {/* <iframe className='h-100 w-100' src={`https://www.youtube.com/embed/${this.state.video.split('=')[1].split('&')[0]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                </div>
                <div className="close_modal text-light" onClick={() => this.setState({ modal: false, id: 0 })} >
                  X
            </div>
              </div>
            )

        ) : null}
        <div style={{ paddingTop: "7%" }} className="px-5 mb-5 pb-5">
          <div style={{ justifyContent: "center" }} className="row mx-0 mb-4 position-relative">
            <div className="col-12 px-0">
              <h1 className="morena_red">VIDEOBLOG</h1>
            </div>
            {/* {this.state.group.length > 0 ? ( */}
            {/* // <div> */}
            {/* <ScrollRight selector='#contenedorBlog'></ScrollRight>
                <ScrollLeft selector='#contenedorBlog'></ScrollLeft> */}
            {/* <img onClick={() => this._scrollRight()} className='position-absolute flechaRight' alt='MOREN' src={flecha} style={{ width: '2rem', height: '2rem', right: '-3%', cursor: 'pointer', top: '53%', }}></img> */}
            {/* <img onClick={() => this._scrollLeft()} className='position-absolute flechaLeft' alt='MOREN' src={flecha} style={{ width: '2rem', height: '2rem', left: '-3%', cursor: 'pointer', top: '53%', }}></img> */}
            {/* </div> */}
            {/* // ) : (null)} */}
            {this.state.group.length > 0 ? (
              <>
                <div id='contenedorBlog' className="row flex-nowrap w-100 scroll_custom px-3 position-relative" style={{ overflow: 'auto', }}>
                  <ScrollLeft selector='#contenedorBlog'></ScrollLeft>
                  <ScrollRight selector='#contenedorBlog'></ScrollRight>
                  {this.state.group.map(grupo =>
                    <div key={`a${grupo.length}`} className='col-12 flex-wrap d-flex'>
                      {grupo.map(grupoF =>
                        grupoF.tipo === 1 ? (
                          <div key={grupoF.id} className="col-12 col-md-6 px-3 mt-3" >
                            <div onClick={() => this.setState({ modal: true, id: grupoF.id, video: grupoF.video_one, tipo: 1 })} className="bg-dark position-relative" style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(https://img.youtube.com/vi/${grupoF.video_one.split("=")[1].split('&')[0]}/maxresdefault.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', boxShadow: '0px 0px 5px 0px grey' }} >
                              <div className='position-absolute w-100 h-100 cont-blog'></div>
                            </div>
                          </div>
                        ) : (null)
                      )}
                    </div>
                  )}

                </div>
                <div className="col-12 mt-3 px-0">
                  <h1 className="morena_red">BLOG ESCRITO</h1>
                </div>
                <div id='contenedorBlogEscrito' className="row flex-nowrap w-100 scroll_custom px-3 position-relative" style={{ overflow: 'auto', }}>
                  <ScrollLeft selector='#contenedorBlogEscrito'></ScrollLeft>
                  <ScrollRight selector='#contenedorBlogEscrito'></ScrollRight>
                  {this.state.group.map(grupo =>
                    <div key={`b${grupo.length}`} className='col-12 flex-wrap d-flex'>
                      {grupo.map(grupoF =>
                        grupoF.tipo === 2 ? (
                          <div key={grupoF.id} className="col-12 col-md-6 px-3 mt-3" >
                            <div onClick={() => this.setState({ modal: true, id: grupoF.id, blogText: grupoF.content_one, tipo: 2 })} className="bg-dark position-relative" style={{ backgroundImage: `url(${grupoF.img_one})`, backgroundPosition: 'center', backgroundSize: 'cover', height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', boxShadow: '0px 0px 5px 0px grey' }} >
                              <div className='position-absolute w-100 h-100 cont-blog'></div>
                            </div>
                          </div>
                        ) : (null)
                      )}
                    </div>
                  )}

                </div>
              </>
            ) : (null)}
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}

export default Blog;
