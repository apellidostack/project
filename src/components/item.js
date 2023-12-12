import React, { useState, useEffect } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddItem({ isOpenI, onCloseI, children }){

  const [open, setOpen] = React.useState(false);
  const [tipoAlerta, setTipoAlerta] = React.useState('');
  const [mensaje, setMensaje] = React.useState('');

  const handleClick = (valAl) => {
    setTipoAlerta(valAl)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
   /*  if(tipoAlerta=="success"){
      window.location.reload();
    } */
    setOpen(false);
  };
  //
    const [formData, setFormData] = useState({
        item: '',
      });
    if (!isOpenI) {return null;}
    
    
      // Función controladora para manejar los cambios en los campos
      const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
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

      setFormData({...formData, ['item']: ''});
      setMensaje('Solicitud de movimiento autorizada');
      //console.log(respuesta);
      handleClick('success');
      
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      //alert('El Usuario no existe')
      setMensaje(error.message)
      handleClick('error');
      //<Alerta>ALGO</Alerta>
    } 
  };

    return(
        <div className="modal-overlay">
            <div className="modal">
        <form>
            <div>
          <h1>ITEM</h1>
        </div>
        <div className='fila'>
          <label htmlFor="user">AGREGAR ITEM:</label>
          <input type="text" id="item" name="item" value={formData.item} onChange={handleChange}/>
        </div>
        <button className='enviar' type="submit" onClick={handleSubmit}>REGISTRAR</button>
        </form>
        
        <button className="modal-close" onClick={onCloseI}>
          &#x2715;
        </button>
        {children}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipoAlerta} sx={{ width: '100%' }}>
          {mensaje}
        </Alert>
      </Snackbar>
      </div>
    )
}
export default AddItem