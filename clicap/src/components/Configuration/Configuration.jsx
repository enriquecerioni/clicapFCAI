import React from "react";
import "./configuration.css";
import { useNavigate } from "react-router-dom";

export const Configuration = () => {
  const navigate = useNavigate();

  const configSections = [
    {
      icon: "fa-regular fa-image",
      name: "Logos",
      navigate: "/logos-config",
    },
    {
      icon: "fa-solid fa-list-ul",
      name: "Áreas",
      navigate: "/area-config",
    },
    {
      icon: "fa-regular fa-handshake",
      name: "Avales/Sponsors",
      navigate: "/importantdate-config",
    },
    {
      icon: "fa-regular fa-calendar",
      name: "Fechas importantes",
      navigate: "/importantdate-config",
    },
  ];

  return (
    <>
      <div className="section-header">
        <h2>Configuración</h2>
        <p>
          En esta sección se pueden realizar las configuraciones de cada evento
        </p>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {configSections.map((section, i) => {
          return (
            <div
              type={"button"}
              key={i}
              className="d-flex flex-column align-items-center justify-content-center config-boxs"
              onClick={() => navigate(section.navigate)}
            >
              <i className={`fa-2x ${section.icon}`}></i>
              <p className="m-0">{section.name}</p>
            </div>
          );
        })}
      </div>

      {/*  <Tabs
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
      </Tabs> */}
    </>
  );
};
