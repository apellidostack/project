import React, { useState, useEffect } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DetalleAtenderMantenimiento({ isOpenAutorizarMovEqAd, onCloseAutorizarMovEqAd, childrenAutorizarMovEqAd, infoMovEq}){

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
// Funció

  const storedJsonString = localStorage.getItem('user');
  // Convertir la cadena JSON en un objeto
const storedUserData = JSON.parse(storedJsonString);
    //
    const [formData, setFormData] = useState({});
    if (!isOpenAutorizarMovEqAd) {return null;}
    if(Object.entries(infoMovEq.detalleMov)==false){return null;}
    //console.log(infoMovEq.detalleMov);
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
      };
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    //console.log(formData);
     try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/set/atender/solicitud',{
        method: 'POST',
        body: JSON.stringify({formData, codPer: storedUserData.usuario}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      setMensaje('Registrado Correctamente');
      console.log(respuesta);
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
              <div className='barra'>
              <div>
                <h2>Solicitud de movimiento</h2>
                {(infoMovEq.detalleMov && typeof infoMovEq.detalleMov === 'object' && infoMovEq.detalleMov.personalMov && infoMovEq.detalleMov.personalMov[0]&&infoMovEq.detalleMov.labMov[0])?(
                <div className='container-cards'>
                <p>Nombre de solicitante: {infoMovEq.detalleMov.personalMov[0].Solicitante}</p>
                <p>Tipo de Solicitud: {infoMovEq.detalleMov.detalleMov[0].DescripTipoSol}</p>
                <p>{`Laboratotio: ${infoMovEq.detalleMov.labMov[0].labAnterior}`}</p>
                
                </div>
                ):null}
                <p>Información de la Solicitud:</p>
                {infoMovEq.detalleMov.detalleMov.map((valueDet)=>(  
                  <div><p>{valueDet.NombreEq}  motivo:   {valueDet.motivo}</p><input type='text' name={`${valueDet.CodSol}/${valueDet.idEq}`} onChange={handleChange} placeholder='Se realizo'/></div>
                )
                )}
              </div>
              <div><button className='enviar' onClick={handleSubmit}>Finalizar Solicitud</button></div>
        
        <button className="modal-close" onClick={onCloseAutorizarMovEqAd}>
          &#x2715;
        </button>
        {childrenAutorizarMovEqAd}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipoAlerta} sx={{ width: '100%' }}>
          {mensaje}
        </Alert>
      </Snackbar>
      </div>
    )
}
export default DetalleAtenderMantenimiento