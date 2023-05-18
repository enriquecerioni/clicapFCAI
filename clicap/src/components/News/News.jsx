import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getDataUserByKey, waitAndRefresh } from "../../helpers/helpers";
import ModalDelete from "../Modals/ModalDelete";
import { CardNew } from "./CardNew";
import "./news.css";
import { NewsContext } from "../../context/News/NewsContext";

export const News = () => {
  const { newsState, getAllNews, createNewNew } = useContext(NewsContext);
  const { newInitial, news } = newsState;

  const role = getDataUserByKey("roleId");
  const [newToCreate, setNewToCreate] = useState(newInitial);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [NewToDelete, setNewToDelete] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewNew(newToCreate);
    waitAndRefresh("/news", 500);
  };

  const handleChangeNew = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;

    setNewToCreate({
      ...newToCreate,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <section id="speakers" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Novedades</h2>
          <p>Últimas publicaciones acerca del congreso</p>
        </div>
        {role === 1 && (
          <div className="boxAddNews boxCard">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Título"
                  className="form-control"
                  name="title"
                  value={newToCreate.title}
                  onChange={handleChangeNew}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Contenido de la novedad"
                  className="form-control"
                  name="content"
                  value={newToCreate.content}
                  onChange={handleChangeNew}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  name="urlFile"
                  onChange={handleChangeNew}
                />
              </div>
              <div className="buttonAddNewPositon">
                <Button type="submit" variant="success">
                  Crear Novedad
                </Button>
              </div>
              {/* <div className="mb-3 text-center">
                <button type="submit" className="buttonAddNew">
                  Crear Novedad
                </button>
              </div> */}
            </form>
            {/* <input type="date" className="form-date-input" onChange={handleTime} /> */}
          </div>
        )}
        <div>
          {showDeleteModal ? (
            <ModalDelete entity={NewToDelete} showAlert={setShowDeleteModal} />
          ) : null}
          {news.length > 0 ? (
            news.map((item) => (
              <div className="flexNews">
                <CardNew
                  news={item}
                  showAlert={setShowDeleteModal}
                  setNewToDelete={setNewToDelete}
                  key={item.id}
                  role={role}
                />
              </div>
            ))
          ) : (
            <div className="flexNews">No existen novedades creadas aún</div>
          )}
        </div>
      </div>
    </section>
  );
};
