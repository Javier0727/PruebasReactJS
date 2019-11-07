import React, { Component } from 'react'
import flecha from '../../resources/flecha_rojo.png'

export class ScrollLeft extends Component {
    componentDidMount() {
        // console.log(this.props.selector)
    }

    _scrollLeft = () => {
        let restante = document.querySelector(this.props.selector).scrollLeft;
        document.querySelector(this.props.selector).scrollTo({
            top: 0,
            left: restante - 300,
            behavior: 'smooth'
        })
    }
    render() {
        return (
            // <div>
                <img onClick={() => this._scrollLeft()} className='position-absolute flechaLeft' alt='MOREN' src={flecha} style={{ width: '2rem', height: '2rem', left: '0%', cursor: 'pointer', top: '50%', }}></img>
            // </div>
        )
    }
}

export default ScrollLeft