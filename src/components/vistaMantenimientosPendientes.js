import React, { useState, useEffect } from 'react';
import PersistentDrawerLeft from './navMenu';
import AddMotivoSolicitud from './modalMotivoS';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import DetalleAtenderMantenimiento from './modalDetalleMantenimiento';

function TablaAtenderSolicitudes(){
  //detalle solicitud
  const [detalleMov, setDetalleMov] = useState([]);
const detalleMovEq = async(codD) => {
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const logear = await fetch('http://localhost:4000/get/detalle/solicitud/mantenimiento',{
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
};

//movimientos autorizados
 const [lMovimientosAutorizados, setLMovimientosAutorizados] = useState([]);

 const listaMovimientoAutorizados = async ()=>{
   try{
     // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
     const datos = await fetch('http://localhost:4000/get/mantenimiento/pendiente',{
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
         field: 'Solicitante',
         headerName: 'Nombre de Solicitante',
         width: '250',
       },
       {
         field: 'FechaSol',
         headerName: 'Fecha de Solicitud',
       },
       {
        field: 'FechaLimite',
        headerName: 'Fecha Limite',
      },
      {
        field: 'DescripTipoSol',
        headerName: 'Tipo de Solicitud',
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
               <button onClick={() => handleEditClick(params.row.id)}>Ver</button>
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
   
   
 
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    /*console.log(formData);
    console.log(formDataLabs);
    Object.entries(formData).map((valData)=>{
      let auxEn=valData[0].split('/')
      console.log(auxEn[1]);
    })*/
    
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/solicitar/movimiento/equipo/adicional',{
        method: 'POST',
        body: JSON.stringify({formData, codPer: storedUserData.usuario, formDataLabs}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      //console.log(respuesta);
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };

    return(
      <div className='contaniner-nav'>
    <PersistentDrawerLeft />
    <section className="container">
      <div className='solicitudes'>
          
        
      
      <Box sx={{ height: 400, width: '100%' }}>
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
    </Box>

    <div>
            <DetalleAtenderMantenimiento isOpenAutorizarMovEqAd={modalOpenAMovEq} onCloseAutorizarMovEqAd={handleCloseModalAMovEq} infoMovEq={{detalleMov}}>

            </DetalleAtenderMantenimiento>
            </div>
      <div>
        <AddMotivoSolicitud isOpenMs={modalOpenMotSoli} onCloseMs={handleCloseModalMs}>
        
        </AddMotivoSolicitud>
      </div>
      </div>
      </section>
      </div>
    )
}
export default TablaAtenderSolicitudes