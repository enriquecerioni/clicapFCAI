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
  const fullNameAndNumber = `${name} ${surname}, ${identifyNumber}`;
  const fullName = `${name} ${surname}`;

  const withMembers = (value) =>
    value
      ? "Rodolfo Vergne Cerioni, Antonela Suarez, Camila muñoz, Franco Bayon"
      : "";

  const getExampleJob = (certificateType, onlyOrManyPeople) => {
    if (certificateType === 2) {
      //onlyOrManyPeople => true / false
      return {
        members: withMembers(onlyOrManyPeople),
        name: "Nombre de trabajo ejemplo",
      };
    }
    return {
      name: "Nombre de trabajo ejemplo",
      members: "",
    };
  };

  const donwloadCertificate = async (type, certificate, job) => {
    const members = job.members === "" ? name : `${fullName}, ${job.members}`;
    const doc = new jsPDF("l", "mm", "a4", true);
    var lMargin = 15; //left margin in mm
    var rMargin = 15; //right margin in mm
    var pdfInMM = 300; // width of A4 in mm
    var width = doc.internal.pageSize.getWidth();

    doc.addImage(certificateLogo, "JPEG", 5, 2, 290, 200);
    doc.setFontSize(16);
    doc.text(certificate.name, width / 2, 70, {
      align: "center",
    }); //centrar
    doc.setFontSize(14);
    doc.text("Certificamos que:", 10, 80);

    if (certificate.type === 2) {
      doc.setLineWidth(0.5);
      doc.setFontSize(16);
      var lines = doc.splitTextToSize(members, pdfInMM - lMargin - rMargin);
      doc.text(lMargin, 90, lines);
    } else {
      doc.setFontSize(20);
      doc.text(fullNameAndNumber, width / 2, 90, {
        align: "center",
      }); //centrar
    }
    doc.setLineWidth(0.5);
    doc.setFontSize(16);
    var lines = doc.splitTextToSize(
      certificate.introtext,
      pdfInMM - lMargin - rMargin
    );
    doc.text(lMargin, 110, lines);

    if (certificate.type === 2) {
      doc.setFontSize(16);
      doc.text(job.name, width / 2, 125, {
        align: "center",
      }); //centrar
    } else {
      doc.setFontSize(16);
      doc.text(certificate.jobtext, width / 2, 120, {
        align: "center",
      }); //centrar
    }

    doc.setLineWidth(0.5);
    doc.setFontSize(16);
    var lines = doc.splitTextToSize(
      certificate.text,
      pdfInMM - lMargin - rMargin
    );
    doc.text(lMargin, 140, lines);

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
