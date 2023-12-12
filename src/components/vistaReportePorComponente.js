import React from 'react';
import PDFReportePorComponente from './reportePDFporComponente';
import { useState, useEffect } from 'react';
import '../estilos/login.css';
import PersistentDrawerLeft from './navMenu';

function ReportePorComponente() {
    let arr=[];

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
//comp
const [opciones2, setOpciones2] = useState([]); // Variable para almacenar las opciones2

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
    //console.log(respuesta);
    if (Array.isArray(Object.values(respuesta))) {
      setOpciones2(respuesta); // Actualiza las opciones2 con los datos de la respuesta
    } else {
      console.error('La respuesta no contiene un array de opciones.xd');
      setOpciones2({});
    }
    //
    //console.log(respuesta[0]);
    //setopciones2(respuesta[0]); // Actualiza las opciones2 con los datos de la respuesta
    //navigate('/motivo');
  }catch(error){
    //console.error('Error en la solicitud',error.message);
    alert('El Usuario no existe')
    //<Alerta>ALGO</Alerta>
  }
}

//labs
 const [labs, setLabs] = useState([]); // Variable para almacenar las opciones


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
//
useEffect(()=>{
    selectLabs();
    comboComp();
},[])

  //consultar por lab xd
  //cargar quipos disponibles para solicitudes
  //const [equipos, setEquipos] = useState([]);

  


  //consulta
  const [opciones, setOpciones] = useState([]); // Variable para almacenar las opciones
  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/reporte/por/componente',{
        method: 'POST',
        body: JSON.stringify({formData}),
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
  

/* useEffect(()=>{
// Tu array original
const tuArray = [
    // ... los objetos de tu array aquí
  ];
  
  // Objeto para almacenar los elementos separados por NombreEq
  
  
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
  
},[opciones])
 */
  // 
  const [formData, setFormData] = useState([
    {
      codTipoComp: '',
      lab: '',
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
        <form onSubmit={handleSubmit}>
        <div className='row-grid'>
        <h3>Generar Informe por Componente</h3>
    <div className='col'>
            <div className='lb-imp'>
            <div className='lb-center'>
              <label>Seleccionar laboratorio</label></div>
              <select required name='lab' onChange={handleChange}>
              <option value="">Seleccionar</option>
                <option value="0">Todo</option>
                {(labs.length > 0)?(labs.map((lb)=>(
                  <option key={lb.NroLab} value={lb.NroLab}>{lb.NroLab}</option>
                ))):null}
              </select>
              </div>
            </div>
          <div className='col'>
          <div className='lb-imp'>
          <div className='lb-center'>
          <label className="input-group-text">Seleccionar Componente</label></div>
            <select required className='form-select form-select-lg mb-3'  id='codTipoComp' name='codTipoComp' onChange={handleChange} >
            <option value="">Seleccionar</option>
              {(opciones2.length>0)? (opciones2.map((datos) => (
                <option key={datos.CodTipoComp} value={datos.CodTipoComp}>
                  {datos.DescripCo}
                </option>
              ))):null}
            </select>
          </div>
          </div>

        </div>
        <button>Generar Informe</button>
        </form>
      </section>
      <div className="ReportePdf">
      
        {(opciones.length > 0)?(
            <PDFReportePorComponente info={opciones} nombre={nomRep}/>
        ):null}
      
    </div>
      </div>

  );
}

export default ReportePorComponente;
