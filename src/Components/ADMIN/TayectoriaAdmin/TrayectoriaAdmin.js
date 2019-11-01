import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';

export class TrayectoriaAdmin extends Component {
    state = {
        yearStart: '',
        yearEnd: '',
        description: '',
        trayectoria: []
    }

    componentDidMount() {
        fetch('http://laravel.danielserrano.com.mx/public/api/trayectoria')
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON.trayectoria)
                this.setState({
                    trayectoria: responseJSON.trayectoria
                })
            })
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
                                        <div onClick={() => console.log(trayectoria.id)} key={trayectoria.id} className='col-12 mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                            {trayectoria.year_ini} - {trayectoria.year_fin} | {trayectoria.descripcion}
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

export default TrayectoriaAdmin
