import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { reqAxios, waitAndRefresh } from "../../../helpers/helpers";
import { statusCorrections } from "../typesCorrections";

export const NewCorrections = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { correction, setCorrection } = useContext(EntitiesContext);
  const [putDisabled, setPutDisabled] = useState(false);
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

  const disabled = () => {
    return !!!correction.correctionId || !!!correction.details.trim();
  };

  const handleSubmitCorrection = async () => {
    await reqAxios("POST", "/jobdetails/create", "", correction);
    await reqAxios("PUT", `/job/setcorrection/${id}`, "", {
      status: correction.correctionId,
    });
    /*     navigate('/jobs'); */
    waitAndRefresh("jobs", 1000);
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
      <div className="m-3">
        <div style={{ width: "300px" }} className="">
          <Form.Label className="fw-bold">Estado del trabajo</Form.Label>
          <Select
            options={statusCorrections}
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
          <Button
            variant="success"
            disabled={putDisabled ? putDisabled : disabled()}
            onClick={handleSubmitCorrection}
          >
            Guardar Corrección
          </Button>
        </div>
      </div>
    </>
  );
};
