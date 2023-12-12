import React, { useState, useEffect } from 'react';


function AutorizarMovComponente({ isOpenAutorizarMovEqAd, onCloseAutorizarMovEqAd, childrenAutorizarMovEqAd, infoMovEq}){


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
      const logear = await fetch('http://localhost:4000/autorizar/movimiento/componentes',{
        method: 'PUT',
        body: JSON.stringify({autorizar: event.target.value, codPer: storedUserData.usuario}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      console.log(respuesta);
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };

    return(
        <div className="modal-overlay">
            <div className="modal">
              
              <div>
                <h2>Solicitud de movimiento de componente</h2>
                {(infoMovEq.detalleMov && typeof infoMovEq.detalleMov === 'object' && infoMovEq.detalleMov.personalMov && infoMovEq.detalleMov.personalMov[0]&&infoMovEq.detalleMov.labMov[0])?(
                <div className='container-cards'>
                <p>Nombre de solicitante: {infoMovEq.detalleMov.personalMov[0].nombre}</p>
                <p>Fecha de solicitud: {infoMovEq.detalleMov.labMov[0].FechaSol}</p>
                <p>{`Se solicita movimiento de componentes de laboratorio: ${infoMovEq.detalleMov.detalleMov[0].labAnteriorC+' al laboratorio: '+infoMovEq.detalleMov.detalleMov[0].labPosteriorC} `}</p>
                
                </div>
                ):null}
                <p>Equipos incluidos en la solicitud:</p>
                {infoMovEq.detalleMov.detalleMov.map((valueDet)=>(  
                  <div>{valueDet.CodComp}  se movera a  {valueDet.equipoNuevo}</div>
                )
                )}
              </div>
              <div><button className='enviar2' value={`${infoMovEq.detalleMov.detalleMov[0].CodMovEqComp}/autorizada`} onClick={handleSubmit}>Autorizar</button><button className='enviar2' value={`${infoMovEq.detalleMov.detalleMov[0].CodMovEqComp}/rechazada`} onClick={handleSubmit}>Rechazar</button></div>
        
        <button className="modal-close" onClick={onCloseAutorizarMovEqAd}>
          &#x2715;
        </button>
        {childrenAutorizarMovEqAd}
      </div>
      </div>
    )
}
export default AutorizarMovComponente