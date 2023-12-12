import React, { useState, useEffect } from 'react';
import AddCargo from './cargo';
import RegistrarPersonal from './personal';

import DataTable from 'react-data-table-component';
import PersistentDrawerLeft from './navMenu';
import AutorizarMovEq from './modalDetalleMovEq';
import TablaAutorizarBajaEquipo from './vistaAutorizarBajaEquipo';


//
function TablaAutorizar(){
  //detalle
  const [detalleMov, setDetalleMov] = useState([]);
const detalleMovEq = async(codD) => {
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const logear = await fetch('http://localhost:4000/lista/detalleMov/equipo',{
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
      const [lSolicitudesMovEq, setlSolicitudesMovEqMovEq] = useState([]);

  const listaSolicitudes = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/lista/solicitar/movEq',{
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta[0]);
      setlSolicitudesMovEqMovEq(respuesta); // Actualiza las opciones con los datos de la respuesta
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
    console.log(lSolicitudesMovEq);
  },[lSolicitudesMovEq])

      //
      const columns = [
        {
          name: 'Código',
          selector: row => row.CodMov, // Nombre de la propiedad en tus datos
          sortable: true
        },
        {
          name: 'Nombre del solicitante',
          selector: row => row.Ejecutor,
          sortable: true
        },
          {
            name: 'Acciones',
            cell: (row) => {
              // Aquí puedes personalizar el contenido de la columna de "Acciones"
              return (
                <div>
                  <button onClick={() => handleEditClick(row.CodMov)}>Editar</button>
                  <button onClick={() => handleDeleteClick(row.CodMov)}>Eliminar</button>
                </div>
              );
            },
          },
      ];
      
      const handleEditClick = (id) => {
        // Lógica para manejar el botón de edición
        detalleMovEq(id);
        
        console.log(`Botón de edición clickeado para el ID ${id}`);
      };
    
      const handleDeleteClick = (id) => {
        // Lógica para manejar el botón de eliminación
        console.log(`Botón de eliminación clickeado para el ID ${id}`);
      };  

      
    // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/items/add',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();

      console.log(respuesta);
      
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
        <div>
          <h1>Solicitud de Movimientos de Equipos</h1>
          <DataTable
          columns={columns}
          data={lSolicitudesMovEq}
          pagination
          >  
          </DataTable>
        </div>
        <TablaAutorizarBajaEquipo/>

        <AddCargo isOpenCargo={modalOpenPer} onCloseCargo={handleCloseModalP}>
            
          </AddCargo>
          <div>
            <AutorizarMovEq isOpenAutorizarMovEq={modalOpenAMovEq} onCloseAutorizarMovEq={handleCloseModalAMovEq} infoMovEq={{detalleMov}}>

            </AutorizarMovEq>
            </div>
        </div>
      </section>
    </div>
  
    )
}
export default TablaAutorizar