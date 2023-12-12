import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { json } from 'react-router-dom';
import AddMarca from './marca';
import AddIndustria from './modalIndustria';
import AddModelo from './modalModelo';
import AddTipoEqAd from './modalTipoEqAd';
import AddLab from './laboratorio';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ModalRegistrarEquipoAdicional = ({ isOpenPersonal, onClosePersonal, childrenPersonal })=>{
    
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

    //validar
    const verificarNombreEqAd = async (xd)=>{
        try{
          // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
          const datos = await fetch('http://localhost:4000/verificar/equipo/existe',{
            method: 'POST',
              body: JSON.stringify({buscarEq: xd}),
              headers: { 'Content-Type': 'application/json' },
          })
      
          if (!datos.ok) {
            // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
            throw new Error('Error en la solicitud al servidor');
          }
      
          const respuesta = await datos.json();
          //console.log(respuesta);
          return respuesta;
      
          //console.log(respuesta[0]);
          //setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
          //navigate('/motivo');
        }catch(error){
          //console.error('Error en la solicitud',error.message);
          alert('El Usuario no existe')
          //<Alerta>ALGO</Alerta>
        }
      }
  
    const validar = async(e) => {
      const { name, value } = e.target;
    
      if (name === 'cod' && value.length < 5) {
        
        let variableNomEq= await verificarNombreEqAd(value)
        console.log(variableNomEq);
        if(variableNomEq.length>0){/* mejorar desde aqui debo hacer funcionar esta validacion */
            setErrors({ ...errors, nombreEq: 'Ya existe un equipo con este nombre' });
        }else {
            setErrors({ ...errors, [name]: '' });
        }
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
    const handleSubmit = async(event) => {
      event.preventDefault();
      
      Object.entries(formEq).map((valform) => {
        if (valform[1] === '') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [valform[0]]: 'Este campo es obligatorio',
          }));
          console.log(valform[0]);
        }
      });
      
      console.log(errors);
  
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const logear = await fetch('http://localhost:4000/add/equipoAd',{
          method: 'POST',
          body: JSON.stringify(formEq),
          headers: { 'Content-Type': 'application/json' },
        })
  
        if (!logear.ok) {
          // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
          throw new Error('Error en la solicitud al servidor');
        }
  
        const respuesta = await logear.json();
        //console.log(formEq);
        //listaEquiposAd();
        handleClick('success');
        
        //alert('Motivo de solicitud registrada');
      }catch(error){
        //console.error('Error en la solicitud',error.message);
        handleClick('error');
        //<Alerta>ALGO</Alerta>
      }
    };
  
  
    if (!isOpenPersonal) {return null;}

    return(
        <div className="modal-overlay">
      <div className="modal">
        <div className='barra'>
        <form className='form-personal'>
        <div className='row-grid'>
          <div className='col' style={{borderBottom: '1px solid blue'}}>
            <h1>Registrar Equipo Adicional</h1>
          </div>

          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Código</label></div>
              <input type='text' name='cod' required onChange={handleChange} style={{ borderColor: errors.cod ? 'red' : '' }} placeholder='Ingrese código' />
              {errors.cod && <p style={{ color: 'red' }}>{errors.cod}</p>}
              </div>
          </div>
          
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Nº de serie</label></div>
              <input type='text' name='numSerie' onChange={handleChange} style={{ borderColor: errors.numSerie ? 'red' : '' }} placeholder='Ingrese nombre' required />
              {errors.numSerie && <p style={{ color: 'red' }}>{errors.numSerie}</p>}
              </div>
          </div>

          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
                <label className="input-group-text">Laboratorio</label></div>
                <select className='form-select form-select-lg mb-3' value={formEq.lab} id='lab' name='lab' onChange={handleChange} style={{ borderColor: errors.lab ? 'red' : '' }}>
              {/* Mapea las opciones dinámicas para crear las opciones del select */}
                <option value="0">Seleccionar</option>
                {(opcionesLab.length>0)? (opcionesLab.map((datos) => (
                <option key={datos.NroLab} value={datos.NroLab}>
                  {datos.GrupoTrabajo}
                </option>
                ))):null}
                </select>
            <button onClick={handleOpenModalL}>+</button>
          </div>
        </div>

          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Marca</label></div>
              <select name='mar' onChange={handleChange} style={{ borderColor: errors.mar ? 'red' : '' }}>
              <option>Seleccionar</option>
              {((opcionesM.length > 0)?(opcionesM.map((datos)=>(
                <option key={datos.CodMar} value={datos.CodMar}>{datos.DescripMar}</option>
              ))):null)}
              </select>
              <button onClick={handleOpenModalM}>+</button>
              </div>
          </div>

          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Industria</label></div>
              <select name='ind' onChange={handleChange} style={{ borderColor: errors.ind ? 'red' : '' }}>
              <option>Seleccionar</option>
              {((opcionesInd.length > 0)?(opcionesInd.map((datos)=>(
                <option key={datos.CodInd} value={datos.CodInd}>{datos.DescripInd}</option>
              ))):null)}
              </select>
              <button onClick={handleOpenModalInd}>+</button>
              </div>
          </div>

          <div className='ocuparEspacio'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label className="input-group-text">Fecha</label></div>
              <input className='form-control' type='date' name='fecha' onChange={handleChange} style={{ borderColor: errors.fecha ? 'red' : '' }}/>
            </div>
          </div>

          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Modelo</label></div>
              <select name='modelo' onChange={handleChange} style={{ borderColor: errors.modelo ? 'red' : '' }}>
              <option>Seleccionar</option>
              {((opcionesModelo.length > 0)?(opcionesModelo.map((datos)=>(
                <option key={datos.CodMod} value={datos.CodMod}>{datos.Descrip}</option>
              ))):null)}
              </select>
              <button onClick={handleOpenModalModelo}>+</button>
              </div>
          </div>

          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Tipo</label></div>
              <select name='tipo' onChange={handleChange} style={{ borderColor: errors.tipo ? 'red' : '' }}>
              <option>Seleccionar</option>
              {((opcionesTipoEqAd.length > 0)?(opcionesTipoEqAd.map((datos)=>(
                <option key={datos.CodTipoEqAd} value={datos.CodTipoEqAd}>{datos.DescripEqAd}</option>
              ))):null)}
              </select>
              <button onClick={handleOpenModalTEAD}>+</button>
              </div>
          </div>
          
          
          </div>
          <button className='enviar' onClick={handleSubmit} disabled={Object.values(errors).some((error) => error !== '')}>Registrar</button>

        </form>
      <button className="modal-close" onClick={onClosePersonal}>
          &#x2715;
        </button>
        {childrenPersonal}
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

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipoAlerta} sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
        </div>
      </div>
      
      </div>
    )
}

export default ModalRegistrarEquipoAdicional;