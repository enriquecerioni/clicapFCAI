import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./deliveryTask.css";
import { Button } from "react-bootstrap";
import { formDataAxios, getDataUserByKey } from "../../helpers/helpers";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { MembersChips } from "./MembersChips";
import { JobContext } from "../../context/Job/JobContext";
import { alertError } from "../../helpers/alerts";
import { AreaContext } from "../../context/Area/AreaContext";
import { ModalitiesContext } from "../../context/Modalities/ModalitiesContext";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";

const DeliveryTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const roleId = getDataUserByKey("roleId");

  const { jobState, getJobId, createNewJob, updateJobById } =
    useContext(JobContext);
  const { jobData } = jobState;

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
    if (job.name.length > 150) {
      return alertError("El nombre debe tener como máximo 150 caracteres.");
    }
    if (job.members.length > 200) {
      return alertError("Autor/Autores: Máximo 200 caracteres.");
    }

    if (id) {
      job.status = null;
      job.addEvaluators = false;
      if (typeof job.urlFile === "string") {
        job.urlFile = "";
      }
      await updateJobById(job, id);
    } else {
      await createNewJob(job);
    }
    /* roleId === 4 ? navigate("/myjobs") : navigate("/jobs"); */
  };

  const checkFields = () => {
    if (
      job.areaId !== "" ||
      job.members !== "" ||
      job.urlFile !== "" ||
      job.name !== "" ||
      job.jobModalityId !== ""
    ) {
      setPutDisabled(false);
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
                    placeholder="Nombre"
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
                  placeholder={"seleccione.."}
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
                  placeholder={"seleccione.."}
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
            {/* Miembros */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold pe-3"
              >
                Autor/es del trabajo
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
              <div className="">
                <input
                  type="file"
                  placeholder="Seleccione..."
                  className="form-control"
                  name="urlFile"
                  onChange={(e) => handleChangeUpJob(e, "urlFile")}
                />
              </div>
            </div>
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
            <div className="mt-3 d-flex align-items-center">
              <p className="m-0">"</p>
              <p className="m-0 fw-bold fs-4">*</p>
              <p className="m-0">": Campos obligatorios</p>
            </div>
          </form>
          {/*           <Button onClick={() => console.log(job)} variant="primary">
            console
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default DeliveryTask;
