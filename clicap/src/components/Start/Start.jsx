import React, { useEffect, useContext, useState } from "react";
import firstSpeaker from "../../assets/authorities/1.png";
import secondSpeaker from "../../assets/authorities/2.png";
import thirdSpeaker from "../../assets/authorities/3.png";
import CountdownTimer from "../CounterdownTimer/CountdownTimer";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";
import Carousel from "../Carousel/Carousel";
import { Sponsors } from "../../views/Sponsors/Sponsors";
import { Institutional } from "../../views/Institutional/Institutional";
import { SponsorContext } from "../../context/Sponsor/SponsorContex";
import { AppContext } from "../../context/App/AppContext";
import { Footer } from "../Footer/Footer";
import "./button.css";
import "./start.scss";

const Start = () => {
  const { appState, getEventDate, handleTime } = useContext(AppContext);
  const { eventDate } = appState;
  const { getAllSponsors } = useContext(SponsorContext);
  const userId = getDataUserByKey("roleId");
  const [logoApp, setLogoApp] = useState("");
  const [date, setDate] = useState(eventDate);

  const { getAppLogo } = useContext(AppContext);

  const loadAppLogo = async () => {
    const AppLogo = await getAppLogo();
    setLogoApp(AppLogo);
  };

  useEffect(() => {
    getEventDate();
    loadAppLogo();
  }, [eventDate]);

  useEffect(() => {
    getAllSponsors("All");
  }, []);

  return (
    <>
      <section
        id="intro"
        className="animate__animated animate__fadeInDown sectionIntro"
      >
        <div className="introSection">
          <div className="divIntro">
            <h1 className="mb-4 pb-0">
              <img
                src={`data:image/png;base64,${logoApp}`}
                alt="Image not found"
                className="clicapLogo"
              />
            </h1>
          </div>
          {userId === 1 && (
            <div>
              <input
                type="date"
                className="form-date-input"
                onChange={(e) => setDate(e.target.value)}
                value={eventDate}
              />
              <button
                className="btn btn-primary ms-3"
                onClick={() => handleTime(date)}
              >
                Guardar Fecha
              </button>
            </div>
          )}

          <div id="count" className="divIntro">
            <CountdownTimer countdownTimestampMs={eventDate} />
          </div>

          <div className="divIntro">
            <a
              href="#about"
              className="button-17"
              style={{ textDecoration: "none" }}
            >
              Acerca del evento
            </a>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>Acerca del evento</h2>
              <p>
                Las IV Jornadas de enseñanza e investigación de las ciencias
                experimentales, tienen como objetivo general, contribuir al
                desarrollo integral de la comunidad, al bien común y a la
                ciudadanía plena en los ámbitos local, regional, provincial y
                nacional, atendiendo con pertinencia necesidades y demandas
                sociales, considerando los planes estratégicos provinciales y
                nacionales, articulando saberes y prácticas con una clara
                orientación interdisciplinar, en un marco de responsabilidad
                institucional.
              </p>
            </div>
            <div className="col-lg-3">
              <h3>Donde</h3>
              <p>
                Facultad de Ciencias Aplicadas a la Industria (FCAI-UNCuyo) –
                Bernardo de Irigoyen 375 – San Rafael (Mendoza – Argentina).
                Museo de Historia Natural - Av. Ing. Julio Balloffet 3099 - San
                Rafael. (Mendoza – Argentina).
              </p>
            </div>
            <div className="col-lg-3">
              <h3>Cuando</h3>
              <p>
                Jueves y Viernes
                <br />
                14 y 15 de Septiembre de 2023
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="speakers" className="wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>RESPONSABLES DE LA ORGANIZACIÓN</h2>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="speaker">
                <img src={firstSpeaker} alt="Speaker 1" className="img-authorities" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="speaker">
                <img
                  src={secondSpeaker}
                  alt="Speaker 2"
                  className="img-authorities"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="speaker">
                <img src={thirdSpeaker} alt="Speaker 3" className="img-authorities" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-with-bg wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>Galería</h2>
          </div>
        </div>
        <Carousel />
      </section>

      <Institutional />

      <Sponsors />

      <Footer />
    </>
  );
};

export default Start;
