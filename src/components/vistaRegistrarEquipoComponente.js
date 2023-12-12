import React from 'react';
import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuPro from './navMenu';
import DetalleItem from './detalleItem';
import NewTipoComponent from './newComponente';
import AddLab from './laboratorio';
import AddMarca from './marca';

function RegistrarEquipoComponente() {
const [dynamicElements, setDynamicElements] = useState([]);

// Función para crear un nuevo select
const createSelect = (index) => {
  return (
    <select
      name={index}
      required
      onChange={(event) => handleChangeMarca(event, index)} // Pasar el índice al handleChangeMarca
      key={index}
    >
      <option value="">Seleccionar</option>
      {opcionesM.map((datos) => (
        <option key={datos.CodMar} value={datos.CodMar}>
          {datos.DescripMar}
        </option>
      ))}
    </select>
  );
};
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
  //modal nuevo lab
const [modalOpenLab, setModalOpenLab] = useState(false);

const handleOpenModalL = (e) => {
  e.preventDefault();
  setModalOpenLab(true);
};

const handleCloseModalL = () => {
  setModalOpenLab(false);
  //combo();
};
//
  //modal nuevo componente
const [modalOpenComp, setModalOpenComp] = useState(false);

const handleOpenModalC = (e) => {
  e.preventDefault();
  setModalOpenComp(true);
};

const handleCloseModalC = () => {
  setModalOpenComp(false);
  comboComp();
};
//
  //modal
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  //
  const [objetoDesdeHijo, setObjetoDesdeHijo] = useState(null);

  const recibirObjetoDesdeHijo = (objeto) => {
    setObjetoDesdeHijo(objeto);
  }
  //
  const navigate = useNavigate();

  

  //combo laboratorios
  const [opcionesLab, setOpcionesLab] = useState([]); // Variable para almacenar las opciones


  const comboLabs = async ()=>{
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

  //comp
  const [opciones2, setOpciones2] = useState([]); // Variable para almacenar las opciones2

  const comboComp = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/tipoComp/read',{
        
      })

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await datos.json();
      //console.log(respuesta);
      if (Array.isArray(Object.values(respuesta))) {
        setOpciones2(respuesta); // Actualiza las opciones2 con los datos de la respuesta
      } else {
        console.error('La respuesta no contiene un array de opciones.xd');
        setOpciones2({});
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
//cargar equipos segun el laboratorio
//cargar quipos disponibles para solicitudes
const [equipos, setEquipos] = useState([]);

const handleChangeSelect=async(e)=>{
  handleChange(e);
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


  //


  useEffect(() => {
    //combo();
    comboComp();
    comboMarca();
    comboLabs();
    // Esta función se ejecutará al cargar o entrar en la ruta correspondiente
    //console.log('Formulario cargado o ruta accedida');
    
    // Puedes realizar otras acciones aquí si lo necesitas
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  
  //const navigate = useNavigate();
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formData, setFormData] = useState({
    codComp: '',
    codTipoComp: '',
  });
  //comp
  
  // Definir el estado del formulario y los valores iniciales de los campos
  const [formEq, setformEq] = useState({
    fecha: '',
    id: '',
  });
//
//validaciones aqui controlare la cantidad de caracteres y si el codigo ya existe en la base de datos
const [errors, setErrors] = useState({
  nombreEq: '',
  // Otros campos...
});

//consulta codigo componente
const confirmarComponentevalido = async (xd)=>{
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const datos = await fetch('http://localhost:4000/verificar/componente/existe',{
      method: 'POST',
        body: JSON.stringify({buscarCod: xd}),
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

//consulta nombre de equipo
const confirmarEquipovalido = async (xd)=>{
  try{
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    const datos = await fetch('http://localhost:4000/verificar/equipo/existe',{
      method: 'POST',
        body: JSON.stringify({buscarEq: `${guia}-${xd}`}),
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


useEffect(()=>{
  console.log(errors);
},[errors])
const validar = async(e) => {
  const { name, value } = e.target;

  if (name === 'nombreEq') {
    if(guia!=''){
      let variableNomEq= await confirmarEquipovalido(value)
      console.log(variableNomEq);
      if(variableNomEq.length>0){
        setErrors({ ...errors, nombreEq: 'Ya existe un equipo con este nombre' });
      }else {
        setErrors({ ...errors, [name]: '' });
      }
    }else{
      setErrors({ ...errors, nombreEq: 'Debe seleccionar un laboratorio' });
    }
    
  } else if (name.indexOf('valor') != -1) {
    let variableCodigoComp= await confirmarComponentevalido(value)
    if(variableCodigoComp.length>0){
      setErrors({ ...errors, valor: 'Ya existe un componenet con este codigo' });
    }else {
      setErrors({ ...errors, valor: '' });
    }
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
//
  const [guia, setGuia] = useState('');
  // Función controladora para manejar los cambios en los campos
  const handleChange = (event) => {
    setformEq({...formEq, [event.target.name]: event.target.value});
    if(event.target.name=='lab'){
      setGuia(event.target.value)
    }
    if(event.target.name=='nombreEq'){
      validar(event)
    }
      
  };
  //cambios de select marca
  const [marca, setMarca] = useState({});
  const handleChangeMarca = (event) => {
    const { name, value } = event.target;
    setMarca((prevMarcaValues) => ({
      ...prevMarcaValues,
      [name]: value,
    }));
    
  };

  //comp
  // y
 const [compCount, setCompCount] = useState(1);
 const [selectedComps, setSelectedComps] = useState({});
  
  
  

  //crear elementos
  const [elements, setElements] = useState([]);
  const [x, setX] = useState(1);
  const [inputValues, setInputValues] = useState({});
  

  const createElement = (event) => {
    
    let newElement;
    let boton;
    let labelr;
    //setCodComp
    const { name, value } = event.target;

    setSelectedComps((prevSelectedComps) => ({
      ...prevSelectedComps,
      [`codComp${compCount}`]: value,
    }));

    setCompCount(compCount + 1);
    //
    const newSelect = createSelect(x); // Genera el nuevo select utilizando la función
    const newLabel = <div className='lb-center'><label key={'l'+x+Date.now()}>{event.target[event.target.selectedIndex].text}</label></div>;
    const newInput = (
      <input
        name={`valor${x}`}
        key={'i'+x+Date.now()}
        type="text"
        required
        placeholder='N° de Serie'
        onChange={handleInputChange}
      />
    );
    const newButton = <button key={'b'+x+Date.now()} onClick={handleOpenModalM}>+</button>;

    const newDeleteButton = (
      <button key={`delete${x}`} onClick={() => handleDeleteElement(x)}>
        Eliminar
      </button>
    );
     // ...

  // ... Crear otros elementos ...

  setDynamicElements((prevElements) => [
    ...prevElements,
    { index: x, select: newSelect, label: newLabel, input: newInput, button: newButton, deleteButton: newDeleteButton, },
  ]);

  // Actualiza las opciones en los select anteriores
  

  setX(x + 1);
  };

 // Función para eliminar un elemento dinámico
const handleDeleteElement = (indexToDelete) => {
  setDynamicElements((prevElements) =>
    prevElements.filter((element) => element.index !== indexToDelete)
  );

  // Eliminar el valor del input correspondiente
  setInputValues((prevInputValues) => {
    const { [`valor${indexToDelete}`]: deletedValue, ...newInputValues } =
      prevInputValues;
    return newInputValues;
  });

  // Eliminar el valor del select correspondiente de marca
  setSelectedComps((prevSelectedComps) => {
    const { [`codComp${indexToDelete}`]: deletedValue, ...newSelectedComps } =
      prevSelectedComps;
    return newSelectedComps;
  });

  // Eliminar el valor del select correspondiente de marca
  setMarca((prevMarcaValues) => {
    const { [indexToDelete]: deletedValue, ...newMarcaValues } =
    prevMarcaValues;
    return newMarcaValues;
  });
};
  //

  useEffect(()=>{
    setDynamicElements((prevElements) =>
    prevElements.map((element) => {
      if (element.select) {
        const updatedSelect = createSelect(element.index); // Crea nuevamente el select con las opciones actualizadas
        return { ...element, select: updatedSelect };
      }
      return element;
    })
  );
  },[opcionesM])
  //enviar a detItem
  const [listaComp, setListaComp] = useState([])
  // Función controladora para manejar el envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    let i = 1;
    let newInputValues = {};

    while (i < x) {
      const inputName = `valor${i}`;
      const codC=`codComp${i}`;
      const codMarca=`${i}`;
    //newInputValues[inputName] = [inputValues[inputName],selectedItems[codI]] || '';
    if(inputValues[inputName]!=null){
    newInputValues[inputName] = [inputValues[inputName],selectedComps[codC],marca[codMarca]] || '';
    }
      i++;
    }
    console.log(formEq);
    console.log(newInputValues);
    //console.log(inputValues);
    //console.log(marca);
    //console.log(objetoDesdeHijo)
    /*Object.values(newInputValues).map((d)=>{
      console.log(d[0]);
    })
    console.log(marca);*/
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/set/componente/a/equipo',{
        method: 'POST',
        body: JSON.stringify({formEq,newInputValues}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();
      setListaComp(respuesta);
      handleOpenModal();
      return false;
      //alert('Motivo de solicitud registrada');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  };

   const handleInputChange = (event) => {
    //
    validar(event);
    //
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  return (
    <div className="container-nav">
      <MenuPro></MenuPro>
    <div className='row-center'>
    <div className='container-2'>
      <form className='container' onSubmit={handleSubmit}>
      <div className='row-grid'>
        <div className='col'>
          <h1>Registro de Equipo</h1>
        </div>
        <div className='col'>
        <div className='lb-imp'>
        <div className='lb-center'>
        <label className="input-group-text">Fecha</label></div>
        <input className='form-control' type='date' name='fecha' onChange={handleChange}/>
        </div>
        </div>
        
        <div className='col'>
        <div className='lb-imp'>
        <div className='lb-center'>
        <label className="input-group-text">Laboratorio</label></div>
          <select className='form-select form-select-lg mb-3' value={formEq.lab} id='lab' name='lab' onChange={handleChangeSelect}>
            {/* Mapea las opciones dinámicas para crear las opciones del select */}
            <option value="0">Seleccionar</option>
            {(opcionesLab.length>0)? (opcionesLab.map((datos) => (
              <option key={datos.NroLab} value={datos.NroLab}>
                {datos.NroLab}
              </option>
            ))):null}
          </select>
          </div>
        </div>
        
        <div className='col'>
        <div className='lb-imp'>
        <div className='lb-center'>
        <label className="input-group-text">Equipo</label></div>
          <select className='form-select form-select-lg mb-3' id='id' name='id' onChange={handleChange}>
            {/* Mapea las opciones dinámicas para crear las opciones del select */}
            <option value="0">Seleccionar</option>
            {(equipos.length>0)? (equipos.map((datos) => (
              <option key={datos.idEq} value={datos.idEq}>
                {datos.NombreEq}
              </option>
            ))):null}
          </select>
          </div>
        </div>


          <div className='col'>
          <div className='lb-imp'>
          <div className='lb-center'>
          <label className="input-group-text">Seleccionar componentes</label></div>
            <select className='form-select form-select-lg mb-3'  id='codTipoComp' name='codTipoComp' onChange={createElement} >
              <option value="0">Seleccionar</option>
              {(opciones2.length>0)? (opciones2.map((datos) => (
                <option key={datos.CodTipoComp} value={datos.CodTipoComp}>
                  {datos.DescripCo}
                </option>
              ))):null}
            </select>
            <button onClick={handleOpenModalC}>+</button>
          </div>
          </div>
          {/* ... Resto del código ... */}
            {dynamicElements.map((element) => (
              <div className='col' key={element.index}>
                <div className='lb-imp' >
                {element.label}
                {element.select}
                {element.input}
                {element.button}
                {element.deleteButton}
                </div>
              </div>
            ))}
        </div>
        
        {errors.valor && <p style={{ color: 'red' }}>{errors.valor}</p>}
        <button className='enviar' type="submit" >Registrar</button>
      </form>
    </div>
    <div>
      {/*<DetalleItem enviarObjeto={recibirObjetoDesdeHijo}></DetalleItem>*/}
    </div>
    </div>
    <div>
      <DetalleItem
        isOpen={modalOpen}
        onClose={handleCloseModal}
        contenido={listaComp}
      />
    </div>
    <div>
    <NewTipoComponent isOpenC={modalOpenComp} onCloseC={handleCloseModalC}>
        
        </NewTipoComponent>
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
    </div>
  );
};




  

export default RegistrarEquipoComponente;