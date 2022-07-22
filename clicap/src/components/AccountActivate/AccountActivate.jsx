import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { reqAxios, waitAndRefresh } from "../../helpers/helpers";
import './AccountActivate.css';

const AccountActivate=()=>{
    const {token} = useParams();
    const [activate,setActivate]=useState(false);
    useEffect(()=>{
        const validate =async()=>{
           const data = await reqAxios('GET',`/user/acount-activate/${token}`,'','');
           if (data.status && data.status===200) {
            setActivate(true);
          }
        } 
        validate();
    },[])
    const icon = activate?'fa-circle-check icon-success':'fa-circle-xmark danger icon-error';
    const title = activate?'!Su cuenta se registró exitosamente!':'Error al crear la cuenta.';
    const subTitle = activate?'Usted en unos minutos recibirá un correo con sus credenciales.':'El tiempo para activar su cuenta expiró o el token es incorrecto.';
    return(<>
    <div className="center-center account-activate">
        <div className="activated center-center">
            <i className={`fa-3x fa-solid ${icon}`}></i>
            <h2 className="mt-3">{title}</h2>
            <br />
            <p>{subTitle}</p>
            <p>Usted en breve será redireccionado a Clicap...</p>
            {waitAndRefresh('/login',14000)}
        </div>
    </div>
    </>)
}
export default AccountActivate;