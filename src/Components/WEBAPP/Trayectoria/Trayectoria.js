import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import logoDS from "../../../resources/Página Web/iconos/logoblanco.png";
import danielPerfil from "../../../resources/perfildaniel.png";
import nombreDS from "../../../resources/nombreDS.png";
import logoRojo from "../../../resources/logorojo.png";
import $ from "jquery";
import Footer from "../Footer/Footer";

export default class Trayectoria extends Component {
  state = {
    trayData: {}
  }

  componentDidMount = () => {
    fetch(`http://laravel.danielserrano.com.mx/public/api/trayectoria`)
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON.trayectoria);
        this.setState({ trayData: responseJSON.trayectoria })
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state.trayData.length)
    return (
      <div>
        <Navbar active={true}></Navbar>
        <div className="cont-vid bg_perfilDaniel topnv">
          <div
            className="w-100 h-100"
            style={{ position: "absolute", backgroundColor: "#9417259e" }}
          >
            <div className="ds_logo_trayectoria">
              <img className="w-100 h-100 img-contain" src={logoDS}></img>
            </div>
          </div>
        </div>
        <div className="row mx-0 my-5">
          <div className="col-md-6 px-5 mb-5 scroll_customy" style={{ textAlign: "justify", maxHeight: '26rem', overflow: 'auto', minHeight: '25rem' }}>
            <div className="row">
              <div className="col-12 morena_red">
                <img alt="Daniel Serrano" className="w-75 p-3" src={nombreDS} ></img>
              </div>
            </div>
            {/*  */}

            {this.state.trayData.length !== undefined ? (
              this.state.trayData.map((trayectoria) =>
                <div key={trayectoria.id} className="row">
                  <div className="col-2 morena_red"> {trayectoria.year_ini}-{trayectoria.year_fin} </div>
                  <div className="col-10">
                    {trayectoria.descripcion}
                  </div>
                </div>
              )
            ) : (null)
            }

            {/* <div className="row">
              <div className="col-2 morena_red">2005-2006</div>
              <div className="col-10">
                Responsable político de la campaña a la Presidencia de la
                República de Andrés Manuel López Obrador en el Distrito XV
                Federal.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2008</div>
              <div className="col-10">
                Subsecretario para el Estado de Bienestar del Gabinete del
                Gobierno Legítimo en México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2010-2011</div>
              <div className="col-10">
                Responsable político de la campaña a gobernador de Alejandro
                Encinas en el Distrito XII Federal.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2011-2013</div>
              <div className="col-10">
                Responsable de la Asamblea Constitutiva de morena en el Estado
                de México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012</div>
              <div className="col-10">
                Integrante del Equipo Nacional de Capacitación Electoral.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012-2015</div>
              <div className="col-10">
                Miembro del Consejo Estatal de morena.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012-2015</div>
              <div className="col-10">
                Secretario de Organización del Comité Ejecutivo Estatal
                (2012-2015), de morena en el Estado de México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012-2015</div>
              <div className="col-10">
                Miembro del Consejo Nacional de morena.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2014-2016</div>
              <div className="col-10">
                Representante de morena ante el Instituto Electoral del Estado
                de México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2005-2006</div>
              <div className="col-10">
                Responsable político de la campaña a la Presidencia de la
                República de Andrés Manuel López Obrador en el Distrito XV
                Federal.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2008</div>
              <div className="col-10">
                Subsecretario para el Estado de Bienestar del Gabinete del
                Gobierno Legítimo en México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2010-2011</div>
              <div className="col-10">
                Responsable político de la campaña a gobernador de Alejandro
                Encinas en el Distrito XII Federal.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2011-2013</div>
              <div className="col-10">
                Responsable de la Asamblea Constitutiva de morena en el Estado
                de México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012</div>
              <div className="col-10">
                Integrante del Equipo Nacional de Capacitación Electoral.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012-2015</div>
              <div className="col-10">
                Miembro del Consejo Estatal de morena.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012-2015</div>
              <div className="col-10">
                Secretario de Organización del Comité Ejecutivo Estatal
                (2012-2015), de morena en el Estado de México.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2012-2015</div>
              <div className="col-10">
                Miembro del Consejo Nacional de morena.
              </div>
            </div>
            <div className="row">
              <div className="col-2 morena_red">2014-2016</div>
              <div className="col-10">
                Representante de morena ante el Instituto Electoral del Estado
                de México.
              </div>
            </div> */}
            {/* 27 */}
          </div>
          <div className="col-md-6 bg_trayectoriaDS"></div>
        </div>

        <div className="my-5 px-5">
          <div className="row mx-0 mb-4">
            <div className="col-12 px-0">
              <h2 className="morena_red">GALERIA</h2>
            </div>
          </div>
          <div className="row mx-0">
            <div
              className="col-md-9 col-12 bg-danger cursor_pointer"
              style={{ height: "20rem" }}
            >
              {/* a */}
            </div>
            <div
              className="col-md-3 col-12 px-0 px-md-3 mt-2 mt-md-0"
              style={{ height: "20rem" }}
            >
              <div className="row mx-0 h-50 pb-1">
                <div className="col-12 bg-info cursor_pointer">{/* aa */}</div>
              </div>
              <div className="row mx-0 h-50 pt-1">
                <div className="col-12 bg-success cursor_pointer">
                  {/* bb */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
