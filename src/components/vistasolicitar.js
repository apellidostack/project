import React, { useState, useEffect } from 'react';
import Cabecera from '../cabecera';
import PersistentDrawerLeft from './navMenu';
import AddMotivoSolicitud from './modalMotivoS';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Solicitar(){
  const [open, setOpen] = React.useState(false);
  const [tipoAlerta, setTipoAlerta] = React.useState('');
  const [mensaje, setMensaje] = React.useState('');

  const handleClickAlerta = (valAl) => {
    setTipoAlerta(valAl)
    console.log(valAl);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if(tipoAlerta=="success"){
      window.location.reload();
    }
    setOpen(false);
  };
  
//modal motivo solicitud
const [modalOpenMotSoli, setModalOpenMotSoli] = useState(false);

  const storedJsonString = localStorage.getItem('user');
  // Convertir la cadena JSON en un objeto
const storedUserData = JSON.parse(storedJsonString);

//modal motivo de solicitud
const handleOpenModalMs = (e) => {
  e.preventDefault();
  setModalOpenMotSoli(true);
};

const handleCloseModalMs = () => {
  setModalOpenMotSoli(false);
  
};
//

    const [formData, setFormData] = useState({});
    const [enviarTipoSol, setEnviarTipoSol] = useState();
    
    //
    const [eqSeleccionado, setModalOpen] = useState(false);
    //cargar labs
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

    //cargar Motivo
    /* const [motivos, setMotivos] = useState([]); // Variable para almacenar las opciones


  const selectMotivos = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/motivo',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

        setMotivos(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      

      console.log(respuesta);
      //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  } */

  //cargar tipo solicitud
  const [tipoSol, setTipoSol] = useState([]); // Variable para almacenar las opciones


  const selectTipoSol = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/tiposol',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      setTipoSol(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      

      console.log(respuesta);
      //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  } 

  useEffect(()=>{
    selectLabs();
    //selectMotivos();
    selectTipoSol();
  },[])
    //cargar quipos disponibles para solicitudes
    const [equipos, setEquipos] = useState([]);

    const handleChangeSelect=async(e)=>{
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const logear = await fetch('http://localhost:4000/equipos/validos/solicitud',{
          method: 'POST',
          body: JSON.stringify({lab: e.target.value}),
          headers: { 'Content-Type': 'application/json' },
        })
  
        if (!logear.ok) {
          // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
          throw new Error('Error en la solicitud al servidor');
        }
  
        const respuesta = await logear.json();
        setEquipos(respuesta);
        console.log(respuesta);
        
      }catch(error){
        //console.error('Error en la solicitud',error.message);
        alert('El Usuario no existe')
        //<Alerta>ALGO</Alerta>
      }
    };

    
      // click en los equipos
      
      
        // Función controladora para manejar los cambios en los campos
        
//aqui tambien los clicados
const [clicados, setClicados] = useState({});

const handleClick = (eq) => {
  if (clicados[eq.NombreEq]) {
    const { [eq.NombreEq]: omit, ...nuevosClicados } = clicados;
    setClicados(nuevosClicados);
    const { [`${eq.idEq}/${eq.NombreEq}`]: nc, ...nuevoseqclic } = formData;
    setFormData(nuevoseqclic)
  } else {
    const nuevosClicados = { ...clicados, [eq.NombreEq]: eq.idEq };
    setClicados(nuevosClicados);
  }
};

const renderInput = (eq) => {
  if (clicados[eq.NombreEq]) {
    return (
      <label>Motivo de Solicitud
        <input
        type="text"
        name={`${eq.idEq}/${eq.NombreEq}`}
        placeholder={`Ingresar Motivo`}
        onChange={handleChange}
      />
      </label>
      
    );
  }
  return null;
};



    // Función controladora para manejar los cambios en los campos
    const handleChange = (event) => {
      const { name, value } = event.target;
      // Actualizar los valores de los inputs en el estado inputValues.
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    // Función controladora para manejar los cambios en los tipo sol
    const handleChangeTip = (event) => {
      const { name, value } = event.target;
      // Actualizar los valores de los inputs en el estado inputValues.
      setEnviarTipoSol(value);
    };
    
  
    // click en los equipos
    
    useEffect(()=>{
      console.log(clicados);
    },[clicados])
      // Función controladora para manejar los cambios en los campos
      
    //
    
      // Función controladora para manejar los cambios en los campos
      
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/set/solicitud',{
        method: 'POST',
        body: JSON.stringify({formData, codPer: storedUserData.usuario,tipo: enviarTipoSol}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      setMensaje('Registrado Correctamente');
      //console.log(respuesta);
      handleClickAlerta('success');
      //console.log(respuesta);
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      setMensaje(error.message)
      handleClickAlerta('error');
      //<Alerta>ALGO</Alerta>
    }
  };

    return(
      <div className='contaniner-nav'>
    <PersistentDrawerLeft />
    <section className="container">
      <div className='solicitudes'>
          <div className='row-grid'>
            <div><h1>Solicitudes de Mantenimiento</h1></div>
            <div className='col'>
            <div className='lb-imp'>
            <div className='lb-center'>
              <label>Seleccionar laboratorio</label></div>
              <select name='numLab' onChange={handleChangeSelect}>
                <option value="0">Seleccionar</option>
                {(labs.length > 0)?(labs.map((lb)=>(
                  <option key={lb.NroLab} value={lb.NroLab}>{lb.NroLab}</option>
                ))):null}
              </select>
              </div>
            </div>
          
        {/* <div className='col'>
        <div className='lb-imp'>
            <div className='lb-center'>
          <label>Motivo</label></div>
          <select name='motivo' onChange={handleChange}>
            <option value="0">Seleccionar</option>
            {(motivos.length > 0)?(motivos.map((mot)=>(
              <option key={mot.CodMotivo} value={mot.CodMotivo}>{mot.DescripMotivo}</option>
            ))):null}
          </select>
        
        
          <button onClick={handleOpenModalMs}>+</button>
        </div>
        </div> */}

        <div className='col'>
        <div className='lb-imp'>
            <div className='lb-center'>
          <label>Tipo de solicitud</label></div>
          <select name='tiposol' onChange={handleChangeTip}>
            <option value="0">Seleccionar</option>
            {(tipoSol.length > 0)?(tipoSol.map((tsol)=>(
              <option key={tsol.CodTipoSol} value={tsol.CodTipoSol}>{tsol.DescripTipoSol}</option>
            ))):null}
          </select>
        </div>
        </div>
        </div>
        <div>Seleccione los equipos que se incluyen en su solicitud</div>
        <div className='container-cards'>
      {equipos.length > 0 ? (
        equipos.map((eq) => (
          <div className={`card ${clicados[eq.NombreEq] ? 'clicado' : ''}`}>
          <div
            
            onClick={() => handleClick(eq)}
            id={eq.idEq}
            key={eq.NombreEq}
          >
            {eq.NombreEq}
            
          </div>
          {renderInput(eq)}
          </div>
        ))
      ) : null}
    </div>
      <button className='enviar' onClick={handleSubmit}>Realizar solicitud</button>
     
      <div>
        <AddMotivoSolicitud isOpenMs={modalOpenMotSoli} onCloseMs={handleCloseModalMs}>
        
        </AddMotivoSolicitud>
      </div>
      
      </div>
      
      </section>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipoAlerta} sx={{ width: '100%' }}>
          {mensaje}
        </Alert>
      </Snackbar>
      </div>
    )
}
export default Solicitar