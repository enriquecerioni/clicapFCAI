import React, { useContext } from "react";
import { useEffect } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { reqAxios } from "../../../helpers/helpers";

export const NewCorrections = () => {
  const { id } = useParams();
  const correctionMod = [
    { label: "Aceptado", target: { name: "correctionId", value: 1 } },
  ];
  const { correction, setCorrection } = useContext(EntitiesContext);
  //CORRECCIONES
  const handleNewCorrection = (e, name) => {
    if (e === null) {
      return setCorrection({
        ...correction,
        [name]: "",
      });
    }
    setCorrection({
      ...correction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCorrection = async () => {
    const upCorrection = await reqAxios(
      "POST",
      "/jobdetails/create",
      "",
      correction
    );
    const setCorrection = await reqAxios("PUT", `/job/setcorrection/${id}`, "", "");
  };
  useEffect(() => {
    setCorrection({
      ...correction,
      ["jobId"]: Number(id),
    });
  }, []);
  return (
    <>
      <div className="center-center">
        <h3>Nueva corrección</h3>
      </div>
      <div>
        <div style={{ width: "300px" }} className="">
          <Select
            options={correctionMod}
            placeholder={"seleccione.."}
            name="correctionId"
            isClearable={true}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3D84A8",
              },
            })}
            onChange={(e) => handleNewCorrection(e, "correctionId")}
          />
        </div>
        <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
          <Form.Control
            className="mt-3"
            name="details"
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            onChange={(e) => handleNewCorrection(e, "details")}
          />
        </FloatingLabel>
        <div className="center-center mt-3">
          <Button variant="success" onClick={handleSubmitCorrection}>
            Guardar Corrección
          </Button>
        </div>
      </div>
    </>
  );
};
