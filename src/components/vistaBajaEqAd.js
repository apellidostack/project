import React, { useState, useEffect } from 'react';
import PersistentDrawerLeft from './navMenu';
import AddMotivoBajaAdicional from './modalMotivoBajaAdicional';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EquiposAdicionalesParaDarBaja from './modalDetalleRealizarBajaAdicional';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SolicitarBajaAdicional(){

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
  //detalle solicitud
  const [detalleMov, setDetalleMov] = useState([]);
const detalleMovEq = async(codD) => {
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const logear = await fetch('http://localhost:4000/detalle/baja/equipo/adicional',{
      method: 'POST',
      body: JSON.stringify({cod: codD}),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!logear.ok) {
      // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
      throw new Error('Error en la solicitud al servidor');
    }

    const respuesta = await logear.json();
    //console.log(respuesta);
    setDetalleMov(respuesta);
    
  }catch(error){
    //console.error('Error en la solicitud',error.message);
    alert('El Usuario no existe')
    //<Alerta>ALGO</Alerta>
  }
};
//buscar solucion
useEffect(() => {
    //console.log(detalleMov);
    handleOpenModalAMovEq();
  
}, [detalleMov]);

  
  //modal registro de personal
  const [modalOpenAMovEq, setModalOpenAMovEq] = useState(false);

  const handleOpenModalAMovEq = () => {
  //e.preventDefault();
  setModalOpenAMovEq(true);
  };

  const handleCloseModalAMovEq = () => {
    setModalOpenAMovEq(false);
  listaMovimientoAutorizados();
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
  selectMotivos();
};

//movimientos autorizados
 const [lMovimientosAutorizados, setLMovimientosAutorizados] = useState([]);

 const listaMovimientoAutorizados = async ()=>{
   try{
     // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
     const datos = await fetch('http://localhost:4000/baja/equipos/adicionales/autorizadas',{
     })
     

     if (!datos.ok) {
       // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
       throw new Error('Error en la solicitud al servidor');
     }

     const respuesta =await datos.json();

     //console.log(respuesta[0]);
     setLMovimientosAutorizados(respuesta); // Actualiza las opciones con los datos de la respuesta
     //navigate('/motivo');
   }catch(error){
     //console.error('Error en la solicitud',error.message);
     alert('El Usuario no existe')
     //<Alerta>ALGO</Alerta>
   }
 }
 useEffect(() => {
   listaMovimientoAutorizados();
   
 }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
 useEffect(()=>{
   console.log(lMovimientosAutorizados);
 },[lMovimientosAutorizados])

     //
     const columns = [
       {
         field: 'id',
         headerName: 'Código',
       },
       {
         field: 'Autorizador',
         headerName: 'Nombre',
         width: '250',
       },
       {
         field: 'Estado',
         headerName: 'Estado',
       },
         {
           field: 'actions',
           headerName: 'Acciones',
           sortable: false,
           width: 150,
           renderCell: (params) => (
             <div>
               <button onClick={() => handleEditClick(params.row.id)}>Editar</button>
               <button onClick={() => handleDeleteClick(params.row.id)}>Borrar</button>
             </div>
           ),
         },
         
     ];
     
     const handleEditClick = (id) => {
      detalleMovEq(id);
       // Lógica para manejar el botón de edición
       console.log(`Botón de edición clickeado para el ID ${id}`);
     };
   
     const handleDeleteClick = (id) => {
       // Lógica para manejar el botón de eliminación
       console.log(`Botón de eliminación clickeado para el ID ${id}`);
     };  


//

    const [formData, setFormData] = useState({});
    const [formDataLabs, setFormDataLabs] = useState({});
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
    const [motivos, setMotivos] = useState([]); // Variable para almacenar las opciones


  const selectMotivos = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/motivo/baja/adicional',{
        
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
  }

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
    selectMotivos();
    selectTipoSol();
  },[])
    //cargar quipos disponibles para solicitudes
    const [equipos, setEquipos] = useState([]);

    const handleChangeSelect=async(e)=>{
      handleChangeLab(e);
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const logear = await fetch('http://localhost:4000/get/equipos/adicionales/disponibles/baja',{
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
        //console.log(respuesta);
        
      }catch(error){
        //console.error('Error en la solicitud',error.message);
        alert('El Usuario no existe')
        //<Alerta>ALGO</Alerta>
      }
    };

    //aqui tambien los clicados
    const [clicados, setClicados] = useState({});

  const handleClick = (eq) => {
    if (clicados[eq.CodEquipoAd]) {
      const { [eq.CodEquipoAd]: omit, ...nuevosClicados } = clicados;
      setClicados(nuevosClicados);
      const { [`${eq.idEqAd}/${eq.CodEquipoAd}`]: nc, ...nuevoseqclic } = formData;
      setFormData(nuevoseqclic)
    } else {
      const nuevosClicados = { ...clicados, [eq.CodEquipoAd]: eq.idEqAd };
      setClicados(nuevosClicados);
    }
  };

  //lab destino
  const [auxLabDestino, setAuxLabDestino] = useState('');

  const renderInput = (eq) => {
    if (clicados[eq.CodEquipoAd]) {
        let nomAux = eq.CodEquipoAd;
        let nomSeparado = nomAux.split('-');
      return (
        <>
        <label>{`${nomSeparado[0]}-${auxLabDestino}-`}</label>
        <input
          type="text"
          name={`${eq.idEqAd}/${eq.CodEquipoAd}`}
          placeholder={`Input para ${eq.CodEquipoAd}`}
          onChange={handleChange}
        />
        </>
      );
    }
    return null;
  };
    // click en los equipos
    
    useEffect(()=>{
      console.log(clicados);
    },[clicados])
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        const { name, value } = event.target;
        // Actualizar los valores de los inputs en el estado inputValues.
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
      // Función controladora para manejar los cambios en los labs
      const handleChangeLab = (event) => {
        const { name, value } = event.target;
        setAuxLabDestino(value);
        // Actualizar los valores de los inputs en el estado inputValues.
        setFormDataLabs((prevFormDataLabs) => ({
          ...prevFormDataLabs,
          [name]: value,
        }));
      };

    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(clicados);
    /*console.log(formDataLabs);
    Object.entries(formData).map((valData)=>{
      let auxEn=valData[0].split('/')
      console.log(auxEn[1]);
    })*/
    
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/solicitar/baja/equipo/adicional',{
        method: 'POST',
        body: JSON.stringify({clicados, codPer: storedUserData.usuario, formDataLabs}),
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
            <div><h1>Solicitar Baja de Equipo Adicional</h1></div>
            <div className='col'>
            <div className='lb-imp'>
            <div className='lb-center'>
              <label>Seleccionar laboratorio</label></div>
              <select name='numLab' onChange={handleChangeSelect}>
                <option value="0">Seleccionar</option>
                {(labs.length > 0)?(labs.map((lb)=>(
                  <option key={lb.NroLab} value={lb.NroLab}>{lb.GrupoTrabajo}</option>
                ))):null}
              </select>
              </div>
            </div>
          
            <div className='col'>
            <div className='lb-imp'>
            <div className='lb-center'>
              <label>Motivo</label></div>
              <select name='motivo' onChange={handleChangeLab}>
                <option value="0">Seleccionar</option>
                {(motivos.length > 0)?(motivos.map((lb)=>(
                  <option key={lb.CodMot} value={lb.CodMot}>{lb.DescripMot}</option>
                ))):null}
              </select>
              <button onClick={handleOpenModalMs}>+</button>
              </div>
            </div>

        </div>
        <div>Seleccione los equipos que se incluyen en su solicitud</div>
        <div className='container-cards'>
      {equipos.length > 0 ? (
        equipos.map((eq) => (
          <div className={`card ${clicados[eq.CodEquipoAd] ? 'clicado' : ''}`}>
          <div
            
            onClick={() => handleClick(eq)}
            id={eq.idEqAd}
            key={eq.idEqAd}
          >
            {eq.CodEquipoAd}
            
          </div>
          {/* {renderInput(eq)} */}
          </div>
        ))
      ) : null}
    </div>
      <div>
      <button onClick={handleSubmit}>Realizar solicitud</button>
      </div>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <div><h3>Tabla Bajas Autorizadas</h3></div>
      {lMovimientosAutorizados.length === 0 ? (
        <div>No rows</div>
      ) : (
      <DataGrid
        rows={lMovimientosAutorizados}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      )}
    </Box>

    <div>
            <EquiposAdicionalesParaDarBaja isOpenAutorizarMovEq={modalOpenAMovEq} onCloseAutorizarMovEq={handleCloseModalAMovEq} infoMovEq={{detalleMov}}>

            </EquiposAdicionalesParaDarBaja>
            </div>
      <div>
        <AddMotivoBajaAdicional isOpenMs={modalOpenMotSoli} onCloseMs={handleCloseModalMs}>
        
        </AddMotivoBajaAdicional>
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
export default SolicitarBajaAdicional