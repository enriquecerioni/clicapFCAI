import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./deliveryTask.css";
import { Button } from "react-bootstrap";
import { getDataUserByKey } from "../../helpers/helpers";
import { EntitiesContext } from "../../context/EntitiesContext";

const DeliveryTask = () => {
  const { job, handleChangeUpJob, createNewJob } = useContext(EntitiesContext);
  const { areas, getAllAreas } = useContext(EntitiesContext);

  console.log(job);
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewJob();
  };

  useEffect(() => {
    getAllAreas();
  }, []);
  return (
    <>
      <div className="poderver  flex-column">
        <h2>Entregar trabajo</h2>
        <div className="mt-4 centerUpdateJob">
          <form onSubmit={handleSubmit}>
            <div className="d-flex form-regis-responsive">
              {/* NOMBRE */}
              <div className="">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Nombre del trabajo
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
            </div>
            {/* Miembros */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Miembros del grupo
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Ivan castro;Enrique Cerioni;"
                  className="form-control"
                  name="members"
                  value={job.members}
                  onChange={handleChangeUpJob}
                />
              </div>
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
              <Button type="submit" variant="primary">
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
