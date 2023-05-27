import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { waitAndRefresh } from "../../helpers/helpers";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import ModalDelete from "../Modals/ModalDelete";
import { AreaRow } from "./AreaRow";
import "./configuration.css";
import { LogoConfig } from "./LogoConfig/LogoConfig";
import { AreaContext } from "../../context/Area/AreaContext";
import { useNavigate } from "react-router-dom";

export const Configuration = () => {
  const navigate=useNavigate();
  const { getAllAreas, createNewArea, areaState } = useContext(AreaContext);
  const { areas } = areaState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(false);
  const [area, setArea] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewArea(area);
    waitAndRefresh("/configuration", 500);
  };

  const handleChangeArea = (e) => {
    setArea({
      ...area,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (areas.length === 0) {
      getAllAreas();
    }
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
        <button className="btn btn-primary" onClick={()=>navigate('/importantdate-config')}>configurar fechas</button>
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
                      <Button type="submit" variant="success">
                        Crear Novedad
                      </Button>
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
                      {areas.length > 0 &&
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
