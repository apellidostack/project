import React, { useState, useEffect } from 'react';
import AddItem from './item';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
// Configura el elemento raíz del modal
Modal.setAppElement('#root');




const DetalleItem = ({ isOpen, onClose, contenido }) => {
  const navigate = useNavigate();
  //peticion items

  const [opcionesI, setOpcionesI] = useState([]);
  const [codItem, setCodItem] = useState([]);
//console.log(contenido);
    const fetchData = async () => {
      try {
        const datos = await fetch('http://localhost:4000/items/read');
        const respuestaItem = await datos.json();
        setOpcionesI(respuestaItem);
      } catch (error) {
        console.error('Error en la solicitud', error.message);
        alert('El Usuario no existe');
      }
    };
    useEffect(() => {
    fetchData();
  }, []);
  //modal
const [modalOpenI, setModalOpenI] = useState(false);

const handleOpenModal = (e) => {
  e.preventDefault();
  setModalOpenI(true);
};

const handleCloseModal = () => {
  setModalOpenI(false);
  fetchData();
};
//
  //
  
    

 // Estado para almacenar los elementos que se renderizarán en el componente.
 //const [elements, setElements] = useState([]);
 // Estado para mantener un contador 'x' para crear nombres únicos de inputs.
 //const [x, setX] = useState(1);
 // y
 //const [itemCount, setItemCount] = useState(1);
  //const [selectedItems, setSelectedItems] = useState({});
 // Estado para almacenar los valores de los inputs.
 const [inputValues, setInputValues] = useState({});
 //unidades
 const [unidades, setUnidades] = useState({});

 // Función para crear nuevos elementos cuando se hace clic en el botón.
 const [selectedOptions, setSelectedOptions] = useState({});

  const createElement = (event) => {
    const selectedOption = event.target.value;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [selectedOption]: true,
    }));
  };

  // Función para eliminar el elemento correspondiente
const removeElement = (e, optionValue) => {
  e.preventDefault(); // Evitar el comportamiento predeterminado del enlace o botón
  
  // Eliminar la entrada correspondiente en selectedOptions
  setSelectedOptions((prevSelectedOptions) => ({
    ...prevSelectedOptions,
    [optionValue]: false, // Marcar la opción como no seleccionada
  }));

  // Eliminar la entrada correspondiente en inputValues
  setInputValues((prevInputValues) => {
    const updatedInputValues = { ...prevInputValues };
    delete updatedInputValues[optionValue];
    return updatedInputValues;
  });
};
 /*const createElement = (event) => {
   let newElement;
   let boton;
   let labelr;
  //setCodItem
  const { name, value } = event.target;

    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [`codItem${itemCount}`]: value,
    }));

    setItemCount(itemCount + 1);
   // Crear un nuevo elemento de tipo label.
   labelr = React.createElement('label', {
     key: Date.now(),
     children: `Nuevo ${event.target[event.target.selectedIndex].text}`,
   });

   // Crear un nuevo elemento de tipo input.
   newElement = React.createElement('input', {
    id: {name},
     name: `item${x}`,
     key: Date.now(),
     type: 'text',
     onChange: handleInputChange, // Llamar a handleInputChange cuando el valor cambia.
   });

   // Crear un nuevo elemento de tipo botón.
   boton = React.createElement('input', {
     className: 'btn',
     name: event.target.value,
     value: 'ITEM',
     key: Date.now(),
     type: 'button',
   });

   // Incrementar el contador 'x' para nombres únicos de inputs.
   setX(x + 1);

   // Agregar los nuevos elementos al estado 'elements'.
   setElements((prevElements) => [...prevElements, labelr, newElement, boton]);
 };*/

 // Función para manejar los cambios en los inputs.
 const handleInputChange = (event) => {
   const { name, value } = event.target;
   // Actualizar los valores de los inputs en el estado inputValues.
   setInputValues((prevInputValues) => ({
     ...prevInputValues,
     [name]: value,
   }));
 };
 //unidades
 const handleInputChangeUnidades = (event) => {
  const { name, value } = event.target;
  // Actualizar los valores de los inputs en el estado inputValues.
  setUnidades((prevUnidades) => ({
    ...prevUnidades,
    [name]: value,
  }));
};

  // Función para manejar el envío del formulario.
 const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(inputValues);
   try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const logear = await fetch('http://localhost:4000/detalleItem/add',{
      method: 'POST',
      body: JSON.stringify({inputValues,unidades}),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!logear.ok) {
      // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
      throw new Error('Error en la solicitud al servidor');
    }

    const respuesta = await logear.json();

    console.log(respuesta);
    window.location.reload();
    
  }catch(error){
    //console.error('Error en la solicitud',error.message);
    alert('El Usuario no existe')
    //<Alerta>ALGO</Alerta>
  } 
  //let i = 1;
  //let newInputValues = {};

  // Obtener los valores de los inputs y almacenarlos en newInputValues.
  /*while (i < x) {
    const inputName = `item${i}`;
    const codI=`codItem${i}`;
    //newInputValues[inputName] = [inputValues[inputName],selectedItems[codI]] || '';
    newInputValues[inputName] = [inputValues[inputName],selectedItems[codI]] || '';
    i++;
  }*/
  //console.log(selectedItems)
  // Mostrar los valores de los inputs en la consola.
  //console.log(inputValues);esta linea sirve
  //console.log(selectedItems);
  //Object.values(newInputValues).map((valor)=>{console.log(valor)})
};


