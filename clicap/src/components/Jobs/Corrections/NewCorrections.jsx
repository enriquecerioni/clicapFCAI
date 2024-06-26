import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { statusCorrections } from "../typesCorrections";
import { JobContext } from "../../../context/Job/JobContext";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";
import { Loader } from "../../Loader/Loader";
import { getDataUserByKey } from "../../../helpers/helpers";

export const NewCorrections = () => {
  const navigate = useNavigate();

  const { jobState, createEvaluationByEvaluatorOrAdmin } =
    useContext(JobContext);
  const { correctionInitial, jobData, jobLoader } = jobState;

  const [correction, setCorrection] = useState(correctionInitial);
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
    if(correction.evaluatorId === "") correction.evaluatorId = getDataUserByKey("id");
    await createEvaluationByEvaluatorOrAdmin(correction);
    navigate("/jobs");
  };

  useEffect(() => {
    setCorrection(correctionInitial);
  }, [jobData]);

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
            placeholder={"Seleccione..."}
            name="correctionId"
            value={statusCorrections.filter(
              (status) => correction.correctionId === status.value
            )}
            isClearable={true}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3D84A8",
              },
            })}
            style={{zIndex: 999999999}}
            onChange={(e) => handleNewCorrection(e, "correctionId")}
          />
        </div>
        <Form.Control
            className="mt-3"
            name="details"
            as="textarea"
            placeholder="Comentarios..."
            style={{ height: "100px" }}
            onChange={(e) => handleNewCorrection(e, "details")}
          />
        <div className="center-center mt-3">
          {!jobLoader ? (
            <ClicapTooltip
              tooltip={putDisabled ? putDisabled : disabled()}
              text={"Por favor complete todos los campos"}
            >
              <div className="d-flex">
                <Button
                  variant="success"
                  disabled={putDisabled ? putDisabled : disabled()}
                  onClick={handleSubmitCorrection}
                >
                  Guardar Corrección
                </Button>
              </div>
            </ClicapTooltip>
          ) : (
            <div className="center-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
