import React, { Component } from "react";

class DetalleD extends Component {
    componentDidMount = () => {
      console.log(this.props.match.params.id)
    };
    
  render() {
    return <div> Detalle Distritos </div>;
  }
}

export default DetalleD;
