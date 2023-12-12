import '../estilos/form.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuPro from './navMenu';
function NewTipoComponent({ isOpenC, onCloseC, childrenC }) {
  
  
  //const navigate = useNavigate();
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formData, setFormData] = useState({
    tipoComp: '',
  });

  // Función controladora para manejar los cambios en los campos
  const handleChangeComp = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/tipoComp/add',{
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
      //navigate('/motivo');
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };
  if (!isOpenC) {return null;}
  return (
    <div className="modal-overlay">
      <div className="modal">
      <form>
            <div>
          <h1>ITEM</h1>
        </div>
        <div className='fila'>
          <label htmlFor="comp">TIPO DE COMPONENTE:</label>
          <input type="text" id="tipoComp" name="tipoComp" onChange={handleChangeComp}/>
        </div>
        <button type="submit" onClick={handleSubmit}>REGISTRAR</button>
        </form>
        
        <button className="modal-close" onClick={onCloseC}>
          &#x2715;
        </button>
        {childrenC}

      </div>
    </div>
  );
}

export default NewTipoComponent;