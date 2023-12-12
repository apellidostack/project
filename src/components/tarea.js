import '../estilos/login.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Motivo() {
  const navigate = useNavigate();
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formData, setFormData] = useState({
    motivo: '',
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
      const logear = await fetch('http://localhost:4000/Solicitud/motivo',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      //console.log(respuesta[0][0].DescripCar);
      alert('Motivo de solicitud registrada');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };

  return (
    <div className='ContenedorLogin'>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>
        <div className='fila'>
          <label htmlFor="Tarea">Motivo:</label>
          <input type="text" id="motivo" name="motivo" onChange={handleChange}/>
        </div>
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
}

export default Motivo;