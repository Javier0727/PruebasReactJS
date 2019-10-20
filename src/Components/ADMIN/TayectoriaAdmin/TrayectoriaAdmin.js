import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';

export class TrayectoriaAdmin extends Component {
    state = {
        yearStart: '',
        yearEnd: '',
        description: '',
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
                    console.log(responseJSON)
                    if (responseJSON.status === 'succes') {
                        this.setState({
                            yearEnd: '',
                            yearStart: '',
                            description: ''
                        })
                        alert("Registro creado.");
                    }
                })
        } else {
            alert('Llenar todos los campos.');
        }
    }

    render() {
        return (
            <div className='container-fluid'>
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-6 mt-5 h4'>
                                Año Inicio
                            <input value={this.state.yearStart} className='form-control' onChange={(event) => this.setState({ yearStart: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-6 mt-5 h4'>
                                Año Fin
                            <input value={this.state.yearEnd} className='form-control' onChange={(event) => this.setState({ yearEnd: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Descripcion
                            <textarea value={this.state.description} className='form-control' onChange={(event) => this.setState({ description: event.target.value })} ></textarea>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._create()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>

                    </div>
                </div>
                <Logout redir={this.props.history}></Logout>
            </div>
        )
    }
}

export default TrayectoriaAdmin
