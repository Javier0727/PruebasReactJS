import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Logout from '../Logout/Logout';
import UserControlBtn from '../UserControl/UserControlBtn';
import { Editor } from '@tinymce/tinymce-react';

export class BlogAdmin extends Component {

    state = {
        videoYT: '',
        blogData: [],
        blogText: '',
        blogTipo: 1,
        imagen: ''
    }

    componentDidMount() {
        this._getBlogData();
        // fetch("http://laravel.danielserrano.com.mx/public/api/blog")
        //     .then(response => response.json())
        //     .then(responseJSON => {
        //         console.log(responseJSON)
        //         this.setState({
        //             blogData: responseJSON.blog
        //         })
        //     })
        //     .catch(err => console.log(err))
    }

    _getBlogData = () => {
        fetch("http://laravel.danielserrano.com.mx/public/api/blog")
            .then(response => response.json())
            .then(responseJSON => {
                // console.log(responseJSON)
                this.setState({
                    blogData: responseJSON.blog
                })
            })
            .catch(err => console.log(err))
    }

    _delete = (id) => {
        fetch(`http://laravel.danielserrano.com.mx/public/api/blog/update/${id}`, {
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
                this._getBlogData();
            })
            .catch((err) => {
                alert("Intentar más tarde.")
            });
    }

    _create = () => {

        if (this.state.blogTipo === 1) {
            if (this.state.videoYT !== '' && this.state.videoYT.includes("youtube")) {
                fetch('http://laravel.danielserrano.com.mx/public/api/blog/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        "video_one": this.state.videoYT,
                        "status": "1",
                        "tipo": 1,
                        "token": localStorage.getItem('token'),
                    })
                })
                    .then(response => response.json())
                    .then(responseJSON => {
                        // console.log(responseJSON);
                        if (responseJSON.status === 'succes') {
                            this.setState({
                                videoYT: ''
                            })
                            this._getBlogData();
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
        } else {
            if (this.state.blogText !== '' && this.state.imagen !== '') {
                fetch('http://laravel.danielserrano.com.mx/public/api/blog/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        "content_one": this.state.blogText,
                        "status": "1",
                        "tipo": 2,
                        "token": localStorage.getItem('token'),
                        "img_one": this.state.imagen.split('base64,')[1]
                    })
                })
                    .then(response => response.json())
                    .then(responseJSON => {
                        // console.log(responseJSON);
                        if (responseJSON.status === 'succes') {
                            this._getBlogData();
                            alert("Registro creado.");
                            window.location.reload()
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
    }

    handleEditorChange = (e) => {
        this.setState({
            blogText: JSON.stringify(e.target.getContent())
        })
    }

    _base64 = (file) => {
        var esto = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
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
                    <div className='col-md-6 col-10 pt-5' style={{ boxShadow: '0px 0px 5px 0px gray', paddingBottom: '1rem' }}>
                        <div className='row mt-5'>
                            <div className='col-12 h4'>
                                Selecciona el tipo de blog
                            </div>
                        </div>

                        <select className='form-control mt-3 mb-3' onChange={(event) => this.setState({ blogTipo: event.target.value })}>
                            <option value={1}>VIDEOBLOG</option>
                            <option value={2}>BLOG ESCRITO</option>
                        </select>
                        {this.state.blogTipo == 1 ? (
                            <div className='row '>
                                <div className='col-12 h4'>
                                    Enlace del video
                                    <input placeholder='Ingresar enlace de youtube.' value={this.state.videoYT} className='form-control' onChange={(event) => this.setState({ videoYT: event.target.value })} type='text'></input>
                                </div>
                            </div>
                        ) : (
                                <>
                                    <div className='row mt-5'>
                                        <div className='col-12 h4'>
                                            Ingresa el contenido del blog
                                        </div>
                                    </div>
                                    <Editor
                                        initialValue="<p>This is the initial content of the editor</p>"
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat'
                                        }}
                                        onChange={this.handleEditorChange}
                                    />

                                    <div className='col-12 mt-2'>
                                        <label htmlFor='img1' className='w-100'>
                                            <div style={{ cursor: 'pointer', width: '100%', height: '13rem', border: '1px solid #ced4da', borderRadius: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${this.state.imagen !== '' ? (this.state.imagen) : ('')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain', backgroundColor: 'white' }}>
                                                {this.state.imagen === '' ? (
                                                    'Selecciona una imagen'
                                                ) : (null)}
                                            </div>
                                        </label>
                                        <input id='img1' style={{ display: 'none' }} className='form-control' onChange={(event) => this._base64(event.target.files[0])} type='file' accept="image/*"></input>
                                    </div>

                                </>
                            )}

                        <div className='row'>
                            <div className='col-12' style={{ justifyContent: 'center', display: 'flex', }}>
                                <div onClick={() => this._create()} className='btn btn-danger' style={{ cursor: 'pointer' }}>Guardar</div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            {this.state.blogData.length > 0 ? (
                                this.state.blogData.map(blog =>
                                    blog.status === 1 ? (
                                        blog.tipo === 1 ? (
                                            <div onClick={() => this._delete(blog.id)} key={blog.id} className='col-12 mb-1 delete cursor_pointer' style={{ border: '1px solid gray' }}>
                                                {blog.video_one}
                                            </div>
                                        ) : (
                                                <div dangerouslySetInnerHTML={{ __html: JSON.parse(blog.content_one) }} onClick={() => this._delete(blog.id)} key={blog.id} className='col-12 mb-1 delete cursor_pointer' style={{ border: '1px solid gray', maxHeight: '7rem', overflow: 'auto', }}>
                                                </div>
                                            )
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
