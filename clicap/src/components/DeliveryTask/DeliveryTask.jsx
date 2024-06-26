import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./deliveryTask.css";
import { Alert } from "react-bootstrap";
import { getDataUserByKey } from "../../helpers/helpers";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { MembersChips } from "./MembersChips";
import { JobContext } from "../../context/Job/JobContext";
import { alertError } from "../../helpers/alerts";
import { AreaContext } from "../../context/Area/AreaContext";
import { ModalitiesContext } from "../../context/Modalities/ModalitiesContext";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { Loader } from "../Loader/Loader";

const DeliveryTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const roleId = getDataUserByKey("roleId");

  const { jobState, getJobId, createNewJob, updateJobById } =
    useContext(JobContext);
  const { jobData, jobLoader } = jobState;

  const { areaState, getAllAreas } = useContext(AreaContext);
  const { areas, areasSelector } = areaState;

  const { modalitiesState, getAllModalities } = useContext(ModalitiesContext);

  const { modalities, modalitiesSelector } = modalitiesState;

  const [job, setJob] = useState(jobData);
  const [putDisabled, setPutDisabled] = useState(false);

  const [members, setMembers] = useState({
    items: [],
    value: "",
    error: null,
  });

  const handleChangeUpJob = (e, name) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;

    if (e.target.type === "file") {
      // Verificar si se seleccionó un archivo
      if (value) {
        const fileExtension = value.name.split(".").pop().toLowerCase();
        // Verificar si la extensión es .doc o .docx
        if (fileExtension !== "doc" && fileExtension !== "docx") {
          alertError("Solo se permiten archivos .doc y .docx", false);
          return;
        }
      }
    }

    if (e) {
      setJob({
        ...job,
        [e.target.name]: value,
      });
    } else {
      setJob({
        ...job,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let createOrUpdateResponse;

    if (job.name.length > 150) {
      return alertError("El nombre debe tener como máximo 150 caracteres.");
    }
    if (members.items.join(", ").length > 200) {
      return alertError("Coautores: Máximo 200 caracteres.", false);
    }

    if (id) {
      job.status = null;
      job.addEvaluators = false;
      if (typeof job.urlFile === "string") {
        job.urlFile = "";
      }
      createOrUpdateResponse = await updateJobById(job, id);
    } else {
      job.userId = getDataUserByKey("id");
      createOrUpdateResponse = await createNewJob(job);
    }

    if (createOrUpdateResponse.hasOwnProperty("data")) {
      [2, 3, 4].includes(roleId) ? navigate("/myjobs") : navigate("/jobs");
    }
  };

  const disabled = () => {
    return (
      !!!job.areaId ||
      /* !!!job.members || */
      !!!job.urlFile ||
      !!!job.name.trim() ||
      !!!job.jobModalityId
    );
  };

  useEffect(() => {
    if (id) {
      getJobId(id);
    }

    if (areas.length === 0) {
      getAllAreas();
    }

    if (modalities.length === 0) {
      getAllModalities();
    }
  }, []);

  useEffect(() => {
    setJob(jobData);
    if (jobData.members !== "") {
      setMembers({
        ...members,
        items: jobData.members,
      });
    }
  }, [jobData]);

  useEffect(() => {
    setJob({
      ...job,
      members: members.items.join(", "),
    });
  }, [members]);

  return (
    <div className="boxCard centerBox boxCard-delivery-task">
      <div className="poderver p-2">
        <h2 className="center-center">Cargar trabajo</h2>
        <div className="mt-4 centerUpdateJob">
          {roleId === 1 ? (
            <Alert key="warning" variant="warning">
              <i class="fa fa-exclamation-triangle m-2" aria-hidden="true"></i>
              Para <strong>editar</strong> un trabajo, es necesario cargar la
              última versión del mismo. En el{" "}
              <strong>Listado de Trabajos</strong>, puedes descargar la versión
              más reciente haciendo clic en 'Visualizar versiones'.
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="d-flex form-regis-responsive">
              {/* NOMBRE */}
              <div className="" style={{ width: "100%" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  * Título del trabajo
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Ingrese un nombre para el trabajo..."
                    className="form-control"
                    name="name"
                    value={job.name}
                    onChange={(e) => handleChangeUpJob(e, "name")}
                  />
                </div>
              </div>

              {/* AREA */}
              <div className="ms-2" style={{ width: "100%" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  * Area
                </label>
                <Select
                  options={areasSelector}
                  placeholder={"Seleccione..."}
                  name="areaId"
                  value={areasSelector.filter(
                    (area) => job.areaId === area.value
                  )}
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#3D84A8",
                    },
                  })}
                  onChange={(e) => handleChangeUpJob(e, "areaId")}
                />
              </div>

              {/* MODALIDAD */}
              <div className="ms-2" style={{ width: "100%" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  * Modalidad
                </label>
                <Select
                  options={modalitiesSelector}
                  placeholder={"Seleccione..."}
                  name="jobModalityId"
                  value={modalitiesSelector.filter(
                    (modality) => job.jobModalityId === modality.value
                  )}
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#3D84A8",
                    },
                  })}
                  onChange={(e) => handleChangeUpJob(e, "jobModalityId")}
                />
              </div>
            </div>

            <div className="mt-3 mb-2">
              <div
                className="d-flex flex-wrap gap-3"
                style={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "1rem",
                  boxShadow: "9px 9px 30px 1px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <i className="fa-2x fa-solid fa-circle-info"></i>
                </div>
                <div>
                  <h5>Cómo cargar los nombres</h5>
                  <p>
                    Para cargar los nombres de autores y coautores siguiendo el
                    formato indicado, se debe utilizar el{" "}
                    <strong>
                      apellido o apellidos seguido de la primera letra del
                      nombre, separados por un punto y un espacio
                    </strong>
                    . Aquí tienes un ejemplo de cómo cargarlo:
                  </p>
                  <ul>
                    <li>
                      <strong>Juan Pérez</strong> se cargaría como{" "}
                      <strong>Pérez J.</strong>
                    </li>
                    <li>
                      <strong>Nicolás Pérez Rodríguez</strong> se cargaría como{" "}
                      <strong>Pérez Rodríguez N.</strong>
                    </li>
                  </ul>
                  <p>
                    Para el caso de <strong>coautores</strong> se deben añadir
                    al listado presionando la tecla "enter" o "coma" por cada
                    uno que se cargue.
                  </p>
                </div>
              </div>
            </div>

            {/* Autor */}
            <div className="" style={{ width: "100%" }}>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                * Autor
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Ingrese el nombre del autor en el formato indicado..."
                  className="form-control"
                  name="author"
                  value={job.author}
                  onChange={(e) => handleChangeUpJob(e, "author")}
                />
              </div>
            </div>

            {/* Miembros */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold pe-3"
              >
                Coautores del trabajo (opcional)
              </label>
              <MembersChips
                membersToSend={members}
                setMembersToSend={setMembers}
              />
            </div>
            {/* Archivo */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                * Trabajo
              </label>
              <Alert key="info" variant="info">
                <i class="fa fa-circle-info m-2" aria-hidden="true"></i>
                Solo se permiten archivos con formato <strong>.doc / .docx</strong>
              </Alert>
              <div className="">
                <input
                  type="file"
                  placeholder="Seleccione...."
                  className="form-control"
                  name="urlFile"
                  onChange={(e) => handleChangeUpJob(e, "urlFile")}
                />
              </div>
            </div>

            {!jobLoader ? (
              <ClicapTooltip
                tooltip={putDisabled ? putDisabled : disabled()}
                text={"Por favor completar los campos obligatorios"}
              >
                <div className="mt-3 center-center">
                  <button
                    disabled={putDisabled ? putDisabled : disabled()}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Subir trabajo
                  </button>
                </div>
              </ClicapTooltip>
            ) : (
              <div className="center-center">
                <Loader />
              </div>
            )}

            <div className="mt-3 d-flex align-items-center">
              <p className="m-0">"</p>
              <p className="m-0 fw-bold fs-4">*</p>
              <p className="m-0">": Campos obligatorios</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DeliveryTask;
