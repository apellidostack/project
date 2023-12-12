import React from 'react';
import PDFGeneratorHistorialMovEq from './historialPDFMovEq';
import { useState, useEffect } from 'react';
import '../estilos/login.css';

function ReporteHistoricoEq(props) {
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
  //consulta
  const [opciones, setOpciones] = useState([]); // Variable para almacenar las opciones
  const [detalles, setDetalles] = useState([]);

  const combo = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/historico/movimiento',{
        method: 'POST',
        body: JSON.stringify({cod: props.info}),
        headers: { 'Content-Type': 'application/json' },
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta);
      setOpciones(respuesta); // Actualiza las opciones con los datos de la respuesta
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
//opciones prueba
const elementosSeparados = {};

useEffect(()=>{
// Tu array original
//console.log(opciones.resultAnterior[0]);
const tuArray = [
    // ... los objetos de tu array aquí
  ];
  
  // Objeto para almacenar los elementos separados por NombreEq
  
  
  // Itera sobre el array original y agrupa los elementos por NombreEq
  
  
  // Ahora elementosSeparados contendrá objetos separados por NombreEq
 
  //console.log(elementosSeparados);
  
},[opciones])

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
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/get/historico/movimiento',{
        method: 'POST',
        body: JSON.stringify({cod: event.target.value}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();
      console.log(respuesta[0])
      setDetalles(respuesta[0]);
      handleOpenModalM();
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('Error en la solicitud'+error.message)
      //<Alerta>ALGO</Alerta>
    }
    //console.log(jsonData)
    //console.log(detalles);
    //alert('Equipo seleccionado:'+ equipoSeleccionado);
    // Aquí puedes realizar cualquier acción adicional con el equipo seleccionado
//CAMBIAR EL ENVIO DE COD XD
  };
  //

  
  return (
    <div className="ReportePdf">
      
        {(Object.values(opciones).length > 0)?(
            <PDFGeneratorHistorialMovEq info={opciones} nombre={nomRep}/>
        ):null}
      
    </div>
  );
}

export default ReporteHistoricoEq;
