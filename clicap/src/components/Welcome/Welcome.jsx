import axios from "axios";
import jsPDF from "jspdf";
import React from "react";
import imgCertificate from "../../assets/certificate/certificate.png";
import { getDataUserByKey } from "../../helpers/helpers";
import './welcome.css'

const Welcome = () => {

  const roleId = getDataUserByKey("roleId");
  const name = getDataUserByKey("name");

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
    doc.text('Certificado de finalización', width / 2, 100, { align: 'center' });
    doc.setFontSize(18);
    doc.text('Por el presente medio, se confirma que', width / 2, 120, { align: 'center' });
    doc.setFontSize(32);
    doc.text('Iván Castro', width / 2, 135, { align: 'center' });
    doc.setFontSize(18);
    doc.text('ha finalizado satisfactoriamente el congreso clicap', width / 2, 145, { align: 'center' });
    doc.save("certificate.pdf");
  };

  return (
    <>
      <div>
        <h1 className="center-center title-top">Bienvenido {name} </h1>
        {
          roleId === 1 ?
            <div class="alert alert-success w-25" role="alert">
              Rol de Usuario: <strong>Admin</strong>
            </div>
            : roleId === 2 ?
              <div class="alert alert-success w-25" role="alert">
                Rol de Usuario: <strong>Evaluador</strong>
              </div>
              : roleId === 3 ?
                <div class="alert alert-success w-25" role="alert">
                  Rol de Usuario: <strong>Docente/Investigador</strong>
                </div>
                :
                <div class="alert alert-success w-25" role="alert">
                  Rol de Usuario: <strong>Alumno</strong>
                </div>
        }

        {
          roleId !== 1 ?
            <div className="container">
              <div class="row">
                <div class="col text-center border">
                  <h2 className="mb-5">Trabajos Completos</h2>
                  <div>
                    <button type="button" class="btn btn-outline-success w-75 mButton">Ingeniería y Ciencias de los Alimentos</button>
                    <button type="button" class="btn btn-outline-primary w-75 mButton">Ingeniería Química y Ciencias Ambientales</button>
                    <button type="button" class="btn btn-outline-danger w-75 mButton">Ingeniería Mecánica y Ciencias de la Computación</button>
                    <button type="button" class="btn btn-outline-info w-75 mButton">Educación en Ciencias e Ingeniería</button>
                  </div>
                  <button type="button" class="btn btn-secondary btn-lg btn-block">Ver todos ()</button>
                </div>
                <div class="col text-center border">
                  <h2 className="mb-5">Resúmenes</h2>
                  <div>
                    <button type="button" class="btn btn-outline-success w-75 mButton">Ingeniería y Ciencias de los Alimentos</button>
                    <button type="button" class="btn btn-outline-primary w-75 mButton">Ingeniería Química y Ciencias Ambientales</button>
                    <button type="button" class="btn btn-outline-danger w-75 mButton">Ingeniería Mecánica y Ciencias de la Computación</button>
                    <button type="button" class="btn btn-outline-info w-75 mButton">Educación en Ciencias e Ingeniería</button>
                  </div>
                  <button type="button" class="btn btn-secondary btn-lg btn-block">Ver todos ()</button>
                </div>
              </div>
            </div>
            :
            <div>
              info usuario
            </div>
        }

        {/* <button onClick={() => donwloadCertificate()}>certificado</button> */}

      </div>
    </>
  );
};
export default Welcome;
