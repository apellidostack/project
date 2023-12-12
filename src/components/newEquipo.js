import '../estilos/form.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DetalleItem from './detalleItem';

function Equipo() {
  const navigate = useNavigate();

  const [opciones, setOpciones] = useState([]); // Variable para almacenar las opciones


  const combo = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/labs/read',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      console.log(respuesta[0]);
      setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }

  //comp
  const [opciones2, setopciones2] = useState([]); // Variable para almacenar las opciones2

  const comboComp = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/tipoComp/read',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      console.log(respuesta[0]);
      setopciones2(respuesta[0]); // Actualiza las opciones2 con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }


  useEffect(() => {
    combo();
    comboComp();
    // Esta función se ejecutará al cargar o entrar en la ruta correspondiente
    //console.log('Formulario cargado o ruta accedida');
    
    // Puedes realizar otras acciones aquí si lo necesitas
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  
  //const navigate = useNavigate();
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formData, setFormData] = useState({
    codComp: '',
    codTipoComp: '',
  });
  //comp
  
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formEq, setformEq] = useState({
    nombreEq: '',
    ip: '',
    mac: '',
    lab: '',
  });

  // Función controladora para manejar los cambios en los campos
  const handleChange = (event) => {
    setformEq({...formEq, [event.target.name]: event.target.value});

  };

  //comp
  // y
 const [compCount, setCompCount] = useState(1);
 const [selectedComps, setSelectedComps] = useState({});
  
  
  

  //crear elementos
  const [elements, setElements] = useState([]);
  const [x, setX] = useState(1);
  const [inputValues, setInputValues] = useState({});

  const createElement = (event) => {
    let newElement;
    let boton;
    let labelr;
    //setCodComp
    const { name, value } = event.target;

    setSelectedComps((prevSelectedComps) => ({
      ...prevSelectedComps,
      [`codComp${compCount}`]: value,
    }));

    setCompCount(compCount + 1);
    //

    labelr = React.createElement('label', {
      key: Date.now(),
      children: `Nuevo ${event.target[event.target.selectedIndex].text}`,
    });

    newElement = React.createElement('input', {
      name: `valor${x}`,
      key: Date.now(),
      type: 'text',
      onChange: handleInputChange,
    });

    boton = <button name={event.target.value}>ITEM</button>

    setX(x + 1);

    setElements((prevElements) => [...prevElements, labelr, newElement, boton]);
  };

  // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    let i = 1;
    let newInputValues = {};

    while (i < x) {
      const inputName = `valor${i}`;
      const codC=`codComp${i}`;
    //newInputValues[inputName] = [inputValues[inputName],selectedItems[codI]] || '';
    newInputValues[inputName] = [inputValues[inputName],selectedComps[codC]] || '';
      i++;
    }
    console.log(formEq);
    console.log(newInputValues);
    /*try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/add/equipo',{
        method: 'POST',
        body: JSON.stringify(formEq),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      console.log(respuesta[0]);
      //alert('Motivo de solicitud registrada');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }*/
  };

   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  return (
    <div className='container-form'>
    <div className='newEquipo'>
      <form className='form-container' onSubmit={handleSubmit}>
        
        <div className='fila'>
          <h1>Registro de Equipo</h1>
        </div>
        <div className='grid'>
        <div className='fila'>
          <label htmlFor="nombreEq">Nombre:</label>
          <input type="text" id="nombreEq" name="nombreEq" onChange={handleChange}/>
        </div>
        <div className='fila'>
          <label htmlFor="lab">Laboratorio:</label>
          <select value={formEq.lab} id='lab' name='lab' onChange={handleChange}>
            {/* Mapea las opciones dinámicas para crear las opciones del select */}
            <option value="0">Seleccionar</option>
            {opciones.map((datos) => (
              <option key={datos.NroLab} value={datos.NroLab}>
                {datos.GrupoTrabajo}
              </option>
            ))}
          </select>
        </div>
        <div className='fila'>
          <label htmlFor="ip">Dirección IP:</label>
          <input type="text" id="ip" name="ip" onChange={handleChange}/>
        </div>
        <div className='fila'>
          <label htmlFor="mac">Dirección MAC:</label>
          <input type="text" id="mac" name="mac" onChange={handleChange}/>
        </div>
        
        
        </div>
        <div className='fila'>
        <div className='fila'>
          <label>Nombre de Equipo:</label>
          <select id='codTipoComp' name='codTipoComp' onChange={createElement} >
            <option value="0">Seleccionar</option>
            {opciones2.map((datos) => (
              <option key={datos.CodTipoComp} value={datos.CodTipoComp}>
                {datos.DescripCo}
              </option>
            ))}
          </select>
        </div>
        <div className='componentes'>
        {elements.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
        </div>
            
      </div>

        <button type="submit">Crear Tarea</button>
      </form>
    </div>
    <div>
      <DetalleItem></DetalleItem>
    </div>
    </div>
  );
}

export default Equipo;