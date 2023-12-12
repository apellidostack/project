import React, { useState, useEffect } from 'react';


function AddMotivoSolicitud({ isOpenMs, onCloseMs, childrenMs }){
    const [formData, setFormData] = useState({
        motsoli: '',
      });
    
    
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
      };
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/motivosoli/add',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();
      console.log(formData);
      console.log(respuesta);
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };
  if (!isOpenMs) {return null;}
    return(
        <div className="modal-overlay">
            <div className="modal">
        <form>
            <div>
          <h1>FORM MOTIVO</h1>
        </div>
        <div className='fila'>
          <label htmlFor="user">MOTIVO:</label>
          <input type="text" id="motsoli" name="motsoli" onChange={handleChange}/>
        </div>
        <button type="submit" onClick={handleSubmit}>REGISTRAR</button>
        </form>
        
        <button className="modal-close" onClick={onCloseMs}>
          &#x2715;
        </button>
        {childrenMs}
      </div>
      </div>
    )
}
export default AddMotivoSolicitud