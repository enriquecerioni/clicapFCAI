import React from "react";
import { Card } from "react-bootstrap";
import "./certificateUser.css";
import jsPDF from "jspdf";
import imgCertificate from "../../assets/certificate/certificate.jpg";

export default function CardCertificate() {
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const donwloadCertificate = async () => {
    let imgData = await getBase64FromUrl(imgCertificate);
    const doc = new jsPDF("l", "mm", "a4", true);

    var width = doc.internal.pageSize.getWidth();
    doc.addImage(imgData, "JPEG", 5, 2, 290, 200);
    doc.setFontSize(22);
    doc.text("Certificado de finalización", width / 2, 80, {
      align: "center",
    });
    doc.setFontSize(18);
    doc.text("Por el presente medio, se confirma que", width / 2, 100, {
      align: "center",
    });
    doc.setFontSize(32);
    doc.text("Iván Castro", width / 2, 115, { align: "center" });
    doc.setFontSize(18);
    doc.text(
      "ha finalizado satisfactoriamente el congreso clicap",
      width / 2,
      125,
      { align: "center" }
    );
    doc.save("certificate.pdf");
  };
  return (
    <Card
      style={{ width: "18rem", height: "12rem" }}
      className="card-certificate"
      type="button"
      onClick={() => donwloadCertificate()}
    >
      <Card.Body className="center-center">
        <div className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <i className="fa-2x fa-solid fa-user-check"></i>
          </div>
          <div>
            <p className="">Descargar certificado de asistencia</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
