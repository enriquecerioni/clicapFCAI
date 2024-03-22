import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { getDataUserByKey } from "../../helpers/helpers";
import "./welcome.css";
import { AreaContext } from "../../context/Area/AreaContext";
import { Loader } from "../Loader/Loader";
import { JobContext } from "../../context/Job/JobContext";
import { ModalitiesCard } from "./ModalitiesCard/ModalitiesCard";
import { PayContext } from "../../context/Pay/PayContext";
import { AppContext } from "../../context/App/AppContext";
import { ModalitiesContext } from "../../context/Modalities/ModalitiesContext";

const Welcome = () => {
  const navigate = useNavigate();
  const userId = getDataUserByKey("id");
  const roleId = getDataUserByKey("roleId");
  const name = getDataUserByKey("name");

  const { appState, setRefreshRoleIdAndUserId } = useContext(AppContext);
  const { refreshRoleIdAndUserId } = appState;

  const { jobState, setJobFilters, setRefreshUserIdToJob, getJobByAuthorId } =
    useContext(JobContext);
  const { jobsFilter, jobs } = jobState;
  const jobsFiltersEmpty = {
    authorId: "",
    name: "",
    areaId: "",
    jobModalityId: "",
    status: "",
    evaluatorId: "",
  };

  const { setUserIdToPays, getPayByAuthorId } = useContext(PayContext);

  const { getNumberOfJobs, areaState, getAllAreas } = useContext(AreaContext);
  const { areas } = areaState;

  const [amountJobsAndSum, setAmountJobsAndSum] = useState([]);

  const { getAllCertificatesByUser, ceritificateState } =
    useContext(CertificateContext);
  const { userCertificates } = ceritificateState;

  const { getAllModalities, modalitiesState } = useContext(ModalitiesContext);
  const { modalities } = modalitiesState;

  const [filters, setFilters] = useState(jobsFilter);
  const [goToJobFiltered, setGoToJobFiltered] = useState(false);
  const [authorJob, setAuthorJob] = useState([]);
  const [authorPay, setAuthorPay] = useState([]);

  const goAndFiltered = (numArea, numModality) => {
    setGoToJobFiltered(!goToJobFiltered);
    setFilters({
      ...filters,
      ["areaId"]: numArea,
      ["jobModalityId"]: numModality,
    });
  };

  const getAndSetNumberOfJobs = async () => {
    const numbersOfJobs = await getNumberOfJobs();
    setAmountJobsAndSum(numbersOfJobs);
  };

  const getAmountByJobComplete = (areaId) => {
    if (amountJobsAndSum.completeWorks) {
      return amountJobsAndSum.completeWorks.find((item) => item.id === areaId)
        .amount;
    }
  };
  const getAmountByJobSummaries = (areaId) => {
    if (amountJobsAndSum.summaries) {
      return amountJobsAndSum.summaries.find((item) => item.id === areaId)
        .amount;
    }
  };
  const completeJobsTotal = () => {
    let completes = 0,
      summariesTotal = 0;
    if (Object.keys(amountJobsAndSum).length > 0) {
      const { completeWorks, summaries } = amountJobsAndSum;
      if (completeWorks.length > 0) {
        completeWorks.forEach((el) => {
          completes = el.amount + completes;
        });
      }
      if (summaries.length > 0) {
        summaries.forEach((el) => {
          summariesTotal = el.amount + summariesTotal;
        });
      }
    }
    return { completes, summariesTotal };
  };

  const roleNames = {
    1: "Admin",
    2: "Evaluador",
    3: "Docente/Investigador",
    4: "Estudiante",
  };
  const getRoleName = () => (roleId ? roleNames[roleId] : "");

  const getAuthorPayandJob = async () => {
    const authorPayFound = await getPayByAuthorId(userId);
    const authorJobfound = await getJobByAuthorId(userId);
    setAuthorPay(authorPayFound);
    setAuthorJob(authorJobfound);
  };

  useEffect(() => {
    if (refreshRoleIdAndUserId) {
      setRefreshUserIdToJob();
      setUserIdToPays();
      setRefreshRoleIdAndUserId(false);
      //clean filters
      setJobFilters(jobsFiltersEmpty);
    }

    if (areas.length === 0) {
      getAllAreas();
      getAllModalities();
    }
    if (roleId !== 1) {
      getAllCertificatesByUser(userId);
    }
    getAndSetNumberOfJobs();
    getAuthorPayandJob();
  }, []);

  useEffect(() => {
    if (goToJobFiltered) {
      setJobFilters(filters);
      navigate("/jobs");
    }
  }, [filters]);

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <h1 className="center-center title-top">Bienvenido {name} </h1>
        </div>

        <div className="row roleTitle mb-3">
          <div className="info-role">
            Rol de Usuario: <strong>{getRoleName()}</strong>
          </div>
        </div>

        {roleId === 1 ? (
          <div>
            <div className="row">
              <div className="col">
                <div className="text-center border dashboard-card">
                  <h2 className="">Trabajos de investigación</h2>
                  <div className="center-center">
                    <hr
                      style={{ border: "1px solid grey", width: "100px" }}
                    ></hr>
                  </div>
                  <div className="flexColumn">
                    {areas.length > 0 ? (
                      areas.map((area) => {
                        return (
                          <button
                            type="button"
                            className="btnAreas"
                            onClick={() => goAndFiltered(area.id, 1)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="m-0 title-modality-welcome">
                                {area.name}
                              </p>
                              <div
                                className="amount-worksbymodality-box center-center"
                                style={{
                                  backgroundColor: "#B0DAFF",
                                  border: "1px solid #19A7CE",
                                }}
                              >
                                <p className="m-0 ">{`${getAmountByJobComplete(
                                  area.id
                                )}`}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <Loader />
                    )}
                  </div>
                  <button
                    type="button"
                    className="btnViewAll"
                    onClick={() => goAndFiltered("", 1)}
                  >
                    {`Ver todos (${completeJobsTotal().completes})`}
                  </button>
                </div>
              </div>
              <div className="col">
                <div className=" text-center border dashboard-card">
                  <h2 className="">Prácticas áulicas o de laboratorios</h2>
                  <div className="center-center">
                    <hr
                      style={{ border: "1px solid grey", width: "100px" }}
                    ></hr>
                  </div>
                  <div className="flexColumn">
                    {areas.length > 0 ? (
                      areas.map((area) => {
                        return (
                          <button
                            type="button"
                            className="btnAreas"
                            onClick={() => goAndFiltered(area.id, 2)}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="m-0 title-modality-welcome">
                                {area.name}
                              </p>
                              <div
                                className="amount-worksbymodality-box center-center"
                                style={{
                                  backgroundColor: "#B0DAFF",
                                  border: "1px solid #19A7CE",
                                }}
                              >
                                <p className="m-0 ">{`${getAmountByJobSummaries(
                                  area.id
                                )}`}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <Loader />
                    )}
                  </div>
                  <button
                    type="button"
                    className="btnViewAll"
                    onClick={() => goAndFiltered("", 2)}
                  >
                    {`Ver todos (${completeJobsTotal().summariesTotal})`}
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-3">
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
            <div className="row">
              <div className="col border dashboard-card flex flexCard">
                <div className="col mb-3 flex">
                  {authorJob.length ? (
                    <div
                      className="alert alert-success alertWidth flexAlert"
                      role="alert"
                    >
                      <p>
                        {roleId === 2
                          ? "Tienes un trabajo asignado "
                          : "Ya has subido un trabajo "}
                        <i className="fas fa-info-circle"></i>
                      </p>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          navigate(roleId === 2 ? "/jobs" : "/myjobs")
                        }
                      >
                        {roleId === 2
                          ? "Ver trabajos asignados"
                          : "Mis trabajos"}
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

                  {/* {authorPay.length ? (
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
                  )} */}

                  <div
                    className="alert alert-info alertWidth flexAlert"
                    role="alert"
                  >
                    <p>
                      {userCertificates.length > 0
                        ? "Ya tienes un certificado "
                        : "No tienes ningun certificado otorgado aún "}
                      <i className="fas fa-info-circle"></i>
                    </p>
                    <button
                      className="btn btn-info"
                      onClick={() => navigate("/mycertificates")}
                      disabled={userCertificates.length > 0 ? false : true}
                    >
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
                        En esta sección podrás cargar trabajos en el sistema para que sean corregidos por evaluadores
                        (Prácticas áulicas o de laboratorios / Trabajos de Investigación).
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

                {/* <div className="cardBodyHome">
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
                </div> */}

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
