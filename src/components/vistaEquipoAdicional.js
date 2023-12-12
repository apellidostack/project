import React from 'react';
import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuPro from './navMenu';
import AddMarca from './marca';
import AddIndustria from './modalIndustria';
import AddModelo from './modalModelo';
import AddTipoEqAd from './modalTipoEqAd';
import AddLab from './laboratorio';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ModalRegistrarEquipoAdicional from './modalEquipoAdicional';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegistroEqAd() {
  //
  //adicionales xd
  const verPDFInventarioAdicionales=()=>{
    navigate('/ReporteEquiposAdicionales')
  }

  const verPDFMovimientoAdicionales=()=>{
    navigate('/ReporteMovimientoEquipoAdicional')
  }

  const verPDFBajaAdicionales=()=>{
    navigate('/ReporteBajaEquipoAdicional')
  }
//modal registro de personal
const [modalOpenRegisPer, setModalOpenRegisPer] = useState(false);

const handleOpenModalRegisPer = (e) => {
e.preventDefault();
setModalOpenRegisPer(true);
};

const handleCloseModalRegisPer = () => {
  setModalOpenRegisPer(false);
listaEquiposAd();
};
  //
  const [open, setOpen] = React.useState(false);
  const [tipoAlerta, setTipoAlerta] = React.useState('');

  const handleClick = (valAl) => {
    setTipoAlerta(valAl)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
// Función para crear un nuevo select

//modal nuevo lab
const [modalOpenLab, setModalOpenLab] = useState(false);

const handleOpenModalL = (e) => {
  e.preventDefault();
  setModalOpenLab(true);
};

const handleCloseModalL = () => {
  setModalOpenLab(false);
  comboLab();
};
//
  //modal nuevo marca
const [modalOpenMar, setModalOpenMar] = useState(false);

const handleOpenModalM = (e) => {
  e.preventDefault();
  setModalOpenMar(true);
};

const handleCloseModalM = () => {
  setModalOpenMar(false);
  comboMarca();
};
//
  //modal modelo
const [modalOpenModelo, setModalOpenModelo] = useState(false);

const handleOpenModalModelo = (e) => {
  e.preventDefault();
  setModalOpenModelo(true);
};

const handleCloseModalModelo = () => {
  setModalOpenModelo(false);
  comboModelo();
};
//
  //modal industria
const [modalOpenInd, setModalOpenInd] = useState(false);

const handleOpenModalInd = (e) => {
  e.preventDefault();
  setModalOpenInd(true);
};

const handleCloseModalInd = () => {
  setModalOpenInd(false);
  comboIndustria();
};
//
  //modal tipo equipo ad
  const [modalOpenTEAD, setModalOpenTEAD] = useState(false);

  const handleOpenModalTEAD = (e) => {
    e.preventDefault();
    setModalOpenTEAD(true);
  };
  
  const handleCloseModalTEAD = () => {
    setModalOpenTEAD(false);
    comboTipoEqAd();
  };
  //
  //
  const navigate = useNavigate();

//laboratorio
const [opcionesLab, setOpcionesLab] = useState([]); // Variable para almacenar las opciones


  const comboLab = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/labs/read',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      if (Array.isArray(respuesta)) {
        setOpcionesLab(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      } else {
        console.error('La respuesta no contiene un array de opciones.1');
        setOpcionesLab({})
      }

      //console.log(respuesta[0]);
      //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }


//opciones industria
  const [opcionesInd, setOpcionesInd] = useState([]); // Variable para almacenar las opciones


  const comboIndustria = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/industria/get',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      if (Array.isArray(respuesta)) {
        setOpcionesInd(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      } else {
        console.error('La respuesta no contiene un array de opciones.1');
        setOpcionesInd({})
      }

      //console.log(respuesta[0]);
      //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }

  //combo tipo de equipo adicional

  const [opcionesTipoEqAd, setOpcionesTipoEqAd] = useState([]); // Variable para almacenar las opciones
  const comboTipoEqAd = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/tipoEqAd/get',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();

      if (Array.isArray(respuesta)) {
        setOpcionesTipoEqAd(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      } else {
        console.error('La respuesta no contiene un array de opciones.1');
        setOpcionesTipoEqAd({})
      }

      //console.log(respuesta[0]);
      //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }

  //comp
  const [opcionesModelo, setOpcionesModelo] = useState([]); // Variable para almacenar las opciones2

  const comboModelo = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/modelo/get',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();
      //console.log(respuesta);
      if (Array.isArray(Object.values(respuesta))) {
        setOpcionesModelo(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      } else {
        console.error('La respuesta no contiene un array de opciones.xd');
        setOpcionesModelo({});
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

  //MARCA
  const [opcionesM, setOpcionesM] = useState([])

  const comboMarca = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/ver/marca',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();
      //console.log(respuesta);
      if (Array.isArray(respuesta)) {
        setOpcionesM(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      } else {
        console.error('La respuesta no contiene un array de opciones.marca');
        setOpcionesM({})
      }

      //console.log(respuesta[0]);
      //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  //TERMINA CONSULTA MARCA
//aqui la tabla equipos adicionales
const [lEquiposAd, setLEquiposAd] = useState([]);

const listaEquiposAd = async ()=>{
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const datos = await fetch('http://localhost:4000/get/equipoAdicional',{
    })
    

    if (!datos.ok) {
      // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
      throw new Error('Error en la solicitud al servidor');
    }

    const respuesta =await datos.json();

    //console.log(respuesta[0]);
    setLEquiposAd(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
    //navigate('/motivo');
  }catch(error){
    //console.error('Error en la solicitud',error.message);
    alert('El Usuario no existe')
    //<Alerta>ALGO</Alerta>
  }
}
useEffect(() => {
  listaEquiposAd();
  
}, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
useEffect(()=>{
  console.log(lEquiposAd);
},[lEquiposAd])

    //
    const columns = [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
       field: 'CodEquipoAd',
       headerName: 'Código',
       width: '200',
     },
     {
       field: 'NroSerie',
       headerName: 'Número de serie',
       width: '200',
     },
     {
       field: 'DescripEqAd',
       headerName: 'Descripción',
     },
     {
       field: 'DescripMar',
       headerName: 'Marca',
       width: '200',
     },
     {
       field: 'Descrip',
       headerName: 'Modelo',
       width: '150'
     },
     {
      field: 'DescripInd',
      headerName: 'Industria',
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
      // Lógica para manejar el botón de edición
      console.log(`Botón de edición clickeado para el ID ${id}`);
    };
  
    const handleDeleteClick = (id) => {
      // Lógica para manejar el botón de eliminación
      console.log(`Botón de eliminación clickeado para el ID ${id}`);
    };  

    

//termina tabla equipos adicionales

  useEffect(() => {
    comboIndustria();
    comboMarca();
    comboModelo();
    comboTipoEqAd();
    comboLab();
    // Esta función se ejecutará al cargar o entrar en la ruta correspondiente
    //console.log('Formulario cargado o ruta accedida');
    
    // Puedes realizar otras acciones aquí si lo necesitas
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  
  //const navigate = useNavigate();
  //validaciones aqui controlare la cantidad de caracteres y si el codigo ya existe en la base de datos
  const [errors, setErrors] = useState({
    cod: '',
    numSerie: '',
    fecha: '',
    lab: '',
    tipo: '',
    ind: '',
    modelo: '',
    mar: '',
    // Otros campos...
  });

  const validar = (e) => {
    const { name, value } = e.target;
  
    if (name === 'cod' && value.length < 5) {
      setErrors({ ...errors, cod: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'numSerie' && value.length < 5) {
      setErrors({ ...errors, numSerie: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'tipo' && isNaN(value)) {
      setErrors({ ...errors, tipo: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'fecha' && value=='dd/mm/aaaa') {
      setErrors({ ...errors, fecha: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'lab' && value.length < 5) {
      setErrors({ ...errors, lab: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'tipo' && isNaN(value)) {
      setErrors({ ...errors, tipo: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'numSerie' && value.length < 5) {
      setErrors({ ...errors, numSerie: 'El valor debe tener al menos 5 caracteres' });
    } else if (name === 'numSerie' && value.length < 5) {
      setErrors({ ...errors, numSerie: 'El valor debe tener al menos 5 caracteres' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  
  };
  
  //validacion
  
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formEq, setformEq] = useState({
    cod: '',
    numSerie: '',
    fecha: '',
    lab: '',
    tipo: '',
    ind: '',
    modelo: '',
    mar: '',
  });

  // Función controladora para manejar los cambios en los campos
  const handleChange = (event) => {
    validar(event);
    setformEq({...formEq, [event.target.name]: event.target.value});

  };
  

  //comp
  // y
  


  //

  
  // Función controladora para manejar el envío del formulario
 



  return (
    <div className="container-nav">
      <MenuPro></MenuPro>
    <div className='row-center'>
    <div className='container'>
    <div className='tabla'>
          <button className='enviar2' onClick={handleOpenModalRegisPer}>Registrar Equipo Adicional</button>
        
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={lEquiposAd}
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
    
      <div>
      <button className='enviar2' onClick={verPDFInventarioAdicionales}>Ver Informe de Equipos Adicionales</button>
      <button className='enviar2' onClick={verPDFMovimientoAdicionales}>Ver Informe de Movimiento de Equipos Adicionales</button>
      <button className='enviar2' onClick={verPDFBajaAdicionales}>Ver Informe de Baja de Equipos Adicionales</button>
      </div>
    
    <div>
    <AddIndustria isOpenIndustria={modalOpenInd} onCloseIndustria={handleCloseModalInd}>
        
        </AddIndustria>
    </div>
    {/*AQUI EL MODAL MODELO */}
    <div>
    <AddModelo isOpenModelo={modalOpenModelo} onCloseModelo={handleCloseModalModelo}>
        
        </AddModelo>
    </div>
    {/*AQUI EL MODAL LAB */}
    <div>
    <AddLab isOpenL={modalOpenLab} onCloseL={handleCloseModalL}>
        
        </AddLab>
    </div>
    {/*marca */}
    <div>
    <AddMarca isOpenM={modalOpenMar} onCloseM={handleCloseModalM}>
        
        </AddMarca>
    </div>
    {/*tipo eq ad */}
    <div>
    <AddTipoEqAd isOpenTEAD={modalOpenTEAD} onCloseTEAD={handleCloseModalTEAD}>
        
        </AddTipoEqAd>
    </div>
    <div>
            <ModalRegistrarEquipoAdicional isOpenPersonal={modalOpenRegisPer} onClosePersonal={handleCloseModalRegisPer}>

            </ModalRegistrarEquipoAdicional>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipoAlerta} sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
        </div>
      </div>
    
    </div>
  );
};

export default RegistroEqAd;