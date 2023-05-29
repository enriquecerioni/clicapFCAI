import React, { Fragment, useContext, useEffect } from "react";
import { ImportantDateCard } from "./ImportantDateCard";
import { ImportantDateContext } from "../../context/ImportantDates/ImportantDateContext";
import { Loader } from "../Loader/Loader";

export const ImportantDate = () => {
  const { getAllImportantDates, importantDateState } =
    useContext(ImportantDateContext);
  const { isFetching, importantDates } = importantDateState;

  useEffect(() => {
    getAllImportantDates();
  }, []);

  return (
    <>
      {isFetching ? (
        <div
          style={{
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Loader />
        </div>
      ) : null}

      <div className="section-header">
        <h2>Fechas importantes</h2>
      </div>

      <div className="m-4 d-flex flex-wrap">
        {importantDates.length > 0 ? (
          importantDates.map((date, i) => {
            return (
              <Fragment key={i}>
                <ImportantDateCard date={date} />
              </Fragment>
            );
          })
        ) : (
          <div className="center-center">
            <p>No hay fechas importantes</p>
          </div>
        )}
      </div>
    </>
  );
};
