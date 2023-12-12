import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AutorizarBajaAdicional({ isOpenAutorizarMovEqAd, onCloseAutorizarMovEqAd, childrenAutorizarMovEqAd, infoMovEq}){

  const [open, setOpen] = React.useState(false);
  const [tipoAlerta, setTipoAlerta] = React.useState('');
  const [mensaje, setMensaje] = React.useState('');

  const handleClick = (valAl) => {
    setTipoAlerta(valAl)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if(tipoAlerta=="success"){
      window.location.reload();
    }
    setOpen(false);
  };
//
  const storedJsonString = localStorage.getItem('user');
  // Convertir la cadena JSON en un objeto
const storedUserData = JSON.parse(storedJsonString);
    //
    const [formData, setFormData] = useState({
        descripIn: '',
      });
    if (!isOpenAutorizarMovEqAd) {return null;}
    if(Object.entries(infoMovEq.detalleMov)==false){return null;}
    console.log(infoMovEq.detalleMov);
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
      };
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/autorizar/baja/equipo/adicional',{
        method: 'PUT',
        body: JSON.stringify({autorizar: event.target.value, codPer: storedUserData.usuario}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      setMensaje('Solicitud de movimiento autorizada');
      //console.log(respuesta);
      handleClick('success');
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      //alert('El Usuario no existe')
      setMensaje(error.message)
      handleClick('error');
      //<Alerta>ALGO</Alerta>
    } 
  };

    return(
        <div className="modal-overlay">
            <div className="modal">
              
              <div>
                <h2>Solicitud de Baja de Equipo Adicional</h2>
                {(infoMovEq.detalleMov && typeof infoMovEq.detalleMov === 'object' && infoMovEq.detalleMov.personalMov && infoMovEq.detalleMov.personalMov[0]&&infoMovEq.detalleMov.labMov[0])?(
                <div className='container-cards'>
                <p>Nombre de solicitante: {infoMovEq.detalleMov.personalMov[0].Ejecutor}</p>
                <p>Fecha de solicitud: {infoMovEq.detalleMov.labMov[0].FechaSol}</p>
                
                </div>
                ):null}
                <p>Se solicita dar de baja los siguientes equipos adicionales:</p>
                {infoMovEq.detalleMov.detalleMov.map((valueDet)=>(  
                  <div>{valueDet.CodEquipoAd}</div>
                )
                )}
              </div>
              <div><button className='enviar2' value={`${infoMovEq.detalleMov.detalleMov[0].CodBajaAd}/autorizada`} onClick={handleSubmit}>Autorizar</button><button className='enviar2' value={`${infoMovEq.detalleMov.detalleMov[0].CodBajaAd}/rechazada`} onClick={handleSubmit}>Rechazar</button></div>
        
        <button className="modal-close" onClick={onCloseAutorizarMovEqAd}>
          &#x2715;
        </button>
        {childrenAutorizarMovEqAd}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipoAlerta} sx={{ width: '100%' }}>
          {mensaje}
        </Alert>
      </Snackbar>
      </div>
    )
}
export default AutorizarBajaAdicional