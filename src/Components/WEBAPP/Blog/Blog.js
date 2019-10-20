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

class Blog extends Component {
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


    fetch('http://laravel.danielserrano.com.mx/public/api/blog')
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON.blog)
        this.setState({ listadoData: responseJSON.blog })
      })

  };
  // https://img.youtube.com/vi/yXrlhebkpIQ/0.jpg
  // https://img.youtube.com/vi/yXrlhebkpIQ/maxresdefault.jpg
  render() {
    console.log(this.state.listadoData)
    return (
      <div>
        <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
        <Navbar active={false}></Navbar>
        {this.state.modal ? (
          <div className="modal_cont" style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
            <div className="w-50 h-50 bg-danger">
              <iframe className='h-100 w-100' src={`https://www.youtube.com/embed/${this.state.video.split('=')[1]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="close_modal" onClick={() => this.setState({ modal: false, id: 0 })} >
              X
            </div>
          </div>
        ) : null}
        <div style={{ paddingTop: "7%" }} className="px-5">
          <div style={{ justifyContent: "center" }} className="row mx-0 mb-4">
            <div className="col-12 px-0">
              <h2 className="morena_red">Blog</h2>
            </div>
            {this.state.listadoData.length != undefined ? (
              this.state.listadoData.map(blogData =>
                <div key={blogData.id} className="col-12 col-md-5 px-3 mt-3">
                  <div onClick={() => this.setState({ modal: true, id: blogData.id, video: blogData.video_one })} className="bg-dark" style={{ height: "15rem", cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundImage: `url(https://img.youtube.com/vi/${blogData.video_one.split("=")[1]}/maxresdefault.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', boxShadow: '0px 0px 5px 0px grey' }} >
                    {/* Nota {blogData.id} */}
                  </div>
                </div>
              )
            ) : (null)}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Blog;
