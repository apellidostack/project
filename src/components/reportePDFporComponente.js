// Ejemplo de componente que se va a incluir en el PDF
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';

const MyComponent = (props) => {
  const mesesEnLetras = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mesEnLetras = mesesEnLetras[fechaActual.getMonth()];
  const año = fechaActual.getFullYear();

  const fechaConMesEnLetras = `${dia} de ${mesEnLetras} de ${año}`;
    
    const elementosSeparados2 = {};
    // Itera sobre el array original y agrupa los elementos por NombreEq
    props.infoComp.forEach((elemento) => {
      const NombreEq = elemento.NombreEq;
      if (!elementosSeparados2[NombreEq]) {
        elementosSeparados2[NombreEq] = [];
      }
      elementosSeparados2[NombreEq].push(elemento);
    });
  return (
    <View style={styles.container}>
      <View style={{fontSize: '10px', textAlign: 'center', width: '170px'}}>
        <Text>Instituto Tecnico "Jesus Maria 2"</Text>
        <Text>ORURO-BOLIVIA</Text>
        </View>
        <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={{border: '1px solid black', marginBottom: '10px', textAlign: 'center',marginTop: '30px', width:'80%', padding: '3px', fontSize: '16px', fontFamily: 'Times-Roman'}}>INVENTARIO DE EQUIPOS DE COMPUTACIÓN</Text>
        </View>
        <View style={styles.datos}>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',padding: '5px'}]}>REALIZADO POR:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',padding: '5px'}]}>{props.realizadoPor}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',padding: '5px'}]}>NOMBRE DE EQUIPO:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'red',padding: '5px'}]}>{props.infoComp[0].NombreEq}</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',padding: '5px'}]}>LABORATORIO:</Text>
            <Text style={[styles.bordeComp,{backgroundColor: 'blue',color: 'white',padding: '5px'}]}>{props.infoComp[0].NroLab}</Text>
        </View>
        {Object.values(elementosSeparados2).map((equi)=>{
          const componentesSeparados = {};
          // Itera sobre el array original y agrupa los elementos por NombreEq
          equi.forEach((elemento) => {
            const nombreEq = `${elemento.idEq}${elemento.CodComp}`;
            if (!componentesSeparados[nombreEq]) {
              componentesSeparados[nombreEq] = [];
            }
            componentesSeparados[nombreEq].push(elemento);
          });
            let arr=[];
            return(
              (Object.values(componentesSeparados)).map((equi)=>{
                let arr=[];
                return(
                (Object.values(equi).length > 0)? (Object.values(equi).map((datos) => {
                    if (arr.indexOf(datos.DescripCo)==-1){
                      arr.push(datos.DescripCo)
                      return(
                      <View style={styles.ContenedorReporte}>
                        <View style={styles.column1}>
                        <View style={styles.bordeComp}><Text>{datos.DescripCo}</Text></View>
                        </View>
                        <View style={[styles.reporte,styles.columna2]} >
                        <View style={styles.fil}><Text>Marca</Text><Text>{datos.DescripMar}</Text></View>
                        {Object.values(props.infoComp).map((d) => {
                          if(d.CodComp==datos.CodComp){
                          return(
                        <View style={styles.fil}><Text>{d.DescripItem}</Text><Text value={`${d.codEC}/${d.CodItem}`}>{d.Valor}</Text></View>
                          )
                          }
                        })}
                        <View style={styles.fil}><Text>N° de Serie</Text><Text>{datos.CodComp}</Text></View>
                        </View>
                      </View>
                      )
                    }
                  
                
                  })):null)
            }))
        })}
        
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
    flexWrap: 'wrap',
    fontSize: '14px',
    marginBottom: '5px',
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
  ContenedorReporte:{
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
  },
  column1: {
    width: '30%',  /* Espaciado interno */
  },
  
  column2: {
     /* Ancho fijo de la segunda columna */
  },
  bordeComp: {
    border: '1px solid black',
    margin: '0 -1px -1px 0',
    fontSize: 12,
    display: 'flex',
    flexGrow: '1',
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




const PDFReportePorComponente = (props) => {
  //console.log(props.info);
  const elementosSeparados = {};
    // Itera sobre el array original y agrupa los elementos por NombreEq
    props.info.forEach((elemento) => {
      const NroLab = elemento.NroLab;
      if (!elementosSeparados[NroLab]) {
        elementosSeparados[NroLab] = [];
      }
      elementosSeparados[NroLab].push(elemento);
    });
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

export default PDFReportePorComponente;

