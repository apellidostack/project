import React, { useState, useEffect } from 'react';
import '../estilos/login.css';
import Modals from './modal';
import UpdateValorItem from './updateValorItem';
import PersistentDrawerLeft from './navMenu';

import { useNavigate } from 'react-router-dom'; 

function DetalleEquipo() {
  const navigate = useNavigate();
  //let arr=[];
  const verPDF=()=>{
    navigate('/reporteTotal')
  }

  const verPDFAlta=()=>{
    navigate('/ReportealtaEquipo')
  }

  const verPDFMovimiento=()=>{
    navigate('/MovimientosGestion')
  }

  const verPDFBaja=()=>{
    navigate('/ReportebajaEquipo')
  }

  //adicionales xd
  const verPDFInventarioAdicionales=()=>{
    navigate('/ReporteEquiposAdicionales')
  }
  //modal actualizar valor de item
const [modalOpenUV, setModalOpenUV] = useState(false);
const [datosUV, setDatosUV]=useState("");

const handleOpenModalUV = (uvDato) => {
  console.log(uvDato);
  setDatosUV(uvDato);
  setModalOpenUV(true);
};

const handleCloseModalUV = () => {
  setModalOpenUV(false);
  handleSubmit(valorIdEq);
};
//
  //modal nuevo reporte
 const [modalOpenMar, setModalOpenMar] = useState(false);

 const handleOpenModalM = () => {
   setModalOpenMar(true);
 };
 
 const handleCloseModalM = () => {
   setModalOpenMar(false);
 };
 //
  //consulta
  const [opciones, setOpciones] = useState([]); // Variable para almacenar las opciones
  const [detalles, setDetalles] = useState([]);

  const combo = async ()=>{
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const datos = await fetch('http://localhost:4000/get/equipo',{
      })
      

      if (!datos.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta =await datos.json();

      //console.log(respuesta[0]);
      setOpciones(respuesta[0]); // Actualiza las opciones con los datos de la respuesta
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('El Usuario no existe')
      //<Alerta>ALGO</Alerta>
    }
  }
  useEffect(() => {
    combo();
  }, []); // El segundo argumento vacío [] indica que el efecto se ejecuta solo una vez al cargar el componente
  

  // 
  const [formData, setFormData] = useState([
    {
      NombreEq: '',
    },
  ]);

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const handleAddFields = () => {
    setFormData([...formData, { nombreEq: '', codComp: '', codItem: '', valor: '' }]);
  };
  //prueba
  const [valorIdEq, setValorIdEq] = useState('');
  //

  const handleSubmit = async(valor) => {
    //event.preventDefault();
    setValorIdEq(valor);
    try{
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      const logear = await fetch('http://localhost:4000/ver/detalleDeEquipo',{
        method: 'POST',
        body: JSON.stringify({equipoSeleccionado: valor}),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!logear.ok) {
        // Si la respuesta no fue exitosa (por ejemplo, error 404 o 500), lanza un error
        throw new Error('Error en la solicitud al servidor');
      }

      const respuesta = await logear.json();
      console.log(respuesta[0])
      setDetalles(respuesta[0]);
      handleOpenModalM();
      //navigate('/motivo');
    }catch(error){
      //console.error('Error en la solicitud',error.message);
      alert('Error en la solicitud'+error.message)
      //<Alerta>ALGO</Alerta>
    }
    //console.log(jsonData)
    //console.log(detalles);
    //alert('Equipo seleccionado:'+ equipoSeleccionado);
    // Aquí puedes realizar cualquier acción adicional con el equipo seleccionado

  };
  //intento
  const [componentesSeparados, setComponentesSeparados] = useState({});

  useEffect(() => {
    // Itera sobre el array original y agrupa los elementos por NombreEq
    const agruparComponentes = () => {
      const nuevosComponentesSeparados = {};

      detalles.forEach((elemento) => {
        const nombreEq = `${elemento.idEq}${elemento.CodComp}`;
        if (!nuevosComponentesSeparados[nombreEq]) {
          nuevosComponentesSeparados[nombreEq] = [];
        }
        nuevosComponentesSeparados[nombreEq].push(elemento);
      });

      // Actualiza el estado con los nuevos componentes separados
      setComponentesSeparados(nuevosComponentesSeparados);
    };

    // Llama a la función para agrupar cuando el array de detalles cambie
    agruparComponentes();
  }, [detalles]);


  return (
    <div className='contaniner-nav'>
    <PersistentDrawerLeft />
    <section className="container">
    <div className='solicitudes'>
      <div><h1>Informe de Equipos</h1></div>
      <div>
      <button className='enviar2' onClick={verPDF}>Generar PDF de Equipos Disponibles</button>
      <button className='enviar2' onClick={verPDFAlta}>Ver Alta de Equipos por Gestión</button>
      <button className='enviar2' onClick={verPDFMovimiento}>Ver Movimiento de Equipos por Gestión</button>
      <button className='enviar2' onClick={verPDFBaja}>Ver Baja de Equipos por Gestión</button>
      </div>
      
    <div className='container-cards'>
      {opciones.map((datos) => (
        <div className='pc' name={datos.NombreEq} id={datos.NombreEq} key={datos.NombreEq} onClick={() => handleSubmit(datos.NombreEq)}>
            <div className='pantalla'>{datos.NombreEq}</div><div className='soporte'></div><div className='sb'></div>
        </div>
      ))}
      </div>
      <div>
    <Modals isOpenM={modalOpenMar} onCloseM={handleCloseModalM} childrenM={
      <div className='letra'>
          
      <div>
        {(detalles.length > 0)?(
          <div className='reporte'>
          <div className='fil'><div>Nombre de Equipo</div><div>{detalles[0].NombreEq}</div></div>
          <div className='fil'><div>Grupo de Trabajo</div><div>{detalles[0].GrupoTrabajo}</div></div>
        </div>
        ):null}
        
        {Object.values(componentesSeparados).map((equi)=>{
            let arr=[];
            return(
    (Object.values(equi).length > 0)? (Object.values(equi).map((datos) => {
      
      if (arr.indexOf(datos.DescripCo)==-1){
        arr.push(datos.DescripCo)
        return(
        <div className='ContenedorReporte'>
          <div className='column1'>
          <div className='bordeComp'>{datos.DescripCo}</div>
          </div>
          <div className='reporte'>
            <div className='fil'><div>Marca</div><div>{datos.DescripMar}</div></div>
          {Object.values(detalles).map((d) => {
            if(d.CodComp==datos.CodComp){
            return(
          <div className='fil'><div>{d.DescripItem}</div><div onClick={() => handleOpenModalUV(`${d.codEC}/${d.CodItem}`)} value={`${d.codEC}/${d.CodItem}`}>{d.Valor}</div></div>
            )
            }
          })}
          </div>
        </div>
        )
      }
    
  
    })):null)
  })}
   </div>
    </div>
    }>
      
      
      </Modals>
        
    </div>
    {/*AQUI EL MODAL LAB */}
    <div>
    <UpdateValorItem isOpenUV={modalOpenUV} onCloseUV={handleCloseModalUV} datosUpv={datosUV}>
        
        </UpdateValorItem>
    </div>
    {/*marca */}
    </div>
    </section>
    </div>
    
  );
}

export default DetalleEquipo;