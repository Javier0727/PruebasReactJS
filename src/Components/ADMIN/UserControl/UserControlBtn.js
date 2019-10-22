import React, { Component } from 'react'

export class UserControlBtn extends Component {
    render() {
        return (
            <div className='btn btn-info' onClick={() => {
                // localStorage.removeItem("token");
                this.props.redir.push("/admin/usuarios");
            }} style={{ position: 'fixed', bottom: '15%', right: '5%' }}>
                Usuarios
            </div>
        )
    }
}

export default UserControlBtn
