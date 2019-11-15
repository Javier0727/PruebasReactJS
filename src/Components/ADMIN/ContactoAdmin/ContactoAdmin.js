import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'
import UserControlBtn from '../UserControl/UserControlBtn'
import Logout from '../Logout/Logout'

export class ContactoAdmin extends Component {

    state = {
        data: []
    }
    componentDidMount() {
        fetch('http://laravel.danielserrano.com.mx/public/api/contacto')
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON.contacto)
                this.setState({
                    data: responseJSON.contacto
                })
            })
    }
    render() {
        return (
            <div className='container-fluid position-relative px-0' style={{ overflow: 'hidden', }}>
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 mt-5 h4'>
                                Registro de Contacto
                            </div>
                        </div>
                        <div className='col-12'>
                            {this.state.data.length > 0 ? (
                                this.state.data.map(usuario =>
                                    <div className='my-2 p-2' style={{ border: '1px solid black', maxHeight: '13rem', overflow: 'auto', backgroundColor: 'rgba(255,255,255,.3)', }} key={usuario.id}>
                                        <div>Nombre: {usuario.name}</div>
                                        <div>Email: {usuario.email}</div>
                                        <div>Teléfono: {usuario.tel}</div>
                                        <div>Mensaje: {usuario.msj}</div>

                                    </div>
                                )
                            ) : (null)}
                        </div>
                    </div>
                </div>
                <UserControlBtn redir={this.props.history}></UserControlBtn>
                <Logout redir={this.props.history}></Logout>
            </div >
        )
    }
}

export default ContactoAdmin
