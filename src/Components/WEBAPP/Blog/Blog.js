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
    group: []
  };

  componentDidMount = () => {


    $(".navbar_morena").addClass("nvocolor_rojo");
    $(".navbar_morena img").attr("src", logoRojo);
    $("#facebookDS").attr("src", facebookR);
    $("#twitterDS").attr("src", twitterR);
    $("#instaDS").attr("src", instagramR);
    $("#ytDS").attr("src", youtubeR);


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
          <div className="modal_cont" style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
            <div className="w-75 h-75 bg-danger">
              <iframe className='h-100 w-100' src={`https://www.youtube.com/embed/${this.state.video.split('=')[1].split('&')[0]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="close_modal" onClick={() => this.setState({ modal: false, id: 0 })} >
              X
            </div>
          </div>
        ) : null}
        <div style={{ paddingTop: "7%" }} className="px-5 mb-5 pb-5">
          <div style={{ justifyContent: "center" }} className="row mx-0 mb-4 position-relative">
            <div className="col-12 px-0">
              <h1 className="morena_red">BLOG</h1>
            </div>
            {console.log(this.state.group.length)}
            {this.state.group.length > 0 ? (
              <div>
                <ScrollRight selector='#contenedorBlog'></ScrollRight>
                <ScrollLeft selector='#contenedorBlog'></ScrollLeft>
                {/* <img onClick={() => this._scrollRight()} className='position-absolute flechaRight' alt='MOREN' src={flecha} style={{ width: '2rem', height: '2rem', right: '-3%', cursor: 'pointer', top: '53%', }}></img> */}
                {/* <img onClick={() => this._scrollLeft()} className='position-absolute flechaLeft' alt='MOREN' src={flecha} style={{ width: '2rem', height: '2rem', left: '-3%', cursor: 'pointer', top: '53%', }}></img> */}
              </div>
            ) : (null)}
            {this.state.group.length > 0 ? (
              <div id='contenedorBlog' className="row flex-nowrap w-100 scroll_custom px-3" style={{ overflow: 'auto', }}>
                {/* <div className="container-fluid"> */}

                {this.state.group.map(grupo =>
                  // <div className='container-fluid'>
                  <div key={`a${grupo.length}`} className='col-12 flex-wrap d-flex'>
                    {/* <div className='row'> */}
                    {grupo.map(grupoF =>
                      <div key={grupoF.id} className="col-12 col-md-6 px-3 mt-3" >
                        <div onClick={() => this.setState({ modal: true, id: grupoF.id, video: grupoF.video_one })} className="bg-dark position-relative" style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(https://img.youtube.com/vi/${grupoF.video_one.split("=")[1].split('&')[0]}/maxresdefault.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', boxShadow: '0px 0px 5px 0px grey' }} >
                          <div className='position-absolute w-100 h-100 cont-blog'></div>
                        </div>
                      </div>
                    )}
                  </div>

                  // </div>
                )}

              </div>
            ) : (null)}
            {/* {this.state.listadoData.length != undefined ? (
              this.state.listadoData.map(blogData =>
                blogData.status === 0 ? (
                  <div key={blogData.id} className="col-12 col-md-5 px-3 mt-3">
                    <div onClick={() => this.setState({ modal: true, id: blogData.id, video: blogData.video_one })} className="bg-dark position-relative" style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(https://img.youtube.com/vi/${blogData.video_one.split("=")[1]}/maxresdefault.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', boxShadow: '0px 0px 5px 0px grey' }} >
                      <div className='position-absolute w-100 h-100 cont-blog'></div>
                    </div>
                  </div>
                ) : (null)
              )
            ) : (null)} */}
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}

export default Blog;
