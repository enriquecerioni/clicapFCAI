import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import imgCertificate from "../../assets/certificate/certificate.jpg";

export const CertificateUserList = ({ userCertificate,certificateLogo }) => {

  const donwloadCertificate = async (type, certificate, job) => {
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
    doc.setFontSize(20);
    doc.text(job.members, width / 2, 90, {
      align: "center",
    }); //centrar
    doc.setFontSize(16);
    doc.text("Han expuesto en modalidad Póster, el trabajo:", 10, 105);
    doc.setFontSize(16);
    doc.text(job.name, width / 2, 120, {
      align: "center",
    }); //centrar
    doc.setLineWidth(0.5);
    doc.setFontSize(16);
    var lines = doc.splitTextToSize(certificate.text, pdfInMM - lMargin - rMargin);
    doc.text(lMargin, 140, lines);
    doc.save("certificate.pdf");
  };
  return (
    <tr>
      <td>{userCertificate.certificate.name}</td>

      <td className="">
        <Button
          className="btn btn-info"
          onClick={()=>donwloadCertificate("",userCertificate.certificate,userCertificate.job)}
          /* disabled={job.status === null ? true : false} */
        >
          <i className="fa-solid fa-file-arrow-down icon-size-table"></i>
        </Button>
      </td>
    </tr>
  );
};
