import React, { useState, useEffect } from 'react';


function AddTipoEqAd({ isOpenTEAD, onCloseTEAD, childrenTEAD }){
    const [formData, setFormData] = useState({
        descripTipoAd: '',
      });
    if (!isOpenTEAD) {return null;}
    
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
      };
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/tipoEqAd/set',{
        method: 'POST',
        body: JSON.stringify(formData),
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
        <form>
            <div>
          <h1>AGREGAR TIPO DE EQUIPO ADICIONAL</h1>
        </div>
        <div className='fila'>
          <label htmlFor="user">DESCRIPCION:</label>
          <input type="text" id="descripTipoAd" name="descripTipoAd" onChange={handleChange}/>
        </div>
        <button className='enviar' type="submit" onClick={handleSubmit}>REGISTRAR</button>
        </form>
        
        <button className="modal-close" onClick={onCloseTEAD}>
          &#x2715;
        </button>
        {childrenTEAD}
      </div>
      </div>
    )
}
export default AddTipoEqAd