import React from 'react';
import PDFGenerator from './componentePdf';
import { useState, useEffect } from 'react';
import '../estilos/login.css';
import PersistentDrawerLeft from './navMenu';

function ReporteTotal() {
    let arr=[];
    const [labs, setLabs] = useState([]); // Variable para almacenar las opciones

    const storedJsonString = localStorage.getItem('user');
    // Convertir la cadena JSON en un objeto
  const storedUserData = JSON.parse(storedJsonString);
  //console.log(storedUserData.usuario);
    
    let nomRep = storedUserData.usuario.nombre;
  //modal nuevo reporte
 const [modalOpenMar, setModalOpenMar] = useState(false);

 const handleOpenModalM = () => {
   setModalOpenMar(true);
 };
 
 const handleCloseModalM = () => {
   setModalOpenMar(false);
 };
 //

//
const selectLabs = async ()=>{
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const datos = await fetch('http://localhost:4000/labs/read',{
      
    })

    if (!datos.ok) {
      // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
      throw new Error('Error en la solicitud al servidor');
    }

    const respuesta = await datos.json();

      setLabs(respuesta); // Actualiza las opciones2 con los datos de la respuesta
    

    console.log(respuesta);
    //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
    //navigate('/motivo');
  }catch(error){
    //console.error('Error en la solicitud',error.message);
    alert('El Usuario no existe')
    //<Alerta>ALGO</Alerta>
  }
}

  //consulta
  const [opciones, setOpciones] = useState([]); // Variable para almacenar las opciones
  const [detalles, setDetalles] = useState([]);

  /* const combo = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/ver/reporteTotal',{
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta[0]);
      setLabs(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  } */
  useEffect(() => {
   // combo();
    selectLabs();
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
//opciones prueba
/* const elementosSeparados = {};

useEffect(()=>{
// Tu array original
const tuArray = [
    // ... los objetos de tu array aquí
  ];
  // Itera sobre el array original y agrupa los elementos por NombreEq
  opciones.forEach((elemento) => {
    const nombreEq = elemento.NombreEq;
    if (!elementosSeparados[nombreEq]) {
      elementosSeparados[nombreEq] = [];
    }
    elementosSeparados[nombreEq].push(elemento);
  });
  
  // Ahora elementosSeparados contendrá objetos separados por NombreEq
 
  //console.log(elementosSeparados);
  
},[opciones]) */

  // 
  

  const handleChangeSelect = async (e)=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/ver/reporteTotal',{
        method: 'POST',
        body: JSON.stringify({lab: e.target.value}),
        headers: { 'Content-Type': 'application/json' },
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      console.log(respuesta);
      if(e.target.value=="0"){
        setOpciones(respuesta[0]);
      }else{
        setOpciones(respuesta);
      }
       // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  //
  const [formData, setFormData] = useState([
    {
      NombreEq: '',
    },
  ]);

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const handleAddFields = () => {
    setFormData([...formData, { nombreEq: '', codComp: '', codItem: '', valor: '' }]);
  };
  //prueba
  
  //

  
  return (
    <div className='contaniner-nav'>
    <PersistentDrawerLeft />
    <section className="container">
        <h3>Generar PDF de Informe de Equipos por:</h3>
    <div className='col'>
            <div className='lb-imp'>
            <div className='lb-center'>
              <label>Seleccionar laboratorio</label></div>
              <select name='numLab' onChange={handleChangeSelect}>
                <option>Seleccionar</option>
                <option value="0">todo</option>
                {(labs.length > 0)?(labs.map((lb)=>(
                  <option key={lb.NroLab} value={lb.NroLab}>{lb.NroLab}</option>
                ))):null}
              </select>
              </div>
            </div>
    
      </section>
      <div className="ReportePdf">
      
        {(opciones.length > 0)?(
            <PDFGenerator info={opciones} nombre={nomRep}/>
        ):null}
      
    </div>
      </div>
    
  );
}

export default ReporteTotal;
