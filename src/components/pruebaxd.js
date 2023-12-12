import React, { useState } from 'react';

function ElementGenerator() {
  const [elements, setElements] = useState([]);

  const createElement = (elementType) => {
    let newElement;

    if (elementType === 'input') {
      newElement = React.createElement(elementType, {
        key: Date.now(),
        type: 'text', // Puedes ajustar el tipo de input según tus necesidades
      });
    } else {
      newElement = React.createElement(elementType, {
        key: Date.now(),
        children: `Nuevo ${elementType}`,
      });
    }

    setElements((prevElements) => [...prevElements, newElement]);
  };

  return (
    <div>
      <button onClick={() => createElement('div')}>Crear Div</button>
      <button onClick={() => createElement('label')}>Crear Label</button>
      <button onClick={() => createElement('input')}>Crear Input</button>

      <div>
        {elements.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
      </div>
    </div>
  );
}

export default ElementGenerator;
