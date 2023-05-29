import React, { useContext, useEffect } from "react";
import { SponsorContext } from "../../context/Sponsor/SponsorContex";

export const Sponsors = () => {
  const { getAllSponsors, sponsorState } = useContext(SponsorContext);
  const { sponsors } = sponsorState;

  useEffect(() => {
    getAllSponsors("Sponsor");
  }, []);

  return (
    <section id="clients" className="clients wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Sponsors</h2>
        </div>

        <div
          className="row no-gutters clients-wrap clearfix"
          data-aos="fade-up"
        >
          {sponsors &&
            sponsors.map((sponsor) => {
              return (
                <div className="col-lg-3 col-md-4 col-xs-6">
                  <a href={sponsor.link}>
                    <div className="client-logo">
                      <img
                        src={sponsor.imgbase64}
                        className="img-fluid"
                        alt="Imagen no encontrada"
                      />
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </section>
  );
};
