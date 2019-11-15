import React, { Component } from 'react'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import $ from "jquery";

import logoRojo from "../../../resources/logorojo.png";
import DS from '../../../resources/fotoDS1.png';
import facebookR from "../../../resources/facebook_rojo.png";
import twitterR from "../../../resources/twitter_rojo.png";
import instagramR from "../../../resources/instagram_rojo.png";
import youtubeR from "../../../resources/youtube_rojo.png";

export class Contacto extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        msj: '',
        thanks: false
    }

    componentDidMount() {
        $(".navbar_morena").addClass("nvocolor_rojo");
        $(".navbar_morena img").attr("src", logoRojo);

        $("#facebookDS").attr("src", facebookR);
        $("#twitterDS").attr("src", twitterR);
        $("#instaDS").attr("src", instagramR);
        $("#ytDS").attr("src", youtubeR);
        $('#menu_navbar').css('color', '#941725');
        $('#contacto').css('color', '#941725');
    }

    _sendContacto = () => {
        if (this.state.name !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.msj !== '') {

            fetch("http://laravel.danielserrano.com.mx/public/api/contacto/create", {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.name,
                    "email": this.state.email,
                    "tel": this.state.phone,
                    "msj": this.state.msj,
                    "status": "1"
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON)
                    this.setState({
                        name: '',
                        email: '',
                        phone: '',
                        msj: '',
                        thanks: true
                    })
                })
                .catch(err => {
                    console.log(err)
                    alert('Intentarlo más tarde')
                })
        } else {
            alert('Llenar todos los datos.')
        }
    }

    render() {
        return (
            <div>
                <div className="topnv" style={{ position: "absolute", top: "-3%" }} ></div>
                <Navbar active={false}></Navbar>
                <div style={{ paddingTop: "7%" }} className="px-5 mt-md-0  mt-5">
                    <div style={{ justifyContent: "center" }} className="row mx-0 mb-4">
                        <div className="col-12 px-0">
                            <h1 className="morena_red">CONTACTO</h1>
                        </div>
                        <div className='container-fluid'>
                            <div className='row'>
                                {!this.state.thanks ? (
                                    <div className='col-md-6 col-12'>
                                        <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} type='text' className='form-control btn_morena mb-4 mt-2' placeholder='NOMBRE'></input>
                                        <input value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} type='text' className='form-control btn_morena mb-4' placeholder='EMAIL'></input>
                                        <input value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} type='number' className='form-control btn_morena mb-4' placeholder='TELÉFONO'></input>
                                        <textarea value={this.state.msj} onChange={(event) => this.setState({ msj: event.target.value })} className='form-control btn_morena mb-4' placeholder='MENSAJE'></textarea>
                                        <button onClick={() => this._sendContacto()} type='button' className='btn mb-5' style={{ backgroundColor: '#941725', color: 'white' }}>ENVIAR</button>
                                    </div>
                                ) : (
                                        <div className='col-12 d-flex justify-content-center align-items-center h1' style={{ color: '#941725', minHeight: '13rem', }}>
                                            ¡Gracias!
                                </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Contacto
