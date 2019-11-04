import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';
import Loader from '../../../resources/loader.gif';

export class PorelEdoAdmin extends Component {
    state = {
        imgPueblo: '',
        imgMilitancia: '',
        imgDistrito: '',
        distritosList: {},
        distritoId: '',
        distritoNum: '',
        distritoTitulo: '',
        distritoNew: '',
        puebloData: [],
        militanciaData: [],
        distritosData: [],
        distritosImgData: [],
        loader: false
    }

    componentDidMount() {

        fetch("http://laravel.danielserrano.com.mx/public/api/pueblo")
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                this.setState({
                    puebloData: responseJSON.Pueblo
                })
            })
            .catch(err => console.log(err));

        fetch("http://laravel.danielserrano.com.mx/public/api/militancia")
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                this.setState({
                    militanciaData: responseJSON.Militancia
                })
            })
            .catch(err => console.log(err));


        fetch("http://laravel.danielserrano.com.mx/public/api/distritos")
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                this.setState({
                    distritosList: responseJSON.Distritos
                })
            })
            .catch(err => console.log(err));

        fetch("http://laravel.danielserrano.com.mx/public/api/distritos/img/list")
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                this.setState({
                    distritosImgData: responseJSON.Imgdistritos
                })
            })
            .catch(err => console.log(err));
    }

    _delete1 = (id) => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/pueblo/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "status": "0",
                "token": localStorage.getItem('token')
            })
        })
            .then((response) => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                alert("Registro eliminado correctamente.")
                window.location.reload();
            })
            .catch((err) => {
                alert("Intentar más tarde.")
            });
    }
    _delete2 = (id) => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/militancia/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "status": "0",
                "token": localStorage.getItem('token')
            })
        })
            .then((response) => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                alert("Registro eliminado correctamente.")
                window.location.reload();
            })
            .catch((err) => {
                alert("Intentar más tarde.")
            });
    }
    _delete3 = (id) => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/distritos/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "status": "0",
                "token": localStorage.getItem('token')
            })
        })
            .then((response) => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                alert("Registro eliminado correctamente.")
                window.location.reload();
            })
            .catch((err) => {
                alert("Intentar más tarde.")
            });
    }
    _delete4 = (id) => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/distritos/img/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "status": "0",
                "token": localStorage.getItem('token')
            })
        })
            .then((response) => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                alert("Registro eliminado correctamente.")
                window.location.reload();
            })
            .catch((err) => {
                alert("Intentar más tarde.")
            });
    }

    _base64 = (file, donde) => {
        var esto = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // console.log(reader.result);
            switch (Number(donde)) {
                case 1:
                    esto.setState({
                        imgPueblo: reader.result
                    })
                    break;
                case 2:
                    esto.setState({
                        imgMilitancia: reader.result
                    })
                    break;
                case 3:
                    esto.setState({
                        imgDistrito: reader.result
                    })
                    break;

                default:
                    break;
            }
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    _createPueblo = () => {
        if (this.state.imgPueblo !== '') {
            this.setState({
                loader: true
            })
            fetch("http://laravel.danielserrano.com.mx/public/api/pueblo/create", {
                method: 'POST',
                body: JSON.stringify({
                    "img_one": this.state.imgPueblo.split("base64,")[1],
                    "status": "1",
                    "token": localStorage.getItem("token")
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    if (responseJSON.code !== 400) {
                        if (responseJSON.status === 'succes') {
                            this.setState({
                                imgPueblo: '',
                                loader: false
                            })
                            alert("Registro creado.");
                        } else {
                            this.setState({
                                loader: false
                            })
                            alert("Intentar más tarde.");
                        }
                    } else {
                        this.setState({
                            loader: false
                        })
                        alert("Usuario no logeado.");
                        this.props.history.push("/admin");
                    }
                    console.log(responseJSON)
                })
                .catch(err => {
                    this.setState({
                        loader: false
                    })
                    alert("Intentar más tarde.")
                    console.log(err)
                })
        } else {
            alert("Llenar todos los datos.")
        }
    }

    _createMilitancia = () => {
        if (this.state.imgMilitancia !== '') {
            this.setState({
                loader: true
            })
            fetch("http://laravel.danielserrano.com.mx/public/api/militancia/create", {
                method: 'POST',
                body: JSON.stringify({
                    "img_one": this.state.imgMilitancia.split("base64,")[1],
                    "status": "1",
                    "token": localStorage.getItem("token"),
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    if (responseJSON.code !== 400) {
                        if (responseJSON.status === 'succes') {
                            this.setState({
                                imgMilitancia: '',
                                loader: false
                            })
                            alert("Registro creado.");
                        } else {
                            this.setState({
                                loader: false
                            })
                            alert("Intentar más tarde.");
                        }
                    } else {
                        this.setState({
                            loader: false
                        })
                        alert("Usuario no logeado.");
                        this.props.history.push("/admin");
                    }
                    console.log(responseJSON)
                })
                .catch(err => {
                    this.setState({
                        loader: false
                    })
                    alert('Intentar más tarde.')
                    console.log(err)
                })
        } else {
            alert("Llenar todos los datos.")
        }
    }
    _newImageDist = () => {
        if (this.state.imgDistrito !== '' && this.state.distritoId !== '' && this.state.distritoId !== '0') {
            this.setState({
                loader: true
            })
            fetch('http://laravel.danielserrano.com.mx/public/api/distritos/img/create', {
                method: 'POST',
                body: JSON.stringify({
                    "img_distrito": this.state.imgDistrito.split('base64,')[1],
                    "id_distro": this.state.distritoId.split(",")[0],
                    "numero_distro": this.state.distritoId.split(',')[1],
                    "status": "1",
                    "token": localStorage.getItem('token')
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON)
                    if (responseJSON.code !== 400) {
                        if (responseJSON.code === 200) {
                            this.setState({
                                imgDistrito: '',
                                distritoId: '',
                                loader: false
                            })
                            alert("Registro creado.");
                        } else {
                            this.setState({
                                loader: false
                            })
                            alert("Intentar más tarde.");
                        }
                    } else {
                        this.setState({
                            loader: false
                        })
                        alert("Usuario no logeado.");
                        this.props.history.push("/admin");
                    }
                })
                .catch(err => {
                    this.setState({
                        loader: false
                    })
                    alert('Intentar más tarde.')
                    console.log(err)
                })
        } else {
            alert("Llenar todos los campos.");
        }

    }

    _createDist = () => {
        if (this.state.distritoNew !== '' && this.state.distritoTitulo !== '') {
            fetch('http://laravel.danielserrano.com.mx/public/api/distritos/create', {
                method: 'POST',
                body: JSON.stringify({
                    "title": this.state.distritoTitulo,
                    "numero": this.state.distritoNew,
                    "status": "1",
                    "token": localStorage.getItem("token")
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON);
                    if (responseJSON.code !== 400) {
                        if (responseJSON.code === 200) {
                            this.setState({
                                distritoTitulo: '',
                                distritoNew: ''
                            })
                            alert("Registro creado.");
                        } else {
                            alert("Intentar más tarde.");
                        }
                    } else {
                        alert("Usuario no logeado.");
                        this.props.history.push("/admin");
                    }
                })
        } else {
            alert("Llenar todos los campos.");
        }

    }

    render() {
        return (
            <div className='container-fluid position-relative px-0 overflow-hidden'>
                {this.state.loader ? (
                    <div className='position-fixed vh-100 vw-100 d-flex justify-content-center align-items-center' style={{ zIndex: 999, backgroundColor: 'rgba(0,0,0,.5)' }}>
                        <img alt='loader' src={Loader} style={{ width: '3rem', height: '3rem', }}></img>
                    </div>
                ) : (null)}
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12'>
                                <div className='h2 mt-5' style={{ color: '#941725' }}>Pueblo Organizado</div>
                                <label htmlFor='img1' className='w-100'>
                                    <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgPueblo !== '' ? (this.state.imgPueblo) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain', backgroundColor: 'white', }}>
                                        {this.state.imgPueblo === '' ? (
                                            'Selecciona una imagen'
                                        ) : (null)}
                                    </div>
                                </label>
                                <input id='img1' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 1)} type='file' accept="image/*"></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._createPueblo()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            {this.state.puebloData.length > 0 ? (
                                this.state.puebloData.map(pueblo =>
                                    pueblo.status === 1 ? (
                                        <div onClick={() => this._delete1(pueblo.id)} key={pueblo.id} className='col-3 d-flex justify-content-center mb-1 delete cursor_pointer' style={{ border: '1px solid gray', minHeight: '3rem' }}>
                                            <img src={pueblo.img_one} style={{ width: '5rem' }}></img>
                                        </div>
                                    ) : (null)
                                )
                            ) : (null)}
                        </div>

                        <div className='row mt-2'>
                            <div className='col-12'>
                                <div className='h2 mt-5' style={{ color: '#941725' }}>Con la Militancia</div>
                                <label htmlFor='img2' className='w-100'>
                                    <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgMilitancia !== '' ? (this.state.imgMilitancia) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain', backgroundColor: 'white', }}>
                                        {this.state.imgMilitancia === '' ? (
                                            'Selecciona una imagen'
                                        ) : (null)}
                                    </div>
                                </label>
                                <input id='img2' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 2)} type='file' accept="image/*"></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._createMilitancia()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            {this.state.militanciaData.length > 0 ? (
                                this.state.militanciaData.map(militancia =>
                                    militancia.status === 1 ? (
                                        <div onClick={() => this._delete2(militancia.id)} key={militancia.id} className='col-3 d-flex justify-content-center mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                            <img src={militancia.img_one} style={{ width: '5rem', height: '7rem' }}></img>
                                        </div>
                                    ) : (null)
                                )
                            ) : (null)}
                        </div>

                        <div className='row mt-2'>
                            <div className='col-12'>
                                <div className='h2 mt-5' style={{ color: '#941725' }}>Distritos</div>
                                <div className='col-12 mt-3 h4'>
                                    Distrito
                                        <select className='form-control' onChange={(event) => this.setState({ distritoId: event.target.value })}>
                                        <option value='0'>Selecciona una opción</option>
                                        {this.state.distritosList.length !== undefined ? (
                                            this.state.distritosList.map(distrito =>
                                                <option key={distrito.id} value={`${distrito.id},${distrito.numero}`}>{distrito.title}</option>
                                            )
                                        ) : (null)}
                                        <option value='-1'>Crear Nuevo Distrito</option>
                                    </select>
                                    {this.state.distritoId === '-1' ? (
                                        <div className='mt-2'>
                                            <input value={this.state.distritoTitulo} onChange={(event) => this.setState({ distritoTitulo: event.target.value })} placeholder='Nombre de Distrito' type="text" className='form-control'></input>
                                            <input value={this.state.distritoNew} onChange={(event) => this.setState({ distritoNew: event.target.value })} placeholder='Numero de Distrito' type="text" className='form-control mt-2'></input>
                                        </div>
                                    ) : (
                                            <div className='mt-2'>
                                                <label htmlFor='img3' className='w-100'>
                                                    <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imgDistrito !== '' ? (this.state.imgDistrito) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain', backgroundColor: 'white', }}>
                                                        {this.state.imgDistrito === '' ? (
                                                            'Selecciona una imagen'
                                                        ) : (null)}
                                                    </div>
                                                </label>
                                                <input id='img3' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0], 3)} type='file' accept="image/*"></input>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        {this.state.distritoId === '-1' ? (
                            <div className='row'>
                                <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                    <div onClick={() => this._createDist()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Crear</div>
                                </div>
                            </div>
                        ) : (
                                <div className='row'>
                                    <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                        <div onClick={() => this._newImageDist()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                                    </div>
                                </div>
                            )}
                        <div className='row mt-3' style={{ minHeight: '4rem' }}>
                            {this.state.distritosList.length > 0 ? (
                                this.state.distritosList.map(distrito =>
                                    distrito.status === 1 ? (
                                        <div onClick={() => this._delete3(distrito.id)} key={distrito.id} className='col-12 mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                            {distrito.title}
                                        </div>
                                    ) : (null)
                                )
                            ) : (null)}
                        </div>

                        <hr />

                        <div className='row mt-3'>
                            {this.state.distritosImgData.length > 0 ? (
                                this.state.distritosImgData.map(distImg =>
                                    distImg.status === 1 ? (
                                        <div onClick={() => this._delete4(distImg.id)} key={distImg.id} className='col-3 d-flex position-relative align-items-center justify-content-center mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                            <img src={distImg.img_distrito} style={{ width: '5rem', height: '7rem' }}></img>
                                            <div className='position-absolutes'>Distrito {distImg.numero_distro}</div>
                                        </div>
                                    ) : (null)
                                )
                            ) : (null)}
                        </div>
                    </div>
                </div>
                <UserControlBtn redir={this.props.history}></UserControlBtn>
                <Logout redir={this.props.history}></Logout>
            </div>
        )
    }
}

export default PorelEdoAdmin
