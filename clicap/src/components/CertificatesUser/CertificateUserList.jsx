import React, { useContext } from "react";
import jsPDF from "jspdf";
import { getDataUserByKey } from "../../helpers/helpers";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { CertificateContext } from "../../context/Certificate/CertificateContext";

export const CertificateUserList = ({ userCertificate }) => {
  const name = getDataUserByKey("name");
  const surname = getDataUserByKey("surname");
  const identifyNumber = getDataUserByKey("identifyNumber");
  const identifyType = getDataUserByKey("identifyType");
  const fullNameAndNumber = `${name} ${surname}, ${identifyType}: ${identifyNumber}`;
  const fullName = `${name} ${surname}`;

  const { ceritificateState } = useContext(CertificateContext);
  const { certificateLogo } = ceritificateState;

  const removeRepeatAuthor = (allMembers) => {
    // Convierte el usuario a minúsculas para que la comparación sea insensible a mayúsculas
    const lowerCaseName = name.toLowerCase();
    const lowerCaseLastName = surname.toLowerCase();

    // Divide la lista de miembros en un array
    let arrayMembers = allMembers.split(", ");

    // Filtra los miembros que no coinciden con el patrón
    arrayMembers = arrayMembers.filter((member) => {
      const completeName = member.toLowerCase();
      return !(
        (completeName.startsWith(lowerCaseName) &&
          completeName.endsWith(lowerCaseLastName)) ||
        (completeName.startsWith(lowerCaseLastName) &&
          completeName.endsWith(lowerCaseName))
      );
    });

    // Une los miembros filtrados de nuevo en una cadena
    let result = arrayMembers.join(", ");
    result = `${fullName}, ${result}`;

    return result;
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

    const members = job === "" ? fullName : removeRepeatAuthor(job.members);

    const numberOfCharacter =
      job === "" ? null : getNumbersOfCharacter(job.members);

    const doc = new jsPDF("l", "mm", "a4", true);
    var lines;
    var lMargin = 11; //left margin in mm
    var rMargin = 11; //right margin in mm
    var pdfInMM = 300; // width of A4 in mm
    var width = doc.internal.pageSize.getWidth();

    doc.addImage(certificateLogo, "JPEG", 5, 2, 290, 200);
    doc.setFontSize(16);
    /*  doc.text(certificate.name, width / 2, 70, {
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
      lines = doc.splitTextToSize(members, pdfInMM - valuesToMembers.marginMembers - valuesToMembers.marginMembers);
      doc.text(150, valuesToMembers.spaceBetweenTexts, lines, "center");
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
    doc.text(lMargin, 102, lines,{ maxWidth: 276, align: "justify" });

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
    doc.text(lMargin, 136, lines,{ maxWidth: 276, align: "justify" });

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
