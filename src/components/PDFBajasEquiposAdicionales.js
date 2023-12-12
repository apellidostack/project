// Ejemplo de componente que se va a incluir en el PDF
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';
import { format } from 'date-fns';

const MyComponent = (props) => {
  const ExtraerNumeros = ( texto ) => {
    // Usa una expresión regular para encontrar todos los números en el texto
    const numerosEncontrados = texto.match(/\d+/g);
  
    // Devuelve el array de números encontrados o un array vacío si no se encontraron números
    return numerosEncontrados || "";
  };

  const mesesEnLetras = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mesEnLetras = mesesEnLetras[fechaActual.getMonth()];
  const año = fechaActual.getFullYear();

  const fechaConMesEnLetras = `${dia} de ${mesEnLetras} de ${año}`;
    
  return (
    <View style={styles.container}>
      <View style={{fontSize: '10px', textAlign: 'center', width: '170px'}}>
        <Text>Instituto Tecnico "Jesus Maria 2"</Text>
        <Text>ORURO-BOLIVIA</Text>
        </View>
        <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={{marginBottom: '10px', textAlign: 'center',marginTop: '30px', width:'80%', padding: '3px', fontSize: '16px', fontFamily: 'Times-Roman'}}>INFORME DE BAJA DE EQUIPOS DE COMPUTACIÓN</Text>
        <Text style={{marginBottom: '10px', textAlign: 'center', width:'80%', padding: '3px', fontSize: '16px', fontFamily: 'Times-Roman'}}>ADICIONALES {format(new Date(props.infoComp[0].FechaBaja), 'dd/MM/yyyy')}</Text>
        <Text style={{ marginBottom: '10px', textAlign: 'center', marginTop: '30px', width: '80%', padding: '3px', fontSize: '16px', fontFamily: 'Times-Roman' }}>LABORATORIO JESUS MARIA {props.infoComp[0]?.NroLab && ExtraerNumeros(props.infoComp[0]?.NroLab)?.join(', ')}</Text>
        </View>
        <View><Text style={[{color: 'black',fontSize: 12,marginBottom: '5px'}]}>REALIZADO POR: {props.realizadoPor}</Text></View>
        <View style={styles.datos}>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '5%'}]}>N°:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '15%'}]}>CÓDIGO:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '18%'}]}>DESCRIPCIÓN:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '15%'}]}>MARCA:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '15%'}]}>MODELO:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '25%'}]}>N° DE SERIE:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',width: '15%'}]}>INDUSTRIA:</Text>
        </View>
        {(props.infoComp.length > 0)? (Object.values(props.infoComp).map((datos,index) => {
      
        return(
          
          <View style={styles.datos}>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '5%'}]}>{index+1}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '15%'}]}>{datos.CodEquipoAd}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '18%'}]}>{datos.DescripEqAd}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '15%'}]}>{datos.DescripMar}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '15%'}]}>{datos.Descrip}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '25%'}]}>{datos.NroSerie}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'rgb(255, 247, 203)',width: '15%'}]}>{datos.DescripInd}</Text>
          </View>
          
        )
    
  
    })):null}
    <Text style={{textAlign: 'right', fontSize: '10px', marginTop: '5px'}}>ORURO, {fechaConMesEnLetras}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    width: '90%',
    margin: '0 auto',
  },
  datos: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  reporte: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: '1',
    backgroundColor: 'rgb(255, 247, 203)',
  },
  
  bordeComp: {
    border: '1px solid black',
    margin: '0 -1px -1px 0',
    fontSize: 8,
    padding: '5px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(189, 231, 255)',
  },
  fil: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '10px',
    border: '1px solid black',
    margin: '0 -1px -1px 0',
    flex: 'auto',
    paddingBottom: '5px',
    paddingTop: '5px',
  }
});




const PDFGenerarBajaEquiposAdicionales = (props) => {
  //console.log(props.info);
  const elementosSeparados = {};
    // Itera sobre el array original y agrupa los elementos por NroLab
    props.info.forEach((elemento) => {
      const NroLab = elemento.CodBajaAd;
      if (!elementosSeparados[NroLab]) {
        elementosSeparados[NroLab] = [];
      }
      elementosSeparados[NroLab].push(elemento);
    });
    console.log(elementosSeparados);
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        {Object.values(elementosSeparados).map((el)=>(
          <Page size="A4">
          <MyComponent infoComp={el} realizadoPor={props.nombre} />
        </Page>
        ))}
        
        {/* Agrega más páginas y componentes aquí si es necesario */}
      </Document>
    </PDFViewer>
  );
};

export default PDFGenerarBajaEquiposAdicionales;

