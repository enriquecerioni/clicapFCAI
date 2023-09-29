import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import jsPDF from "jspdf";

export const CertificatesList = ({
  certificate,
  setCertificateToDelete,
  showAlert,
}) => {
  const navigate = useNavigate();

  const { ceritificateState } = useContext(CertificateContext);
  const { certificateLogo } = ceritificateState;

  //fake data
  const name = "Rodrigo";
  const surname = "Perez";
  const identifyNumber = "40125336";
  const fullNameAndNumber = `${name} ${surname}, DNI: ${identifyNumber}`;
  const fullName = `${name} ${surname}`;

  const withMembers = (value) =>
    value
      ? "Rodolfo Vergne, Bibiana Manuel, Benjamin Sandoval, Sandra Arreceygor, Veronica Felix, Natalia Ordenes, Carina Rabau, Ana Laura Mateos, Mary Metcalfe, Camila Muñoz, Antonela Suarez, Valeria Alcala, Franco Bayon"
      : "";

  const getExampleJob = (certificateType, onlyOrManyPeople) => {
    if (certificateType === 2) {
      //onlyOrManyPeople => true / false
      return {
        members: withMembers(onlyOrManyPeople),
        name: "DESARROLLO DE NUEVOS PRODUCTOS FUNCIONALES PARA CONSUMO HUMANO A PARTIR DEJUREL REACHURUS LATHAMI, ESPECIE SUBTITULADA POR EL SECTOR INDUSTRIAL PESQUERO",
      };
    }
    return {
      name: "DESARROLLO DE NUEVOS PRODUCTOS FUNCIONALES PARA CONSUMO HUMANO A PARTIR DEJUREL REACHURUS LATHAMI, ESPECIE SUBTITULADA POR EL SECTOR INDUSTRIAL PESQUERO",
      members: "",
    };
  };

  const getNumbersOfCharacter = (text) => text.length;

  const setSpaceAndMargin = (valuesToMembers, numberOfCharacter) => {
    if (numberOfCharacter !== null) {
      if (numberOfCharacter > 57 && numberOfCharacter < 134) {
        valuesToMembers.spaceBetweenTexts = 80;
      } else if (numberOfCharacter >= 134) {
        valuesToMembers.marginMembers = 20;
        valuesToMembers.spaceBetweenTexts = 80;
      }
    }
  };

  const donwloadCertificate = async (type, certificate, job) => {
    const valuesToMembers = {
      marginMembers: 40,
      spaceBetweenTexts: 85,
    };

    const members =
      job.members === "" ? fullName : `${fullName}, ${job.members}`;

    const numberOfCharacter =
      job.members === "" ? null : getNumbersOfCharacter(job.members);

    var lines;
    const doc = new jsPDF("l", "mm", "a4", true);
    var lMargin = 11; //left margin in mm
    var rMargin = 11; //right margin in mm
    var pdfInMM = 300; // width of A4 in mm
    var width = doc.internal.pageSize.getWidth();

    doc.addImage(certificateLogo, "JPEG", 5, 2, 290, 200);
    doc.setFontSize(16);
    /* doc.text(certificate.name, width / 2, 70, {
      align: "center",
    }); */ //centrar
    doc.setFontSize(14);
    doc.text("Certificamos que:", 10, 70);

    //change text in bold
    doc.setFont(undefined, "bold");

    setSpaceAndMargin(valuesToMembers, numberOfCharacter);

    if (certificate.type === 2) {
      doc.setLineWidth(0.5);
      doc.setFontSize(16);
      lines = doc.splitTextToSize(
        members,
        pdfInMM - valuesToMembers.marginMembers - valuesToMembers.marginMembers
      );
      doc.text(150, valuesToMembers.spaceBetweenTexts, lines, "center");
    } else {
      doc.setFontSize(20);
      doc.text(fullNameAndNumber, width / 2, 90, "center"); //centrar
    }

    doc.setLineWidth(0.5);
    doc.setFontSize(16).setFont(undefined, "normal");
    lines = doc.splitTextToSize(
      certificate.introtext,
      pdfInMM - lMargin - rMargin
    );
    doc.text(lMargin, 102, lines, { maxWidth: 276, align: "justify" });

    //change text in bold
    doc.setFontSize(16).setFont(undefined, "bold");
    if (certificate.type === 2) {
      lines = doc.splitTextToSize(job.name, pdfInMM - 10 - 10);
    } else {
      lines = doc.splitTextToSize(certificate.jobtext, pdfInMM - 10 - 10);
    }

    doc.text(150, 120, lines, "center");

    doc.setLineWidth(0.5);
    //change text in normal
    doc.setFontSize(16).setFont(undefined, "normal");
    lines = doc.splitTextToSize(certificate.text, pdfInMM - lMargin - rMargin);
    doc.text(lMargin, 136, lines, { maxWidth: 276, align: "justify" });

    doc.save("certificate.pdf");
  };

  const deleteCertificate = () => {
    showAlert(true);
    setCertificateToDelete({
      id: certificate.id,
      entityName: certificate.name,
      entityType: "certificate",
      navigate: "/certificate-types",
    });
  };

  const disabledDownloadExample = (certificateType, oneOrMany) =>
    certificateType === 1 && oneOrMany === "MORE" ? true : false;

  return (
    <>
      <tr>
        <td>{certificate.name}</td>
        <td>{certificate.text}</td>
        <td>{certificate.type === 1 ? "Personal" : "Por Trabajo"}</td>
        <td className="">
          <ClicapTooltip
            tooltip={true}
            text={"Descargar ejemplo con un nombre"}
          >
            <button
              disabled={disabledDownloadExample(certificate.type, "ONE")}
              type="submit"
              className="btn btn-primary"
              onClick={() =>
                donwloadCertificate(
                  "",
                  certificate,
                  getExampleJob(certificate.type, false)
                )
              }
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </ClicapTooltip>
        </td>
        <td className="">
          <ClicapTooltip tooltip={true} text={"Descargar ejemplo con Miembros"}>
            <button
              disabled={disabledDownloadExample(certificate.type, "MORE")}
              type="submit"
              className="btn btn-secondary"
              onClick={() =>
                donwloadCertificate(
                  "",
                  certificate,
                  getExampleJob(certificate.type, true)
                )
              }
            >
              <i className="fa-solid fa-users"></i>
            </button>
          </ClicapTooltip>
        </td>
        <td className="">
          <ClicapTooltip tooltip={true} text={"Editar certificado"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() =>
                navigate(`/edit-certificate-type/${certificate.id}`)
              }
            ></i>
          </ClicapTooltip>
        </td>
        <td>
          <ClicapTooltip tooltip={true} text={"Eliminar certificado"}>
            <i
              type="button"
              className="fa-solid fa-trash-can icon-size-table btn-delete-table color-icon-error"
              onClick={deleteCertificate}
            ></i>
          </ClicapTooltip>
        </td>
      </tr>
    </>
  );
};
