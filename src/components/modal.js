import React, { useState, useEffect } from 'react';
import Valor from "./modalValor";
import '../estilos/modal.css';

const Modals=({ isOpenM, onCloseM, childrenM })=>{
  //const [opcionesI, setOpcionesI] = useState([]);
  if (!isOpenM) {return null;}

  

  
  return(
    <div className="modal-overlay">
      <div className="modal">
            
      <button className="modal-close" onClick={onCloseM}>
          &#x2715;
        </button>
        {childrenM}
      </div>
      </div>
  )
}
export default Modals;