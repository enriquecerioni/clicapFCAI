import axios from "axios";
import jsPDF from "jspdf";
import React from "react";
import imgCertificate from "../../assets/certificate/certificate.png";

const Welcome = () => {

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
    const doc = new jsPDF();
    var width = doc.internal.pageSize.getWidth();
    doc.addImage(imgData, "JPEG", 15, 40, 180, 160);
    doc.setFontSize(22);
    doc.text('Certificado de finalización', width/2, 100, { align: 'center' });
    doc.setFontSize(18);
    doc.text('Por el presente medio, se confirma que', width/2, 120, { align: 'center' });
    doc.setFontSize(32);
    doc.text('Iván Castro', width/2, 135, { align: 'center' });
    doc.setFontSize(18);
    doc.text('ha finalizado satisfactoriamente el congreso clicap', width/2, 145, { align: 'center' });
    doc.save("certificate.pdf");
  };

  return (
    <>
      <div>
        <h1 className="center-center title-top">Bienvenidos al Clicap 2023 </h1>
        <button onClick={() => donwloadCertificate()}>certificado</button>
      </div>
    </>
  );
};
export default Welcome;
