import React, { useContext } from "react";
import jsPDF from "jspdf";
import { getDataUserByKey } from "../../helpers/helpers";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { CertificateContext } from "../../context/Certificate/CertificateContext";

export const CertificateUserList = ({ userCertificate }) => {
  const name = getDataUserByKey("name");
  const surname = getDataUserByKey("surname");
  const identifyNumber = getDataUserByKey("identifyNumber");
  const fullNameAndNumber = `${name} ${surname}, ${identifyNumber}`;
  const fullName = `${name} ${surname}`;

  const { ceritificateState } = useContext(CertificateContext);
  const { certificateLogo } = ceritificateState;

  const donwloadCertificate = async (type, certificate, job) => {
    const members = job.members === "" ? name : `${fullName}, ${job.members}`;
    const doc = new jsPDF("l", "mm", "a4", true);
    var lines;
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

    //change text in bold
    doc.setFont(undefined, "bold");
    if (certificate.type === 2) {
      doc.setLineWidth(0.5);
      doc.setFontSize(16);
      lines = doc.splitTextToSize(members, pdfInMM - 10 - 10);
      doc.text(150, 90, lines, "center");
    } else {
      doc.setFontSize(20);
      doc.text(fullNameAndNumber, width / 2, 90, {
        align: "center",
      }); //centrar
    }
    doc.setLineWidth(0.5);
    doc.setFontSize(16).setFont(undefined, "normal");
    lines = doc.splitTextToSize(
      certificate.introtext,
      pdfInMM - lMargin - rMargin
    );
    doc.text(lMargin, 112, lines);

    //change text in bold
    doc.setFontSize(16).setFont(undefined, "bold");
    if (certificate.type === 2) {
      lines = doc.splitTextToSize(job.name, pdfInMM - 10 - 10);
    } else {
      lines = doc.splitTextToSize(certificate.jobtext, pdfInMM - 10 - 10);
    }

    doc.text(150, 128, lines, "center");

    doc.setLineWidth(0.5);
    //change text in normal
    doc.setFontSize(16).setFont(undefined, "normal");
    lines = doc.splitTextToSize(certificate.text, pdfInMM - lMargin - rMargin);
    doc.text(lMargin, 146, lines);

    doc.save("certificate.pdf");
  };

  return (
    <tr>
      <td>{userCertificate.certificate.name}</td>
      <td>{userCertificate.job ? userCertificate.job.name : "-"}</td>
      <td className="">
        <ClicapTooltip tooltip={true} text={"Descargar certificado"}>
          <button
            className="btn btn-secondary"
            onClick={() =>
              donwloadCertificate(
                "",
                userCertificate.certificate,
                userCertificate.job ? userCertificate.job : ""
              )
            }
          >
            <i className="fa-solid fa-file-arrow-down icon-size-table"></i>
          </button>
        </ClicapTooltip>
      </td>
    </tr>
  );
};
