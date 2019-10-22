import React, { Component } from 'react'
import Logout from '../Logout/Logout'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'

export class UserControl extends Component {
    state = {
        niveles: '',
        name: '',
        lastName: '',
        email: '',
        pass: '',
        usersData: {}
    }
    componentDidMount() {
        //         [8:37 p. m., 21/10/2019] Mike :3: 1 root 2 admin 3 usuari
        // [8:37 p. m., 21/10/2019] Mike :3: 3 no crea usuarios
        // [8:37 p. m., 21/10/2019] Mike :3: 2 crea y destruye usuarios nivel 3
        // [8:38 p. m., 21/10/2019] Mike :3: Nivel1 crea y destruye 2 y 3
        // [8:38 p. m., 21/10/2019] Mike :3: Nadie puede borrar 1
        fetch('http://laravel.danielserrano.com.mx/public/usuario/list')
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON.users)
                this.setState({
                    usersData: responseJSON.users
                })
            })
    }
    _createUser = () => {
        if (this.state.pass !== '' && this.state.niveles !== '' && this.state.name !== '' && this.state.lastName !== '' && this.state.email !== '') {
            fetch('http://laravel.danielserrano.com.mx/public/usuario/registro', {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.name,
                    "lastname": this.state.lastName,
                    "nivel": this.state.niveles,
                    "role": this.state.niveles == '1' ? 'root' : this.state.niveles == '2' ? 'admin' : 'user',
                    "email": this.state.email,
                    "pass": this.state.pass,
                    "status": "1"
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON);
                    alert("Registro completado.")
                    window.location.reload();
                })
                .catch(err => console.log(err))
        } else {
            alert("Llenar todos los datos.");
        }
    }

    _deleteUser = (id) => {
        console.log(id)
        fetch(`http://laravel.danielserrano.com.mx/public/usuario/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "status": '0',
                "token": localStorage.getItem('token')
            })
        })
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON);
                alert('Usuario elimiado');
                window.location.reload();
            })
    }

    render() {
        return (
            <div className='container-fluid'>
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 mt-5 h3' style={{ color: '#941725' }}>
                                Control de usuarios
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Nivel de usuario
                                <select className='form-control mt-1' value={this.state.niveles} onChange={(event) => this.setState({ niveles: event.target.value })}>
                                    <option value=''>Selecciona una opción</option>
                                    <option value='1'>Root</option>
                                    <option value='2'>Administrador</option>
                                    <option value='3'>Usuario</option>
                                </select>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Nombre
                                <input className='form-control' value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Apellido
                                <input className='form-control' value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} type='text'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Correo
                                <input className='form-control' value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} type='email'></input>
                            </div>
                            <div className='col-12 mt-5 h4'>
                                Contraseña
                                <input className='form-control' value={this.state.pass} onChange={(event) => this.setState({ pass: event.target.value })} type='password'></input>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._createUser()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Crear</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 h4 px-5'>
                                Lista de usuarios
                                {this.state.usersData.length !== undefined ? (
                                    this.state.usersData.map(usuario =>
                                        usuario.status !== 0 ? (

                                            < div key={usuario.id} className='row' style={{ border: '1px solid gray' }}>
                                                <div className='col-12 h5' style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
                                                    <div onClick={() => this._deleteUser(`${usuario.id}`)} style={{ position: 'absolute', backgroundColor: '#dc3545', right: '-2%', borderRadius: '100%', width: '1.5rem', height: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white' }}>x</div>
                                                    Nombre: {usuario.name} {usuario.lastname} - Email: {usuario.email} - Nivel: {usuario.nivel}
                                                </div>
                                            </div>
                                        ) : (null)
                                    )
                                ) : (null)}

                            </div>
                        </div>
                    </div>
                </div>
                {/* <UserControlBtn redir={this.props.history}></UserControlBtn> */}
                <Logout redir={this.props.history}></Logout>
            </div >
        )
    }
}

export default UserControl
