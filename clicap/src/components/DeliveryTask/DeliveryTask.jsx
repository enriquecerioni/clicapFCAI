import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./deliveryTask.css";
import { Button } from "react-bootstrap";
import { formDataAxios, getDataUserByKey } from "../../helpers/helpers";
import { EntitiesContext } from "../../context/EntitiesContext";
import { useNavigate, useParams } from "react-router-dom";
import { MembersChips } from "./MembersChips";
import { JobContext } from "../../context/Job/JobContext";
import { alertError } from "../../helpers/alerts";

const DeliveryTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobData, getJobId } = useContext(JobContext);
  const { areas, getAllAreas, modalities, getAllModalities } =
    useContext(EntitiesContext);

  const [job, setJob] = useState(jobData);
  const [putDisabled, setPutDisabled] = useState(false);
  const [members, setMembers] = useState({
    items: [],
    value: "",
    error: null,
  });
  const handleChangeUpJob = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    if (e.target.name === "areaId") {
      value = Number(value);
    }
    setJob({
      ...job,
      [e.target.name]: value,
    });
  };

  const createNewJob = async () => {
    try {
      const bodyFormData = new FormData();
      for (const key in job) {
        bodyFormData.append(key, job[key]);
      }
      console.log(bodyFormData);
      await formDataAxios("POST", `/job/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
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
    await createNewJob();
    navigate("/myjobs");
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
    getAllAreas();
    getAllModalities();
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
    <>
      <div className="poderver flex-column p-2">
        <h2 className="center-center">Cargar trabajo</h2>
        <div className="mt-4 centerUpdateJob">
          <form onSubmit={handleSubmit}>
            <div className="d-flex form-regis-responsive">
              {/* NOMBRE */}
              <div className="">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Título del trabajo
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control"
                    name="name"
                    value={job.name}
                    onChange={handleChangeUpJob}
                  />
                </div>
              </div>

              {/* AREA */}
              <div className="ms-2">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Area
                </label>
                <div className="">
                  <select
                    className="form-select"
                    name="areaId"
                    value={job.areaId}
                    onChange={handleChangeUpJob}
                  >
                    <option value={""}>Seleccione</option>
                    {areas.length > 0
                      ? areas.map((area) => (
                          <option key={area.id} value={area.id}>
                            {area.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>

              {/* MODALIDAD */}
              <div className="ms-2">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Modalidad
                </label>
                <div className="">
                  <select
                    className="form-select"
                    name="jobModalityId"
                    value={job.jobModalityId}
                    onChange={handleChangeUpJob}
                  >
                    <option value={""}>Seleccione</option>
                    {modalities.length > 0
                      ? modalities.map((modality) => (
                          <option key={modality.id} value={modality.id}>
                            {modality.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
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
              {/*               <div className="">
                <input
                  type="text"
                  placeholder="Ivan castro;Enrique Cerioni;"
                  className="form-control"
                  name="members"
                  value={job.members}
                  onChange={handleChangeUpJob}
                />
              </div> */}
            </div>
            {/* Archivo */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Trabajo
              </label>
              <div className="">
                <input
                  type="file"
                  placeholder="Seleccione..."
                  className="form-control"
                  name="urlFile"
                  onChange={handleChangeUpJob}
                />
              </div>
            </div>
            <div className="mt-3 center-center">
              <Button
                disabled={putDisabled ? putDisabled : disabled()}
                type="submit"
                variant="primary"
              >
                Subir trabajo
              </Button>
            </div>
          </form>
          {/*           <Button onClick={() => console.log(job)} variant="primary">
            console
          </Button> */}
        </div>
      </div>
    </>
  );
};
export default DeliveryTask;
