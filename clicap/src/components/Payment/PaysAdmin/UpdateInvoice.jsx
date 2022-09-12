import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { useNavigate } from "react-router-dom";

const UpdateInvoce = () => {
    
    const navigate = useNavigate();
    const { allPays, getAllPays, handleChangePay, updatePayInvoice} =
    useContext(EntitiesContext); 
    const {id} = useParams();
    const pay = allPays.find(p => p.id == id)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePayInvoice(id);
        navigate("/pays");
      };

    useEffect(()=>{
        getAllPays();
    },[])

    return(
        <div>
            <h1>Datos del Pago</h1>
            <div>
                <h2>{pay.moneyType}</h2>
                <h2>{pay.amount}</h2>
                <h2>{pay.payType}</h2>
            </div>
            <h2>{pay.authorId}</h2>
            <h2>{pay.iva}</h2>
            <h2>{pay.detail}</h2>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input
                    type="file"
                    placeholder="Seleccione..."
                    className="form-control"
                    name="invoice"
                    onChange={handleChangePay}
                    />
                </div>
                <div className="mt-3">
                <Button type="submit" variant="primary">
                    Subir Factura
                </Button>
                </div>
            </form>
        </div>
    );
}

export default UpdateInvoce;