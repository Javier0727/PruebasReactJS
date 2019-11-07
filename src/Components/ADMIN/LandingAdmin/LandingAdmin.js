import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import $ from 'jquery';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';
import Loader from '../../../resources/loader.gif';

export class LandingAdmin extends Component {
    state = {
        videoHome: '',
        videoTrayectoria: '',
        imgTrayectoria1: '',
        imgTrayectoria2: '',
        loader: false
    }

    _getData = () => {
        fetch('http://laravel.danielserrano.com.mx/public/api/content')
            .then(response => response.json())
            .then(responseJSON => {
                // console.log(responseJSON);
            })
    }

    _putData = () => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/content/update/${localStorage.getItem('token')}`, {
            method: 'PUT',
            body: JSON.stringify({
                "video_home": this.state.videoHome,
                "video_trayectoria": this.state.videoTrayectoria,
                "img_trayectoria_one": this.state.imgTrayectoria1.split('base64,')[1],
                "img_trayectoria_two": this.state.imgTrayectoria2.split('base64,')[1],
                "status": "1"
            })
        })
            .then(response => response.json())
            .then(responseJSON => {
                // console.log(responseJSON);
            })
    }

    _create = () => {
        if (this.state.videoHome !== '') {

            fetch('http://laravel.danielserrano.com.mx/public/api/home/create', {
                method: 'POST',
                body: JSON.stringify({
                    "token": localStorage.getItem('token'),
                    "video_home": this.state.videoHome,
                    "status": "1"
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON)
                    this.setState({
                        videoHome: ''
                    })
                    alert('Registro creado.')
                })
                .catch(err => {
                    console.log(err);
                    alert('Intentar más tarde.')
                })
        } else {
            alert("Llenar todos los datos.")
        }
    }

    _crearOne = () => {

        if (this.state.imgTrayectoria1 !== '' && this.state.imgTrayectoria2 !== '' && this.state.videoHome !== '' && this.state.videoTrayectoria !== '') {
            if (this.state.videoHome.includes('youtube') && this.state.videoTrayectoria.includes('youtube')) {
                this.setState({
                    loader: true
                })
                fetch(`http://laravel.danielserrano.com.mx/public/api/content/create`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "token": localStorage.getItem('token'),
                        "video_home": this.state.videoHome,
                        "video_trayectoria": this.state.videoTrayectoria,
                        "img_trayectoria_one": this.state.imgTrayectoria1.split('base64,')[1],
                        "img_trayectoria_two": this.state.imgTrayectoria2.split('base64,')[1],
                        "status": '1',
                    })
                })
                    .then(response => { console.log(response); return response.json() })
                    .then(responseJSON => {
                        if (responseJSON.status === 'succes') {
                            this.setState({
                                videoHome: '',
                                videoTrayectoria: '',
                                imgTrayectoria1: '',
                                imgTrayectoria2: '',
                                loader: false
                            })
                            alert("Registro completado.")
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Intentarlo más tarde.');
                        this.setState({
                            loader: false
                        })
                    })
            } else {
                alert('Solo se permiten videos de YouTube, por ejemplo: "https://www.youtube.com/watch?v=7SoYXlIZ7vU".');
            }
        } else {
            alert('Llenar todos los campos.');
        }
    }

    _base64 = (file, donde) => {
        var esto = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (donde === 1) {
                esto.setState({
                    imgTrayectoria1: reader.result
                })
            } else {
                esto.setState({
                    imgTrayectoria2: reader.result
                })
            }
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    componentDidMount() {
        this._getData();
    }

    render() {
        return (
            <div className='container-fluid position-relative px-0' style={{ overflow: 'hidden', }}>
                {this.state.loader ? (
                    <div className='position-fixed vh-100 vw-100 d-flex justify-content-center align-items-center' style={{ zIndex: 999, backgroundColor: 'rgba(0,0,0,.5)' }}>
                        <img alt='loader' src={Loader} style={{ width: '3rem', height: '3rem', }}></img>
                    </div>
                ) : (null)}

                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 mt-5 h4'>
                                Video Home
                            </div>
                        </div>
                        <div className='col-12'>
                            <input placeholder='Video de youtube que va en landing page.' value={this.state.videoHome} className='form-control' onChange={(event) => this.setState({ videoHome: event.target.value })} type='text'></input>
                        </div>
                        {/* <div className='col-12 mt-5 h4'>
                            Video Trayectoria
                        </div> */}
                        {/* <div className='col-12'>
                            <input placeholder='Video de youtube que va en trayectoria.' value={this.state.videoTrayectoria} className='form-control' onChange={(event) => this.setState({ videoTrayectoria: event.target.value })} type='text'></input>
                        </div> */}
                        {/* <div className='col-12 mt-5 h4'>
                            Imagen 1 Trayectoria
                        </div> */}
                        {/* <div className='col-12'>
                            <label htmlFor='img1' className='w-100'>
                                <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgTrayectoria1 !== '' ? (this.state.imgTrayectoria1) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                    {this.state.imgTrayectoria1 === '' ? (
                                        'Selecciona una imagen'
                                    ) : (null)}
                                </div>
                            </label>
                            <input id='img1' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 1)} type='file' accept="image/*"></input>
                        </div> */}
                        {/* <div className='col-12 mt-5 h4'>
                            Imagen 2 Trayectoria
                        </div> */}
                        {/* <div className='col-12'>
                            <label htmlFor='img2' className='w-100'>
                                <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgTrayectoria2 !== '' ? (this.state.imgTrayectoria2) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                    {this.state.imgTrayectoria2 === '' ? (
                                        'Selecciona una imagen'
                                    ) : (null)}
                                </div>
                            </label>
                            <input id='img2' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 2)} type='file' accept="image/*"></input>
                        </div> */}

                        <div className='row mt-3'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                {/* <div onClick={() => this._crearOne()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div> */}
                                <div onClick={() => this._create()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>

                    </div>
                </div>
                <UserControlBtn redir={this.props.history}></UserControlBtn>
                <Logout redir={this.props.history}></Logout>
            </div >
        )
    }
}

export default LandingAdmin
