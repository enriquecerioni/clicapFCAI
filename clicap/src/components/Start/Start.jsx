import React, { useEffect, useContext, useState } from "react";
import firstSpeaker from "../../assets/authorities/1.jpg";
import secondSpeaker from "../../assets/authorities/2.jpg";
import thirdSpeaker from "../../assets/authorities/3.jpg";
import gallery1 from "../../assets/gallery/1.jpg";
import gallery2 from "../../assets/gallery/2.jpg";
import gallery3 from "../../assets/gallery/3.jpg";
import gallery4 from "../../assets/gallery/4.jpg";
import gallery5 from "../../assets/gallery/5.jpg";
import gallery6 from "../../assets/gallery/6.jpg";
import gallery7 from "../../assets/gallery/7.jpg";
import gallery8 from "../../assets/gallery/8.jpg";
import logo1 from "../../assets/endorsements/logo-1.png";
import logo2 from "../../assets/endorsements/logo-2.png";
import logo3 from "../../assets/endorsements/logo-3.png";
import logo4 from "../../assets/endorsements/logo-4.png";
import logo5 from "../../assets/endorsements/logo-5.png";
import logo6 from "../../assets/endorsements/logo-6.png";
import logo7 from "../../assets/endorsements/logo-7.jpg";
import logo8 from "../../assets/endorsements/logo-8.jpg";
import clicap from "../../assets/clicap.png";
import CountdownTimer from "../CounterdownTimer/CountdownTimer";

import "./start.scss";
import "./button.css";
import { EntitiesContext } from "../../context/EntitiesContext";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";

const Start = () => {
  const { time, setTime, getDate, handleTime } = useContext(EntitiesContext);
  const userId = getDataUserByKey("roleId");
  const [logoApp, setLogoApp] = useState("");

  const loadAppLogo = async () => {
    const AppLogo = await reqAxios(
      "GET",
      `/certificate/getcertificatelogo/appLogo`,
      "",
      ""
    );
    setLogoApp(AppLogo.data.response);
  };

  useEffect(() => {
    getDate();
    loadAppLogo();
  }, [time]);

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
                onChange={handleTime}
                value={time}
              />
            </div>
          )}

          <div id="count" className="divIntro">
            {/* <h1>counter</h1> */}
            <CountdownTimer countdownTimestampMs={time} />
          </div>

          <div className="divIntro">
            <a
              href="#about"
              className="button-17"
              style={{ textDecoration: "none" }}
            >
              Acerca del Congreso
            </a>
          </div>
        </div>

        {/* <div className="intro-container wow fadeIn">
          <h1 className="mb-4 pb-0">
            <img src={clicap} alt="Image not found" className="clicapLogo"/>
          </h1>
          <p className="mb-4 pb-0">
            10-12 Abril, Facultad de Ciencias Aplicadas a la Industria, San
            Rafalel (Mendoza)
          </p>
          <a
            href="https://www.youtube.com/watch?v=K4lYCtmJVvk&ab_channel=MediaMendoza"
            className="venobox play-btn mb-4"
            data-vbtype="video"
            data-autoplay="true"
            target="blank"
          ></a>
          <a
            href="#about"
            className="about-btn scrollto"
            style={{ textDecoration: "none" }}
          >
            Acerca del Congreso
          </a>
        </div> */}
      </section>

      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>Acerca del Congreso</h2>
              <p>
                Sed nam ut dolor qui repellendus iusto odit. Possimus inventore
                eveniet accusamus error amet eius aut accusantium et. Non odit
                consequatur repudiandae sequi ea odio molestiae. Enim possimus
                sunt inventore in est ut optio sequi unde.
              </p>
            </div>
            <div className="col-lg-3">
              <h3>Donde</h3>
              <p>
                Facultad de Ciencias Aplicadas a la Industria, San Rafael,
                Mendoza, Argentina.
              </p>
            </div>
            <div className="col-lg-3">
              <h3>Cuando</h3>
              <p>
                Lunes, Martes y Miercoles
                <br />
                10-12 Abril
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="speakers" className="wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>RESPONSABLES DE LA ORGANIZACIÓN</h2>
            <p>Organizadores del Congreso CLICAP</p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="speaker">
                <img src={firstSpeaker} alt="Speaker 1" className="img-fluid" />
                <div className="details">
                  <h3>
                    <a href="speaker-details.html">Brenden Legros</a>
                  </h3>
                  <p>Quas alias incidunt</p>
                  <div className="social">
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="speaker">
                <img
                  src={secondSpeaker}
                  alt="Speaker 2"
                  className="img-fluid"
                />
                <div className="details">
                  <h3>
                    <a href="speaker-details.html">Hubert Hirthe</a>
                  </h3>
                  <p>Consequuntur odio aut</p>
                  <div className="social">
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="speaker">
                <img src={thirdSpeaker} alt="Speaker 3" className="img-fluid" />
                <div className="details">
                  <h3>
                    <a href="speaker-details.html">Cole Emmerich</a>
                  </h3>
                  <p>Fugiat laborum et</p>
                  <div className="social">
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-with-bg wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>Galería</h2>
            <p>Algunas imágenes del último congreso CLICAP 2022.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="speaker">
              <img src={gallery1} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="speaker">
              <img src={gallery2} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="speaker">
              <img src={gallery3} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <section id="clients" className="clients section-with-bg wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>AVALES INSTITUCIONALES</h2>
          </div>

          <div
            className="row no-gutters clients-wrap clearfix"
            data-aos="fade-up"
          >
            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo1} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo2} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo3} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo4} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo5} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo6} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo7} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-6">
              <div className="client-logo">
                <img src={logo8} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </section>

      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-info">
                <img src="assets/img/logo.png" alt="TheEvenet" />
                <p>
                  In alias aperiam. Placeat tempore facere. Officiis voluptate
                  ipsam vel eveniet est dolor et totam porro. Perspiciatis ad
                  omnis fugit molestiae recusandae possimus. Aut consectetur id
                  quis. In inventore consequatur ad voluptate cupiditate debitis
                  accusamus repellat cumque.
                </p>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="fa fa-angle-right"></i> <a href="#">Home</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="fa fa-angle-right"></i> <a href="#">Home</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right"></i>{" "}
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-contact">
                <h4>Contact Us</h4>
                <p>
                  A108 Adam Street <br />
                  New York, NY 535022
                  <br />
                  United States <br />
                  <strong>Phone:</strong> +1 5589 55488 55
                  <br />
                  <strong>Email:</strong> info@example.com
                  <br />
                </p>

                <div className="social-links">
                  <a href="#" className="twitter">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="#" className="google-plus">
                    <i className="fa fa-google-plus"></i>
                  </a>
                  <a href="#" className="linkedin">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong>CLICAP 2022</strong>. All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="">Droid Soft</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Start;
