import React, { useState, useEffect } from 'react';

function ListaEquipos() {
  //consulta
  const [opciones, setOpciones] = useState([]); // Variable para almacenar las opciones

  const combo = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/add/equipo',{
        
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      console.log(respuesta[0]);
      setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  useEffect(() => {
    combo();
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  

  //
  const [formData, setFormData] = useState([
    {
      nombreEq: '',
      codComp: '',
      codItem: '',
      valor: '',
    },
  ]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleAddFields = () => {
    setFormData([...formData, { nombreEq: '', codComp: '', codItem: '', valor: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí manejas el envío del formulario
    console.log(formData);
  };

  return (
    <div className='ContenedorEquipos'>
      {opciones.map((datos) => (
        <div className='col'>
          <button key={datos.NombreEq} value={datos.NombreEq}>
            {datos.NombreEq}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaEquipos;