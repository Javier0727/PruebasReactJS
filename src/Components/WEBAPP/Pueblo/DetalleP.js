import React, { Component } from 'react';

class DetalleP extends Component {
    componentDidMount = () => {
      console.log(this.props.match.params.id)
    };
    
  render() {
    return (
      <div> Detalle Pueblo </div>
    );
  }
}

export default DetalleP;
