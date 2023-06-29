import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reqAxios } from "../../helpers/helpers";
import "./AccountActivate.css";
import { Loader } from "../Loader/Loader";

const AccountActivate = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [activate, setActivate] = useState({
    activated: false,
    loading: true,
    error: "",
  });

  const validate = async () => {
    const data = await reqAxios(
      "GET",
      `/user/acount-activate/${token}`,
      "",
      ""
    );
    if (data.status && data.status === 200) {
      setActivate({
        activated: true,
        loading: false,
        error: "",
      });
    } else {
      setActivate({
        activated: false,
        loading: false,
        error: data.response.data.msg,
      });
    }
  };

  useEffect(() => {
    validate();
  }, []);

  const icon = activate.activated
    ? "fa-circle-check icon-success"
    : "fa-circle-xmark danger icon-error";

  const title = activate.activated
    ? "!Su cuenta se registró exitosamente!"
    : "Error al crear la cuenta.";

  const subTitle = activate.activated
    ? "Usted en unos minutos recibirá un correo con su credencial."
    : activate.error;

  return (
    <>
      <div className="center-center account-activate">
        <div className="activated center-center">
          {activate.loading ? (
            <Loader />
          ) : (
            <>
              <i className={`fa-3x fa-solid ${icon}`}></i>
              <h2 className="mt-3">{title}</h2>
              <br />
              <p>{subTitle}</p>
              <div className="center-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="btn btn-primary"
                >
                  Ir a la página del evento
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default AccountActivate;
