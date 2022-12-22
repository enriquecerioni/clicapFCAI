import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import imgCertificate from "../../assets/certificate/certificate.jpg";
import { EntitiesContext } from "../../context/EntitiesContext";
import { getDataUserByKey } from "../../helpers/helpers";
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const { allJobs, myPays, getAllAreas, areas } = useContext(EntitiesContext);

  const roleId = getDataUserByKey("roleId");
  const name = getDataUserByKey("name");

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  useEffect(() => {
    getAllAreas();
  }, [])

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <h1 className="center-center title-top">Bienvenido {name} </h1>
        </div>

        {roleId === 1 ? (
          <div>
            <div className="row roleTitle">
              <div className="alert alert-info rolAlert" role="alert">
                Rol de Usuario: <strong>Admin</strong>
              </div>
            </div>
            <div className="row">
              <div className="col text-center border dashboard-card">
                <h2 className="mb-5">Trabajos Completos</h2>
                <div className="flexColumn">
                  {
                    areas.map(area => {
                      return (<button type="button" className="btnAreas">
                        {area.name}
                      </button>)
                    })
                  }
                </div>
                <button type="button" className="btnViewAll">
                  Ver todos ()
                </button>
              </div>
              <div className="col text-center border dashboard-card">
                <h2 className="mb-5">Resúmenes</h2>
                <div className="flexColumn">
                  {
                    areas.map(area => {
                      return (<button type="button" className="btnAreas">
                        {area.name}
                      </button>)
                    })
                  }
                </div>
                <button type="button" className="btnViewAll">
                  Ver todos ()
                </button>
              </div>
            </div>
            <div className="row">
              <h2 className="text-center">Información del Sistema</h2>
              <div className="col border dashboard-card flex flexCard">
                <div className="cardBodyHome">
                  <h5 className="card-title">
                    {" "}
                    <i className="fa fa-users"></i> Listado de Usuarios
                  </h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección se podrá visualizar el listado de
                        usuarios registrados en el sistema.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Filtrado por Nombre / DNI y por "Rol" de usuario.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">Editar o Eliminar usuarios.</p>
                    </li>
                  </ul>
                </div>

                <div className="cardBodyHome">
                  <h5 className="card-title">
                    <i className="fa fa-file-text" aria-hidden="true"></i>{" "}
                    Listado de Trabajos
                  </h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección se podrá visualizar el listado de
                        trabajos completos y resúmenes en el sistema.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Filtrado por título, autor, área, modalidad, evaluador y
                        estado del trabajo.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Asignación de evaluadores a un trabajo.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Corrección de evaluaciones hechas por Docentes /
                        Investigadores.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="cardBodyHome">
                  <h5 className="card-title">
                    <i className="fa fa-credit-card" aria-hidden="true"></i>{" "}
                    Listado de Pagos
                  </h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección se podrá visualizar el listado de los
                        pagos cargados por los usuarios del sistema.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Descargar comprobante de pago emitido por el usuario.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Subir factura correspondiente al pago emitido por el
                        usuario.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="cardBodyHome">
                  <h5 className="card-title">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>{" "}
                    Listado de Constancias AR
                  </h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección se podrá visualizar el listado de las
                        constancias de alumno regular cargadas por los usuarios
                        del sistema.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Descargar constancia de alumno regular (pdf).
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="row roleTitle">
              {roleId === 2 ? (
                <div className="alert alert-info" role="alert">
                  Rol de Usuario: <strong>Admin</strong>
                </div>
              ) : roleId === 3 ? (
                <div className="alert alert-info" role="alert">
                  Rol de Usuario: <strong>Docente/Investigador</strong>
                </div>
              ) : (
                <div className="alert alert-info" role="alert">
                  Rol de Usuario: <strong>Alumno</strong>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col border dashboard-card flex flexCard">
                <div className="col mb-3 flex">
                  {allJobs.length > 0 ? (
                    <div
                      className="alert alert-success alertWidth flexAlert"
                      role="alert"
                    >
                      <p>
                        Ya has subido un trabajo{" "}
                        <i className="fas fa-info-circle"></i>
                      </p>
                      <button
                        className="btn btn-success"
                        onClick={() => navigate("/myjobs")}
                      >
                        Mis trabajos
                      </button>
                    </div>
                  ) : (
                    <div
                      className="alert alert-danger alertWidth flexAlert"
                      role="alert"
                    >
                      <p>
                        No has subido un trabajo aún{" "}
                        <i className="fas fa-info-circle"></i>
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/newjob")}
                      >
                        Subir Trabajo
                      </button>
                    </div>
                  )}

                  {myPays.length > 0 ? (
                    <div
                      className="alert alert-success alertWidth flexAlert"
                      role="alert"
                    >
                      <p>
                        Ya has cargado tu comprobante de pago{" "}
                        <i className="fas fa-info-circle"></i>
                      </p>
                      <button
                        className="btn btn-success"
                        onClick={() => navigate("/mypays")}
                      >
                        Mis pagos
                      </button>
                    </div>
                  ) : (
                    <div
                      className="alert alert-danger alertWidth flexAlert"
                      role="alert"
                    >
                      <p>
                        No has subido un comprobante de pago{" "}
                        <i className="fas fa-info-circle"></i>
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/newpay")}
                      >
                        Subir Comprobante
                      </button>
                    </div>
                  )}

                  <div
                    className="alert alert-info alertWidth flexAlert"
                    role="alert"
                  >
                    <p>
                      No tienes ningun certificado otorgado aún{" "}
                      <i className="fas fa-info-circle"></i>
                    </p>
                    <button className="btn btn-info" disabled={true}>
                      Descargar Certificados
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <h2 className="text-center">Información del Sistema</h2>
              <div className="col border dashboard-card flex flexCard">
                <div className="cardBodyHome">
                  <h5 className="card-title">Mis Trabajos</h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección podrás cargar trabajos en el sistema
                        (Trabajos Completos / Resúmenes).
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Una vez notificado que hayas sido por mail, podrás
                        realizar las correciones sugeridas por los evaluadores
                        asignados a tu trabajo.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="cardBodyHome">
                  <h5 className="card-title">Mis Pagos</h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección podrás cargar tus comprobantes de pagos
                        realizados, y también descargar la factura
                        correspondiente a los mismos.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">Carga de comprobantes en pdf.</p>
                    </li>
                    <li>
                      <p className="card-text">Descarga de facturas.</p>
                    </li>
                  </ul>
                </div>

                <div className="cardBodyHome">
                  <h5 className="card-title">Constancia de Alumno Regular</h5>
                  <ul>
                    <li>
                      <p className="card-text">
                        En esta sección se podrá visualizar el listado de los
                        pagos cargados por los usuarios del sistema.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Descargar comprobante de pago emitido por el usuario.
                      </p>
                    </li>
                    <li>
                      <p className="card-text">
                        Subir factura correspondiente al pago emitido por el
                        usuario.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <button onClick={() => donwloadCertificate()}>certificado</button> */}
    </>
  );
};
export default Welcome;
