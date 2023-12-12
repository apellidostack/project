import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCargo from './cargo';

import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

import { format } from 'date-fns';

const ActualizarPersonal = ({ isOpenPersonal, onClosePersonal, datosP, childrenPersonal })=>{
    

    //modal nuevo marca
const [modalOperCargo, setModalOperCargo] = useState(false);

const handleOpenModalCargo = (e) => {
  e.preventDefault();
  setModalOperCargo(true);
};

const handleCloseModalCargo = () => {
  setModalOperCargo(false);
  comboCargos();
};
//

    const [cargos, setCargos] = useState([])

    const comboCargos = async ()=>{
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const datos = await fetch('http://localhost:4000/cargo/get',{
          
        })
  
        if (!datos.ok) {
          // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
          throw new Error('Error en la solicitud al servidor');
        }
  
        const respuesta = await datos.json();
        //console.log(respuesta);
        if (Array.isArray(respuesta)) {
          setCargos(respuesta); // Actualiza las opciones2 con los datos de la respuesta
        } else {
          console.error('La respuesta no contiene un array de opciones.cargos');
          setCargos({})
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


    const [formData, setFormData] = useState({});
    const formDataRef = useRef();
  
    useEffect(() => {
      // Este efecto solo se ejecutará en el montaje inicial y cuando datosP cambie
      if (isOpenPersonal && Object.keys(datosP).length > 0) {
        setFormData(datosP);
        formDataRef.current = datosP;
        comboCargos();
      }
    }, [isOpenPersonal, datosP]);
  
    useEffect(() => {
      // Este efecto se ejecutará cada vez que formData cambie
      console.log(formDataRef.current);
    }, [formData]);

      
        // Función controladora para manejar los cambios en los campos
        const handleChange = (event) => {
          setFormData({...formData, [event.target.name]: event.target.value});
        };
      // Función controladora para manejar el envío del formulario
    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
        const logear = await fetch('http://localhost:4000/add/personal',{
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
        console.log(formData);
        
      }catch(error){
        //console.error('Error en la solicitud',error.message);
        alert('El Usuario no existe')
        //<Alerta>ALGO</Alerta>
      }
    };
    if (!isOpenPersonal) {return null;}
    if(Object.entries(datosP)==false){return null;}

    return(
        <div className="modal-overlay">
      <div className="modal">
        <div className='barra'>
      <form className='form-personal'>
        <div className='row-grid'>
          <div className='col' style={{borderBottom: '1px solid blue'}}>
            <h1>Editar Personal</h1>
          </div>
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Código</label></div>
              <input type='text' value={formData.CodPer} name='CodPer' onChange={handleChange} placeholder='Ingrese código'/>
              </div>
          </div>
          
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <PersonIcon /></div>
              <input type='text' value={formData.Nombre} name='Nombre' onChange={handleChange} placeholder='Ingrese nombre'/>
              </div>
          </div>
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <label>Cargo</label></div>
              <select name='CodCar' value={formData.CodCar} onChange={handleChange}>
              <option>Seleccionar</option>
              {((cargos.length > 0)?(cargos.map((datos)=>(
                <option value={datos.CodCar}>{datos.DescripCar}</option>
              ))):null)}
              </select>
              <button onClick={handleOpenModalCargo}>+</button>
              </div>
          </div>
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <PersonIcon /></div>
              <input type='text' value={formData.Paterno} name='Paterno' onChange={handleChange} placeholder='Ingrese el primer apelido'/>
              </div>
          </div>
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <PersonIcon /></div>
              <input type='text' value={formData.Materno} name='Materno' onChange={handleChange} placeholder='Ingrese el segundo apellido'/>
            </div>
          </div>
          <div className='ocuparEspacio'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <EmailIcon /></div>
              <input type='email' value={formData.Email} name='Email' onChange={handleChange} placeholder='Ingrese correo'/>
              </div>
          </div>
          {/* <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <PasswordIcon /></div>
              <input type='password' value={formData.Contrasenia} name='Contrasenia' onChange={handleChange} placeholder='Ingrese contraseña'/>
              </div>
          </div> */}
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <PhoneAndroidIcon /></div>
              <input type='number' value={formData.Telf} name='Telf' onChange={handleChange} placeholder='Ingrese teléfono'/>
              </div>
          </div>
          <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <HomeIcon /></div>
              <input type='text' value={formData.Dir} name='Dir' onChange={handleChange} placeholder='Ingrese dirección'/>
              </div>
          </div>
          {/* <div className='col'>
            <div className='lb-imp'>
              <div className='lb-center'>
              <CalendarMonthIcon /></div>
              <input type='date' value={formData.FechaIng ? format(new Date(formData.FechaIng), 'yyyy-MM-dd') : ''} name='FechaIng' onChange={handleChange}/>
              </div>
          </div> */}
          </div>
          <button className='enviar' onClick={handleSubmit}>Registrar Personal</button>
        </form>
      <button className="modal-close" onClick={onClosePersonal}>
          &#x2715;
        </button>
        {childrenPersonal}
        <div>
        <AddCargo isOpenCargo={modalOperCargo} onCloseCargo={handleCloseModalCargo}>
        
        </AddCargo>
        </div>
        </div>
      </div>
      
      </div>
    )
}

export default ActualizarPersonal;