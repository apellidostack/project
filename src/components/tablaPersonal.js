import React, { useState, useEffect } from 'react';
import AddCargo from './cargo';
import RegistrarPersonal from './personal';

import { format } from 'date-fns';


import PersistentDrawerLeft from './navMenu';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ActualizarPersonal from './modalEditarPersonal';


//
function TablaPersonal(){

  //modal editar de personal
  const [modalOpenEditarPer, setModalOpenEditarPer] = useState(false);

  const handleOpenModalEditarPer = (id) => {
    handleSubmit(id)
  setModalOpenEditarPer(true);
  };

  const handleCloseModalEditarPer = () => {
    setModalOpenEditarPer(false);
  listaPersonal();
  };
  
  //modal registro de personal
  const [modalOpenRegisPer, setModalOpenRegisPer] = useState(false);

  const handleOpenModalRegisPer = (e) => {
  e.preventDefault();
  setModalOpenRegisPer(true);
  };

  const handleCloseModalRegisPer = () => {
    setModalOpenRegisPer(false);
  listaPersonal();
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

      //datos de personal
      const [lPersonal, setLPersonal] = useState([]);

  const listaPersonal = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/personal',{
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta[0]);
      setLPersonal(respuesta); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  useEffect(() => {
    listaPersonal();
    
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  useEffect(()=>{
    console.log(lPersonal);
  },[lPersonal])

      //
      const columns = [
        {
          field: 'id',
          headerName: 'Código',
          width: '150',
        },
        {
          field: 'Nombre',
          headerName: 'Nombre',
          width: '120',
        },
        {
          field: 'Paterno',
          headerName: 'Paterno',
          width: '120',
        },
        {
          field: 'Materno',
            headerName: 'Materno',
            width: '120',
          },
          {
            field: 'FechaIng',
            headerName: 'Fecha de Ingreso',
            width: '150',
            renderCell: (params) => (
              <div>
                {format(new Date(params.row.FechaIng), 'dd/MM/yyyy')} {/* Formatea la fecha aquí */}
              </div>
            ),
          },
          {
            field: 'Dir',
            headerName: 'Dirección',
            width: '120',
            renderCell: (params) => (
              <div style={{ maxHeight: '100px', overflowY: 'auto'}}>
                {params.row.Dir}
              </div>
            ),
          },
          {
            field: 'Telf',
            headerName: 'Teléfono',
          },
          {
            field: 'Email',
            headerName: 'Correo',
            renderCell: (params) => (
              <div style={{ maxHeight: '100px', overflowY: 'auto'}}>
                {params.row.Email}
              </div>
            ),
          },
          {
            field: 'DescripCar',
            headerName: 'Cargo',
            renderCell: (params) => (
              <div style={{ maxHeight: '100px', overflowY: 'auto'}}>
                {params.row.DescripCar}
              </div>
            ),
          },
          {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 150,
            renderCell: (params) => (
              <div>
                <button className='enviar2' onClick={() => handleEditClick(params.row.id)}>Editar</button>
                <button className='enviar2' onClick={() => handleDeleteClick(params.row.id)}>Borrar</button>
              </div>
            ),
          },
          
      ];
      
      const handleEditClick = (id) => {
        // Lógica para manejar el botón de edición
        handleOpenModalEditarPer(id);
        console.log(`Botón de edición clickeado para el ID ${id}`);
      };
    
      const handleDeleteClick = (id) => {
        // Lógica para manejar el botón de eliminación
        console.log(`Botón de eliminación clickeado para el ID ${id}`);
      };  


      //datos de personal
      const [datosPer, setDatosPer] = useState([]);

      const handleSubmit = async(id) => {
        //event.preventDefault();
        try{
          // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
          const logear = await fetch('http://localhost:4000/editar/personal',{
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: { 'Content-Type': 'application/json' },
          })
      
          if (!logear.ok) {
            // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
            throw new Error('Error en la solicitud al servidor');
          }
      
          const respuesta = await logear.json();
      //console.log(respuesta[0]);
          setDatosPer(respuesta[0]);
          
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
        <div className='tabla'>
          <button className='enviar2' onClick={handleOpenModalRegisPer}>Registrar Personal</button>
        <div>
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={lPersonal}
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
            <RegistrarPersonal isOpenPersonal={modalOpenRegisPer} onClosePersonal={handleCloseModalRegisPer}>

            </RegistrarPersonal>
            </div>

            
            <ActualizarPersonal isOpenPersonal={modalOpenEditarPer} onClosePersonal={handleCloseModalEditarPer} datosP={datosPer}>

            </ActualizarPersonal>
            
        </div>
      </section>
    </div>
  
    )
}
export default TablaPersonal