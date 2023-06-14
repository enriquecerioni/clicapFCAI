import React, { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../context/Area/AreaContext";
import { Button, Form } from "react-bootstrap";
import { AreaRow } from "./AreaRow";
import { waitAndRefresh } from "../../helpers/helpers";
import ModalDelete from "../Modals/ModalDelete";

export const Areas = () => {
  const { getAllAreas, createNewArea, areaState } = useContext(AreaContext);
  const { areas } = areaState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(false);

  const [area, setArea] = useState({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewArea(area);
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
    <section id="speakers" className="wow fadeInUp">
      <div className="section-header">
        <h2>Áreas</h2>
      </div>

      {showDeleteModal ? (
        <ModalDelete entity={areaToDelete} showAlert={setShowDeleteModal} />
      ) : null}

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
                  Crear Área
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
                  <th>Área</th>
                  <th></th>
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
  );
};
