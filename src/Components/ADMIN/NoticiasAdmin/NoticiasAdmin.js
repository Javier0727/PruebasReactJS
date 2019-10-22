import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';

export class NoticiasAdmin extends Component {

    state = {
        categoria: '',
        titulo: '',
        enlace: '',
        imagen: ''
    }

    componentDidMount() {
        fetch('http://laravel.danielserrano.com.mx/public/api/noticias')
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
            })
    }

    _create = () => {
        if (this.state.categoria !== '' && this.state.titulo !== '' && this.state.enlace !== '' && this.state.imagen !== '') {
            fetch('http://laravel.danielserrano.com.mx/public/api/noticias/create', {
                method: 'POST',
                body: JSON.stringify({
                    "token": localStorage.getItem('token'),
                    "categoria": this.state.categoria,
                    "titulo": this.state.titulo,
                    "link_one": this.state.enlace,
                    "img_one": this.state.imagen.split("base64,")[1],
                    "status": "1"

                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON)
                    if (responseJSON.code !== 400) {
                        if (responseJSON.status === 'succes') {
                            this.setState({
                                categoria: '',
                                titulo: '',
                                enlace: '',
                                imagen: ''
                            })
                            alert("Registro creado.");
                        }
                    } else {
                        alert("Usuario no logeado.");
                        this.props.history.push("/admin");
                    }
                })
        } else {
            alert('Llenar todos los datos.');
        }
    }
    // {
    //     }
    _base64 = (file) => {
        var esto = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // console.log(reader.result);
            esto.setState({
                imagen: reader.result
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    render() {
        return (
            <div className='container-fluid'>
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 mt-5 h4'>
                                Categoria
                                <select className='form-control' value={this.state.categoria} onChange={(event) => this.setState({ categoria: event.target.value })}>
                                    <option value=''>Selecciona una opción</option>
                                    <option value='columna'>Columna</option>
                                    <option value='video columna'>VideoColumna</option>
                                </select>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Título
                                <input className='form-control' value={this.state.titulo} onChange={(event) => this.setState({ titulo: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Enlace
                                <input className='form-control' value={this.state.enlace} onChange={(event) => this.setState({ enlace: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='img1' className='w-100'>
                                    <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imagen !== '' ? (this.state.imagen) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                                        {this.state.imagen === '' ? (
                                            'Selecciona una imagen'
                                        ) : (null)}
                                    </div>
                                </label>
                                <input id='img1' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0])} type='file'></input>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._create()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
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

export default NoticiasAdmin
