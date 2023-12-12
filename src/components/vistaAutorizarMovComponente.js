import React, { useState, useEffect } from 'react';
import AddCargo from './cargo';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PersistentDrawerLeft from './navMenu';

import AutorizarMovComponente from './modalDetalleMovComponente';


//
function TablaAutorizarMovComp(){
  //detalle
  const [detalleMov, setDetalleMov] = useState([]);
const detalleMovEq = async(codD) => {
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const logear = await fetch('http://localhost:4000/detalle/movimiento/componente',{
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
  listaSolicitudes();
  };
  //
    //modal
    const [modalOpenPer, setModalOpenPer] = useState(false);

    const handleOpenModalP = (e) => {
    e.preventDefault();
    setModalOpenPer(true);
    };

    const handleCloseModalP = () => {
    setModalOpenPer(false);
    };
    //

    const [formData, setFormData] = useState({
        item: '',
      });
    
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
      };
//detalle movimiento equipo


      //datos de personal
      const [lSolicitudesMovComp, setLSolicitudesMovComp] = useState([]);

  const listaSolicitudes = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/solicitudes/pendientes/movimiento/componente',{
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta[0]);
      setLSolicitudesMovComp(respuesta); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  useEffect(() => {
    listaSolicitudes();
    
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  useEffect(()=>{
    console.log(lSolicitudesMovComp);
  },[lSolicitudesMovComp])

      //
      //
     const columns = [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'Ejecutor',
        headerName: 'Nombre de Solicitante',
        width: '250',
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

      
  

  

    return(
    <div className='contaniner-nav'>
      <PersistentDrawerLeft />
      <section className="container">
        <div className='tabla'>
        <div>
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={lSolicitudesMovComp}
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
        </div>
        <AddCargo isOpenCargo={modalOpenPer} onCloseCargo={handleCloseModalP}>
            
          </AddCargo>
          <div>
            <AutorizarMovComponente isOpenAutorizarMovEqAd={modalOpenAMovEq} onCloseAutorizarMovEqAd={handleCloseModalAMovEq} infoMovEq={{detalleMov}}>

            </AutorizarMovComponente>
            </div>
        </div>
      </section>
    </div>
  
    )
}
export default TablaAutorizarMovComp