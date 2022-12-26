import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { EntitiesContext } from "../../context/EntitiesContext";
import { waitAndRefresh } from "../../helpers/helpers";
import { Tabs, Tab, Form } from "react-bootstrap";
import ModalDelete from "../Modals/ModalDelete";
import { AreaRow } from "./AreaRow";
import "./configuration.css";
import { LogoConfig } from "./LogoConfig/LogoConfig";

export const Configuration = () => {
  const { getAllAreas, areas, createNewArea, area, handleChangeArea } =
    useContext(EntitiesContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewArea();
    waitAndRefresh("/configuration", 500);
  };

  useEffect(() => {
    getAllAreas();
  }, []);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={areaToDelete} showAlert={setShowDeleteModal} />
      ) : null}

      <div className="section-header">
        <h2>Configuración</h2>
        <p>
          En esta sección se pueden realizar las configuraciones de cada evento
        </p>
      </div>
      <Tabs
        defaultActiveKey="logo"
        id="uncontrolled-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="logo" title="Logo / Fondo del certificado">
          <LogoConfig />
        </Tab>
        <Tab eventKey="areas" title="Áreas">
          <section id="speakers" className="wow fadeInUp">
            <div className="container">
              <div className="center-center">
                <div className="widthConfig boxCard">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <Form.Label>Nombre del área</Form.Label>
                      <input
                        type="text"
                        placeholder="Nombre del área..."
                        className="form-control"
                        name="name"
                        value={area.name}
                        onChange={handleChangeArea}
                      />
                    </div>
                    <div className="mb-3 text-end">
                      <button type="submit" className="buttonAddNew">
                        Crear Area
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="center-center">
                <div className="mt-3 overflow-x widthConfig">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Area</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {areas.length &&
                        areas.map((area, i) => (
                          <AreaRow
                            area={area}
                            key={area.id}
                            showAlert={setShowDeleteModal}
                            setAreaToDelete={setAreaToDelete}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </Tab>
      </Tabs>
    </>
  );
};
