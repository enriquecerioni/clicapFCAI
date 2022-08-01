import React from "react";
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

import "./start.scss";

const Start = () => {
  return (
    <>
      <section id="intro" className="animate__animated animate__fadeInDown">
        <div className="intro-container wow fadeIn">
          <h1 className="mb-4 pb-0">
            {/* <br /> */}
            <span>CLICAP</span> 2022
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
        </div>
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
              <h3>Where</h3>
              <p>Downtown Conference Center, New York</p>
            </div>
            <div className="col-lg-3">
              <h3>When</h3>
              <p>
                Monday to Wednesday
                <br />
                10-12 December
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="speakers" className="wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>Autoridades</h2>
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

      <section id="clients" class="clients section-with-bg wow fadeInUp">
        <div class="container">
          <div class="section-header">
            <h2>Sponsors</h2>
          </div>

          <div class="row no-gutters clients-wrap clearfix" data-aos="fade-up">
            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo1} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo2} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo3} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo4} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo5} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo6} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo7} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src={logo8} class="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br /><br />
      </section>
      
      <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-info">
            <img src="assets/img/logo.png" alt="TheEvenet" />
            <p>In alias aperiam. Placeat tempore facere. Officiis voluptate ipsam vel eveniet est dolor et totam porro. Perspiciatis ad omnis fugit molestiae recusandae possimus. Aut consectetur id quis. In inventore consequatur ad voluptate cupiditate debitis accusamus repellat cumque.</p>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="fa fa-angle-right"></i> <a href="#">Home</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">About us</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">Services</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="fa fa-angle-right"></i> <a href="#">Home</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">About us</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">Services</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="fa fa-angle-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              A108 Adam Street <br/>
              New York, NY 535022<br/>
              United States <br/>
              <strong>Phone:</strong> +1 5589 55488 55<br/>
              <strong>Email:</strong> info@example.com<br/>
            </p>

            <div class="social-links">
              <a href="#" className="twitter"><i class="fa fa-twitter"></i></a>
              <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
              <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
              <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
              <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>CLICAP 2022</strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="">Droid Soft</a>
      </div>
    </div>
  </footer>
    </>
  );
};

export default Start;
