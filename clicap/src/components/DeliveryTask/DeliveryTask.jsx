import React from "react";
import { useState } from "react";
import "./deliveryTask.css";
import { Button } from "react-bootstrap";
import { getDataUserByKey } from "../../helpers/helpers";

const DeliveryTask = () => {
  const areasDemo = [
    { id: 1, name: "Ing. quimica" },
    { id: 2, name: "Contabilidad" },
    { id: 3, name: "Administracion" },
  ];
  const userId = getDataUserByKey('id');
  const initialDataTask = {
    name: "",
    areaId: "",
    authorId: userId,
    members: "",
    urlFile: "",
    evaluatorId1: "",
    evaluatorId2: "",
  };

  const [dataTask, setDataTask] = useState(initialDataTask);
  const handleSubmit = () => {
    console.log(dataTask);
  };
  const handleDataTask = (e) => {
    /*  e.preventDefault(); */
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    setDataTask({
      ...dataTask,
      [e.target.name]: value,
    });
  };
  return (
    <>
      <div className="poderver center-center flex-column">
        <h2>Entregar trabajo</h2>
        <div className="mt-4">
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
                    value={dataTask.name}
                    onChange={handleDataTask}
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
                    value={dataTask.areaId}
                    onChange={handleDataTask}
                  >
                    <option value={""}>Seleccione</option>
                    {areasDemo.map((areasDemo) => (
                      <option key={areasDemo.id} value={areasDemo.id}>
                        {areasDemo.name}
                      </option>
                    ))}
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
                  value={dataTask.members}
                  onChange={handleDataTask}
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
                  onChange={handleDataTask}
                />
              </div>
            </div>
            <div className="mt-3 center-center">
              <Button type="submit" variant="primary">
                Subir trabajo
              </Button>
            </div>
          </form>
          <Button onClick={() => console.log(dataTask)} variant="primary">
            console
          </Button>
        </div>
      </div>
    </>
  );
};
export default DeliveryTask;
