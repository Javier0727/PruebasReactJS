import React, { Component } from 'react'

export class Logout extends Component {
    render() {
        return (
            <div className='btn btn-danger' onClick={() => {
                localStorage.removeItem("token");
                this.props.redir.push("/admin");
            }} style={{ position: 'fixed', bottom: '5%', right: '5%' }}>
                Cerrar Sesión
            </div>
        )
    }
}

export default Logout
