import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';
import Loader from '../../../resources/loader.gif';

export class TrayectoriaAdmin extends Component {
    state = {
        yearStart: '',
        yearEnd: '',
        description: '',
        trayectoria: [],
        videoTrayectoria: '',
        imgTrayectoria1: '',
        imgTrayectoria2: '',
        loader: false
    }

    componentDidMount() {
        // fetch('http://laravel.danielserrano.com.mx/public/api/trayectoria')
        //     .then(response => response.json())
        //     .then(responseJSON => {
        //         console.log(responseJSON.trayectoria)
        //         this.setState({
        //             trayectoria: responseJSON.trayectoria
        //         })
        //     })
        this._getTrayectoriaData();
    }

    _getTrayectoriaData = () => {
        fetch('http://laravel.danielserrano.com.mx/public/api/trayectoria')
            .then(response => response.json())
            .then(responseJSON => {
                this.setState({
                    trayectoria: responseJSON.trayectoria
                })
            })
    }

    _delete = (id) => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/trayectoria/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "status": "0",
                "token": localStorage.getItem('token')
            })
        })
            .then((response) => response.json())
            .then(responseJSON => {
                // console.log(responseJSON)
                alert("Registro eliminado correctamente.")
                // window.location.reload();
                this._getTrayectoriaData();
            })
            .catch((err) => {
                alert("Intentar más tarde.")
            });
    }

    _create = () => {
        if (this.state.yearStart !== '' && this.state.yearEnd !== '' && this.state.description !== '') {
            fetch('http://laravel.danielserrano.com.mx/public/api/trayectoria/create', {
                method: 'POST',
                body: JSON.stringify({
                    "token": localStorage.getItem('token'),
                    "year_ini": this.state.yearStart,
                    "year_fin": this.state.yearEnd,
                    "descripcion": this.state.description,
                    "status": "1"
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    // console.log(responseJSON)
                    if (responseJSON.status === 'succes') {
                        this.setState({
                            yearEnd: '',
                            yearStart: '',
                            description: ''
                        })
                        this._getTrayectoriaData();
                        alert("Registro creado.");
                    }
                })
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

    _createTrayectoria = () => {
        if (this.state.imgTrayectoria1 !== '' && this.state.imgTrayectoria2 !== '' && this.state.videoTrayectoria !== '') {
            if (this.state.videoTrayectoria.includes('youtube')) {
                this.setState({
                    loader: true
                })
                fetch(`http://laravel.danielserrano.com.mx/public/api/content/create`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "token": localStorage.getItem('token'),
                        "video_trayectoria": this.state.videoTrayectoria,
                        "img_trayectoria_one": this.state.imgTrayectoria1.split('base64,')[1],
                        "img_trayectoria_two": this.state.imgTrayectoria2.split('base64,')[1],
                        "video_home": '',
                        "status": '1',
                    })
                })
                    .then(response => { console.log(response); return response.json() })
                    .then(responseJSON => {
                        if (responseJSON.status === 'succes') {
                            this.setState({
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
                alert("El video tiene que ser de youtube, ejemplo https://www.youtube.com/watch?v=aqRATDYlIVg.");
            }
        } else {
            alert("Ingresa todos los datos solicitados");
        }
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
                            <div className='col-6 mt-5 h4'>
                                Año Inicio
                            <input placeholder='Ingrese año de inicio' value={this.state.yearStart} className='form-control' onChange={(event) => this.setState({ yearStart: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-6 mt-5 h4'>
                                Año Fin
                            <input placeholder='Ingrese año de fin' value={this.state.yearEnd} className='form-control' onChange={(event) => this.setState({ yearEnd: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Descripcion
                            <textarea placeholder='Ingrese una descripción' value={this.state.description} className='form-control' onChange={(event) => this.setState({ description: event.target.value })} ></textarea>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._create()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            {this.state.trayectoria.length > 0 ? (
                                this.state.trayectoria.map(trayectoria =>
                                    trayectoria.status === 1 ? (
                                        <div onClick={() => this._delete(trayectoria.id)} key={trayectoria.id} className='col-12 mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                            {trayectoria.year_ini} - {trayectoria.year_fin} | {trayectoria.descripcion}
                                        </div>
                                    ) : (null)
                                )
                            ) : (null)}
                        </div>
                        <div className='row mt-3'>
                            <div className='col-12 mt-5 h4'>
                                Video Trayectoria
                        </div>
                            <div className='col-12'>
                                <input placeholder='Video de youtube que va en trayectoria.' value={this.state.videoTrayectoria} className='form-control' onChange={(event) => this.setState({ videoTrayectoria: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Imagen 1 Trayectoria
                        </div>
                            <div className='col-12'>
                                <label htmlFor='img1' className='w-100'>
                                    <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgTrayectoria1 !== '' ? (this.state.imgTrayectoria1) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                        {this.state.imgTrayectoria1 === '' ? (
                                            'Selecciona una imagen'
                                        ) : (null)}
                                    </div>
                                </label>
                                <input id='img1' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 1)} type='file' accept="image/*"></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Imagen 2 Trayectoria
                        </div>
                            <div className='col-12'>
                                <label htmlFor='img2' className='w-100'>
                                    <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgTrayectoria2 !== '' ? (this.state.imgTrayectoria2) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                        {this.state.imgTrayectoria2 === '' ? (
                                            'Selecciona una imagen'
                                        ) : (null)}
                                    </div>
                                </label>
                                <input id='img2' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 2)} type='file' accept="image/*"></input>
                            </div>

                            <div className='row mt-3 w-100'>
                                <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                    {/* <div onClick={() => this._crearOne()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div> */}
                                    <div onClick={() => this._createTrayectoria()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserControlBtn redir={this.props.history}></UserControlBtn>
                <Logout redir={this.props.history}></Logout>
            </div>
        )
    }
}

export default TrayectoriaAdmin
