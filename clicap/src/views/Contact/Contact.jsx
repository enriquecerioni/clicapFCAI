import React from "react";
import { Button } from "react-bootstrap";
import "./contact.css";

export const Contact = () => {
  return (
    <>
      <div className="section-header">
        <h2>Contáctanos</h2>
      </div>

      <div className="boxCardContact centerBoxContact mb-5 ">
        <div className="poderver container p-3 display-flex">
          <div className="contactBox">
            <h3>Ubicación</h3>
            <p>Bernardo de Irigoyen 301, San Rafael, Mendoza</p>
          </div>
          <div className="contactBox">
            <h3>Correo Electrónico</h3>
            <p>jeice@fcai.uncu.edu.ar</p>
          </div>
          <div className="contactBox">
            <h3>Llamar</h3>
            <p>+54 0260 442-1947 <br /> Int: 1508</p>
          </div>
        </div>
      </div>

      <iframe
        className="iFrame"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5522.452044824676!2d-68.3342349934139!3d-34.612514597131906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967907fb73f1aa87%3A0x644b059691088805!2sUNCUYO!5e0!3m2!1sen!2sar!4v1684097867840!5m2!1sen!2sar"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </>
  );
};
