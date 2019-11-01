import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';

export class BlogAdmin extends Component {

    state = {
        videoYT: '',
        blogData: []
    }

    componentDidMount() {
        fetch("http://laravel.danielserrano.com.mx/public/api/blog")
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON)
                this.setState({
                    blogData: responseJSON.blog
                })
            })
            .catch(err => console.log(err))
    }


    _create = () => {
        if (this.state.videoYT !== '' && this.state.videoYT.includes("youtube")) {
            fetch('http://laravel.danielserrano.com.mx/public/api/blog/create', {
                method: 'POST',
                body: JSON.stringify({
                    "video_one": this.state.videoYT,
                    "status": "1",
                    "token": localStorage.getItem('token'),
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON);
                    if (responseJSON.status === 'succes') {
                        this.setState({
                            videoYT: ''
                        })
                        alert("Registro creado.");
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Hubo un error, intentarlo más tarde.");
                })
        } else {
            alert("Llenar correctamente los datos.");
        }
    }
    render() {
        return (
            <div className='container-fluid'>
                <NavbarAdmin></NavbarAdmin>
                <div className='row mb-5' style={{ justifyContent: 'center' }}>
                    <div className='col-md-6 col-10' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 mt-5 h4'>
                                Enlace del video
                            <input placeholder='Ingresar enlace de youtube.' value={this.state.videoYT} className='form-control' onChange={(event) => this.setState({ videoYT: event.target.value })} type='text'></input>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._create()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            {this.state.blogData.length > 0 ? (
                                this.state.blogData.map(blog =>
                                    blog.status === 1 ? (
                                        <div onClick={() => console.log(blog.id)} key={blog.id} className='col-12 mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                            {blog.video_one}
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

export default BlogAdmin
