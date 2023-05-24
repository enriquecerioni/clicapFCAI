import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import { getDataUserByKey } from "../../helpers/helpers";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";

export const CertificateUserList = ({ userCertificate, certificateLogo }) => {
  const name = getDataUserByKey("name");
  const surname = getDataUserByKey("surname");
  const identifyNumber = getDataUserByKey("identifyNumber");
  const fullNameAndNumber = `${name} ${surname}, ${identifyNumber}`;
  const fullName = `${name} ${surname}`;

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
