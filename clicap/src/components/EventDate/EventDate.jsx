import React, { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../context/Area/AreaContext";
import { Button, Form } from "react-bootstrap";
import { waitAndRefresh } from "../../helpers/helpers";
import ModalDelete from "../Modals/ModalDelete";
import { AppContext } from "../../context/App/AppContext";

export const EventDate = () => {
    const { getEventDate, setDeadlineDays, handleTime, appState } = useContext(AppContext);
    const { eventDate, deadlineDays } = appState;
    const [date, setDate] = useState(eventDate);
    const [day, setDay] = useState(deadlineDays);

    useEffect(() => {
        getEventDate();
    }, []);

    return (
        <section id="speakers" className="wow fadeInUp">
            <div className="section-header">
                <h2>Fecha del Evento / Fecha Límite de Entregas</h2>
            </div>

            <div className="container">
                <div className="center-center">
                    <div className="widthConfig boxCard">
                        <h2>Modificar Fecha del Evento</h2><br />
                        <div className="mb-3 center-center">
                            <input
                                type="date"
                                className="form-date-input"
                                onChange={(e) => setDate(e.target.value)}
                                value={eventDate}
                            />
                            <button
                                className="btn btn-primary ms-3"
                                onClick={() => handleTime(date)}
                            >
                                Guardar Fecha
                            </button>
                        </div>

                        <h2 className="mt-5">Modificar Fecha Límite de Entregas</h2>
                        <p class="alert alert-info">Número de dias previos al evento para realizar la entrega de trabajos/resúmenes.</p>
                        <div className="mb-3 d-flex justify-content-around align-items-center">
                            <div><p className="">Fecha límite actual <strong>{deadlineDays}</strong> días antes del evento.</p></div>
                            <div className="d-flex align-items-center">
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => setDay(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary ms-3"
                                    onClick={() => setDeadlineDays(day)}
                                >
                                    Modificar número de dias
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};