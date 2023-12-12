import React, { useState, useEffect } from 'react';
import PersistentDrawerLeft from './navMenu';
import AddMotivoSolicitud from './modalMotivoS';
import RealizarMovComponente from './modalDetalleRealizarMovComponente';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function SolicitarMovimientoComponente(){

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

//
const [modalOpenAMovEq, setModalOpenAMovEq] = useState(false);

  const handleOpenModalAMovEq = () => {
  //e.preventDefault();
  setModalOpenAMovEq(true);
  };

  const handleCloseModalAMovEq = () => {
    setModalOpenAMovEq(false);
  listaMovimientosAutorizados();
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
 const [lComponentes, setLComponentes] = useState([]);

 const listaComponentesActivos = async ()=>{
   try{
     // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
     const datos = await fetch('http://localhost:4000/get/lista/componentes',{
     })
     

     if (!datos.ok) {
       // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
       throw new Error('Error en la solicitud al servidor');
     }

     const respuesta =await datos.json();

     //console.log(respuesta[0]);
     setLComponentes(respuesta); // Actualiza las opciones con los datos de la respuesta
     //navigate('/motivo');
   }catch(error){
     //console.error('Error en la solicitud',error.message);
     alert('El Usuario no existe')
     //<Alerta>ALGO</Alerta>
   }
 }
 useEffect(() => {
   listaComponentesActivos();
   
 }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
 useEffect(()=>{
   console.log(lComponentes);
 },[lComponentes])

     //
     const columns = [
       {
         field: 'id',
         headerName: 'Código',
       },
       {
        field: 'DescripCo',
        headerName: 'Componente',
        width: '200',
      },
      {
        field: 'CodComp',
        headerName: 'Codigo de Componente',
        width: '200',
      },
      {
        field: 'DescripMar',
        headerName: 'Marca',
      },
      {
        field: 'NombreEq',
        headerName: 'Equipo',
      },
      {
        field: 'GrupoTrabajo',
        headerName: 'Laboratorio',
      },
         
         
     ];
     /*
     const handleEditClick = (id) => {
       // Lógica para manejar el botón de edición
       console.log(`Botón de edición clickeado para el ID ${id}`);
     };
   
     const handleDeleteClick = (id) => {
       // Lógica para manejar el botón de eliminación
       console.log(`Botón de eliminación clickeado para el ID ${id}`);
     };  */


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
  }

  //cargar tipo solicitud
  const [listaMovAutorizados, setListaMovAutorizados] = useState([]); // Variable para almacenar las opciones


  const listaMovimientosAutorizados = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/solicitudes/autorizadas/movimiento/componente',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      setListaMovAutorizados(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      

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
    listaMovimientosAutorizados();
  },[])

//
//
const columnsAutorizados = [
  {
    field: 'id',
    headerName: 'Código',
  },
  {
   field: 'Autorizador',
   headerName: 'Autorizado por',
   width: '200',
 },
 {
   field: 'Estado',
   headerName: 'Estado',
   width: '200',
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

    //cargar quipos disponibles para solicitudes
    const [equipos, setEquipos] = useState([]);

    const handleChangeSelect=async(e)=>{
      handleChangeLab(e);
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const logear = await fetch('http://localhost:4000/get/equipos/movimiento',{
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
        <input
          type="text"
          name={`${eq.idEq}/${eq.NombreEq}`}
          placeholder={`Input para ${eq.NombreEq}`}
          onChange={handleChange}
        />
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
        // Actualizar los valores de los inputs en el estado inputValues.
        setFormDataLabs((prevFormDataLabs) => ({
          ...prevFormDataLabs,
          [name]: value,
        }));
      };

    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(filasSeleccionadas);
    
    
    
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/solicitar/movimiento/componentes',{
        method: 'POST',
        body: JSON.stringify({filasSeleccionadas, codPer: storedUserData.usuario, formDataLabs}),
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

  const [filasSeleccionadas, setFilasSeleccionadas] = React.useState([]);

  const handleSelectionChange = (seleccionActual) => {
    setFilasSeleccionadas(seleccionActual);
    console.log('Filas seleccionadas:', seleccionActual);
  };
  
    return(
      <div className='contaniner-nav'>
    <PersistentDrawerLeft />
    <section className="container">
      <div className='solicitudes'>
          <div className='row-grid'>
            <div><h1>Solicitar Movimiento de Componentes</h1><h3></h3></div>
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
              <label>Seleccionar equipo</label></div>
              <select name='equipoDestino' onChange={handleChangeLab}>
                <option value="0">Seleccionar</option>
                {(equipos.length > 0)?(equipos.map((eq)=>(
                  <option key={eq.idEq} value={eq.idEq}>{eq.NombreEq}</option>
                ))):null}
              </select>
              </div>
            </div>

        </div>
        
      
      
      <Box sx={{  display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    width: '100%', }}>
        <h3>Tabla de Componentes</h3>
      <DataGrid
        rows={lComponentes}
        columns={columns}
        onRowSelectionModelChange={handleSelectionChange} // Maneja cambios de selección
        rowSelectionModel={filasSeleccionadas} // Controla las selecciones
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
    <button onClick={handleSubmit}>Solicitar baja</button>
      <button onClick={handleSubmit}>Solicitar Movimiento</button>
      </div>

      <Box sx={{  display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    width: '100%',height: 400, }}>
        <h3>Tabla de Movimientos de Componentes Autorizados</h3>
      <DataGrid
        rows={listaMovAutorizados}
        columns={columnsAutorizados}
        onRowSelectionModelChange={handleSelectionChange} // Maneja cambios de selección
        rowSelectionModel={filasSeleccionadas} // Controla las selecciones
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
        <AddMotivoSolicitud isOpenMs={modalOpenMotSoli} onCloseMs={handleCloseModalMs}>
        
        </AddMotivoSolicitud>
      </div>
      <div>
            <RealizarMovComponente isOpenAutorizarMovEqAd={modalOpenAMovEq} onCloseAutorizarMovEqAd={handleCloseModalAMovEq} infoMovEq={{detalleMov}}>

            </RealizarMovComponente>
            </div>
      </div>
      </section>
      </div>
    )
}
export default SolicitarMovimientoComponente