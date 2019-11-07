import React, { Component } from 'react'
import flecha from '../../resources/flecha_rojo.png'

export class ScrollRight extends Component {
    componentDidMount() {
        // console.log(this.props.selector)
    }

    _scrollRight = () => {
        let restante = document.querySelector(this.props.selector).scrollLeft;
        document.querySelector(this.props.selector).scrollTo({
            top: 0,
            left: restante + 300,
            behavior: 'smooth'
        })
    }
    render() {
        return (
            // <div>
                <img onClick={() => this._scrollRight()} className='position-absolute flechaRight' alt='MOREN' src={flecha} style={{ width: '2rem', height: '2rem', right: '0%', cursor: 'pointer', top: '50%', }}></img>
            // </div>
        )
    }
}

export default ScrollRight
