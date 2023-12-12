import React, { useState, useEffect } from 'react';

import PersistentDrawerLeft from './navMenu';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PDFGeneratorHistorialMovEq from './historialPDFMovEq';

import { format } from 'date-fns';

//
function TablaHistorialMovimientos(){
  const storedJsonString = localStorage.getItem('user');
    // Convertir la cadena JSON en un objeto
  const storedUserData = JSON.parse(storedJsonString);
  //console.log(storedUserData.usuario);
    
    let nomRep = storedUserData.usuario.nombre;
  
  //modal registro de personal
  

 
    //

    const [formData, setFormData] = useState('');
    
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
      };

      //datos de personal
      const [historialMovEq, setHistorialMovEq] = useState([]);

  const cargarHistorial = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/movimientos/realizados',{
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta[0]);
      setHistorialMovEq(respuesta); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  useEffect(() => {
    cargarHistorial();
    
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
 

      //
      const columns = [
        {
          field: 'id',
          headerName: 'Código',
        },
        {
          field: 'FechaSol',
          headerName: 'Fecha de Solicitud',
          width: '130',
          renderCell: (params) => (
            <div>
              {format(new Date(params.row.FechaSol), 'dd/MM/yyyy')} {/* Formatea la fecha aquí */}
            </div>
          ),
        },
        {
          field: 'FechaEjec',
          headerName: 'Fecha de Ejecución',
          width: '150',
          renderCell: (params) => (
            <div>
              {format(new Date(params.row.FechaEjec), 'dd/MM/yyyy')} {/* Formatea la fecha aquí */}
            </div>
          ),
        },
        {
          field: 'Estado',
            headerName: 'Estado',
          },
          {
            field: 'labAnterior',
            headerName: 'De',
          },
          {
            field: 'NroLab',
            headerName: 'A',
          },
          {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 150,
            renderCell: (params) => (
              <div>
                <button className='enviar2' onClick={() => handleEditClick(params.row.id)}>Ver</button>
              </div>
            ),
          },
          
      ];
      
      const handleEditClick = (id) => {
        // Lógica para manejar el botón de edición
        handleSubmit(id);
        console.log(`Botón de edición clickeado para el ID ${id}`);
      };
    
      const handleDeleteClick = (id) => {
        // Lógica para manejar el botón de eliminación
        console.log(`Botón de eliminación clickeado para el ID ${id}`);
      };  

      
    // Función controladora para manejar el envío del formulario
    const [opciones, setOpciones] = useState([]); 

    const handleSubmit = async(id) => {
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const datos = await fetch('http://localhost:4000/get/historico/movimiento',{
          method: 'POST',
          body: JSON.stringify({cod: id}),
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
  //CAMBIAR EL ENVIO DE COD XD
    };

  

    return(
    <div className='contaniner-nav'>
      <PersistentDrawerLeft />
      <section className="container">
        <div className='tabla'>
        <div>
        <Box sx={{ height: 400, width: '100%' }}>
          <div><h3>Historial de Movimiento de equipo</h3></div>
      <DataGrid
        rows={historialMovEq}
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
        
          
        </div>
        <div className="ReportePdf">
      
        {(Object.values(opciones).length > 0)?(
            <PDFGeneratorHistorialMovEq info={opciones} nombre={nomRep}/>
        ):null}
      
    </div>
      </section>
      
    </div>
  
    )
}
export default TablaHistorialMovimientos