return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Ejemplo de Modal"
    shouldCloseOnOverlayClick={false}
  >
    <form className='detItem'>
      <div className='row-grid'>
      <div className='col'>
          <h1>Registro de Equipo</h1>
        </div>
    {contenido.map((dato) => (
      <div className='col' key={dato.codEC}>
        <div className='lb-imp'>
        <div className='subTitulo'>
        <label>{dato.DescripCo}</label></div>
        {/*<input id={`${dato.codEC}-${dato.NombreEq}-${dato.CodComp}`} />*/}
        {/* <select onChange={createElement}>
          <option>seleccionar</option>
          {opcionesI.length > 0
            ? opcionesI.map((daIt) => (
                <option key={daIt.CodItem} value={`${dato.codEC}/${dato.NombreEq}/${dato.CodComp}/${daIt.CodItem}`}>
                  {daIt.DescripItem}
                </option>
              ))
            : null}
        </select>
        <button onClick={handleOpenModal}>+</button> */}

        </div>
        {opcionesI.map((daIt) => {
        const optionValue = `${dato.codEC}/${dato.NombreEq}/${dato.CodComp}/${daIt.CodItem}`;
        const vecOV=optionValue.split('/')
        switch(dato.DescripCo){
          case 'PROCESADOR': if(daIt.DescripItem=='REFERENCIA'||daIt.DescripItem=='VELOCIDAD'||daIt.DescripItem=='TIPO DE SOCKET'){
            if(daIt.DescripItem=='REFERENCIA'){
              return (
                <div className='filas' key={optionValue}>
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><select onChange={handleInputChange} name={optionValue}><option value=''>Seleccionar</option><option value={'CORE I3'}>CORE I3</option><option value={'CORE I5'}>CORE I5</option><option value={'CORE I7'}>CORE I7</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }else if(daIt.DescripItem=='VELOCIDAD'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><select onChange={handleInputChangeUnidades} name={optionValue}><option value=''>Seleccionar</option><option value={'MHz'}>MHz</option><option value={'GHz'}>GHz</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
          case 'TARJETA MADRE': if(daIt.DescripItem=='MODELO'||daIt.DescripItem=='PUERTO PCI'||daIt.DescripItem=='CAPACIDAD'||daIt.DescripItem=='RANURAS DE EXPANSIÓN'||daIt.DescripItem=='RANURAS RAM'){
            if(daIt.DescripItem=='CAPACIDAD'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><select onChange={handleInputChangeUnidades} name={optionValue}><option value=''>Seleccionar</option><option value={'MHz'}>MHz</option><option value={'GHz'}>GHz</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
          case 'DISCO DURO': if(daIt.DescripItem=='MODELO'||daIt.DescripItem=='CAPACIDAD'||daIt.DescripItem=='VELOCIDAD'||daIt.DescripItem=='INTERFAZ'){
            if(daIt.DescripItem=='VELOCIDAD'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><select onChange={handleInputChangeUnidades} name={optionValue}><option value=''>Seleccionar</option><option value={'RPM'}>RPM</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            if(daIt.DescripItem=='CAPACIDAD'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><select onChange={handleInputChangeUnidades} name={optionValue}><option value=''>Seleccionar</option><option value={'MB'}>MB</option><option value={'GB'}>GB</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            if(daIt.DescripItem=='INTERFAZ'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><select onChange={handleInputChange} name={optionValue}><option value=''>Seleccionar</option><option value={'USB'}>USB</option><option value={'SATA II'}>SATA II</option><option value={'SATA III'}>SATA III</option><option value={'eSATA'}>eSATA</option><option value={'M.2'}>M.2</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
          case 'MEMORIA RAM': if(daIt.DescripItem=='TIPO DE SLOT'||daIt.DescripItem=='TIPO'||daIt.DescripItem=='CAPACIDAD'){
            if(daIt.DescripItem=='CAPACIDAD'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><select onChange={handleInputChangeUnidades} name={optionValue}><option value=''>Seleccionar</option><option value={'MB'}>MB</option><option value={'GB'}>GB</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
          case 'MOUSE': if(daIt.DescripItem=='MODELO'||daIt.DescripItem=='INTERFAZ'){
            if(daIt.DescripItem=='INTERFAZ'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><select onChange={handleInputChange} name={optionValue}><option value=''>Seleccionar</option><option value={'USB'}>USB</option><option value={'PS/2'}>PS/2</option><option value={'INALÁMBRICO'}>INALÁMBRICO</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
          case 'TECLADO': if(daIt.DescripItem=='TIPO'||daIt.DescripItem=='COLOR'||daIt.DescripItem=='INTERFAZ'||daIt.DescripItem=='MODELO'){
            if(daIt.DescripItem=='INTERFAZ'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><select onChange={handleInputChange} name={optionValue}><option value=''>Seleccionar</option><option value={'USB'}>USB</option><option value={'PS/2'}>PS/2</option><option value={'INALÁMBRICO'}>INALÁMBRICO</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
          case 'MONITOR': if(daIt.DescripItem=='TAMAÑO'||daIt.DescripItem=='MODELO'||daIt.DescripItem=='COLOR'||daIt.DescripItem=='INTERFAZ'){
            if(daIt.DescripItem=='INTERFAZ'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><select onChange={handleInputChange} name={optionValue}><option value=''>Seleccionar</option><option value={'USB'}>USB</option><option value={'VGA'}>VGA</option><option value={'HDMI'}>HDMI</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            if(daIt.DescripItem=='TAMAÑO'){
              return (
                <div className='filas' key={optionValue}>{/* continuar desde aqui, unidades dbemos concatenar en el servidor cuando clave del objeto se igual */}
                  {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><select onChange={handleInputChangeUnidades} name={optionValue}><option value=''>Seleccionar</option><option value={'LCD'}>LCD</option><option value={'TFT'}>TFT</option><option value={'FPD'}>FPD</option></select><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                  /* Aquí puedes renderizar los elementos específicos para esta opción */}
                  
                </div>
              );
            }
            return (
              <div className='filas' key={optionValue}>
                {<div className='lb-imp'><div className='lb-center'><label>{daIt.DescripItem}</label></div><input type='text' onChange={handleInputChange} name={optionValue}/><button onClick={(e) => removeElement(e, optionValue)}>Eliminar</button></div>
                /* Aquí puedes renderizar los elementos específicos para esta opción */}
                
              </div>
            );
          } 
          break;
        }
        //return null; // No se renderizará nada para las opciones no seleccionadas
      })}
      
      
      </div>
    ))}
    </div>
      <button className='enviar' onClick={handleSubmit}>Registrar Items</button>
    </form>
    <button onClick={onClose}>Cerrar</button>

    <AddItem isOpenI={modalOpenI} onCloseI={handleCloseModal}>
        
      </AddItem>
  </Modal>
);

}

export default DetalleItem;

  