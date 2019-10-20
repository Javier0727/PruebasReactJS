import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import $ from 'jquery';
import Logout from '../Logout/Logout';

export class LandingAdmin extends Component {
    state = {
        videoHome: '',
        videoTrayectoria: '',
        imgTrayectoria1: '',
        imgTrayectoria2: ''
    }

    _getData = () => {
        fetch('http://laravel.danielserrano.com.mx/public/api/content')
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON);
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
                console.log(responseJSON);
            })
    }

    _crearOne = () => {
        if (this.state.imgTrayectoria1 !== '' && this.state.imgTrayectoria2 !== '' && this.state.imgTrayectoria2 !== '' && this.state.videoHome !== '' && this.state.videoTrayectoria !== '') {
            if (this.state.videoHome.includes('youtube') && this.state.videoTrayectoria.includes('youtube')) {

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
                        console.log(responseJSON);
                    })
                    .catch(err => console.log(err))
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
            // console.log(reader.result);
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
            <div className='container-fluid'>
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 mt-5 h4'>
                                Video Home
                            </div>
                        </div>
                        {/* <div className='row'> */}
                        <div className='col-12'>
                            <input className='form-control' onChange={(event) => this.setState({ videoHome: event.target.value })} type='text'></input>
                        </div>
                        {/* </div> */}
                        {/* <div className='row'> */}
                        <div className='col-12 mt-5 h4'>
                            Video Trayectoria
                            </div>
                        {/* </div> */}
                        {/* <div className='row'> */}
                        <div className='col-12'>
                            <input className='form-control' onChange={(event) => this.setState({ videoTrayectoria: event.target.value })} type='text'></input>
                        </div>
                        {/* </div> */}
                        {/* <div className='row'> */}
                        <div className='col-12 mt-5 h4'>
                            Imagen 1 Trayectoria
                            </div>
                        {/* </div> */}
                        {/* <div className='row'> */}
                        <div className='col-12'>
                            <label htmlFor='img1' className='w-100'>
                                <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgTrayectoria1 !== '' ? (this.state.imgTrayectoria1) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                    {this.state.imgTrayectoria1 === '' ? (
                                        'Selecciona una imagen'
                                    ) : (null)}
                                </div>
                            </label>
                            <input id='img1' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 1)} type='file'></input>
                        </div>
                        {/* </div> */}
                        {/* <div className='row'> */}
                        <div className='col-12 mt-5 h4'>
                            Imagen 2 Trayectoria
                            </div>
                        {/* </div> */}
                        {/* <div className='row'> */}
                        <div className='col-12'>
                            <label htmlFor='img2' className='w-100'>
                                <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgTrayectoria2 !== '' ? (this.state.imgTrayectoria2) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                    {this.state.imgTrayectoria2 === '' ? (
                                        'Selecciona una imagen'
                                    ) : (null)}
                                </div>
                            </label>
                            <input id='img2' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 2)} type='file'></input>
                        </div>
                        {/* </div> */}

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._crearOne()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>

                    </div>
                </div>
                <Logout redir={this.props.history}></Logout>
            </div >
        )
    }
}

export default LandingAdmin
