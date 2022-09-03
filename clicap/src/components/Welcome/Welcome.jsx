import axios from "axios";
import React from "react";

const Welcome = () => {
  const reqAxiosDownload = async () => {
    try {
      await axios({
        url: "http://localhost:3000/api/clicap/job/downloadfile", //your url
        params: "",
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "archivo.docx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      return "Descargado";
    } catch (error) {
      console.log(error);
    }
  };
  const downloadFile = () => {
    reqAxiosDownload();
  };
  return (
    <>
      <div>
        <h1 className="center-center title-top">Bienvenidos al Clicap 2023 </h1>
{/*         <button onClick={downloadFile}>Descargar</button> */}
      </div>
    </>
  );
};
export default Welcome;
