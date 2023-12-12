import '../estilos/login.css';
import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alerta from './alerta';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Formulario() {
  const navigate = useNavigate();
  //
  useEffect(()=>{
    if(localStorage.getItem('user')!=null){
      const storedJsonString = localStorage.getItem('user');
      // Convertir la cadena JSON en un objeto
    const storedUserData = JSON.parse(storedJsonString);
    if(storedUserData.usuario.DescripCar=='ENCARGADO'){
      navigate('/p');
    }else if(storedUserData.usuario.DescripCar=='RECTOR'){
      navigate('/autorizarMovimientoEq');
    }
    //console.log(storedUserData.usuario);
    }
  },[])
  
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formData, setFormData] = useState({
    nombre: '',
    password: '',
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
      const logear = await fetch('http://localhost:4000/api/languages',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();
      const jsonString = JSON.stringify(respuesta);

      // Guardar la cadena JSON en localStorage
      localStorage.setItem('user', jsonString);
      console.log(respuesta.usuario.CodPer);
      if(respuesta.usuario.DescripCar=='RECTOR'){
        navigate('/autorizarMovimientoEq');  
      }else if(respuesta.usuario.DescripCar=='ENCARGADO'){
        navigate('/p');
      }
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };

  return (
    <div className='ContenedorLogin'>
      <img src={logo}></img>
      <form className='form-login' onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>
        <div className='fila'>
        <TextField id="outlined-basic" label="Usuario" variant="outlined" name="nombre" onChange={handleChange}/>
          
        </div>
        <div className='fila'>
        <TextField id="outlined-basic" label="Password" type='password' variant="outlined" name="password" onChange={handleChange}/>
        </div>
        <button className='enviar' type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default Formulario;
