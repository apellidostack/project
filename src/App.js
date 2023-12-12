import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './components/login';
//import Inicio from './components/inicio';
import Motivo from './components/tarea';
import NewComponent from './components/newComponente';
import Equipo from './components/newEquipo';
import DetalleItem from './components/detalleItem';
import ListaEquipos from './components/listaEquipos';
import DetalleEquipo from './components/detalleEquipo';
import ElementGenerator from './components/pruebaxd';
import ComponentePadre from './components/solicitudesClient';
//import ContactPage from './ContactPage';
import MenuPro from './components/navMenu';

import Solicitar from './components/vistasolicitar';
import TablaPersonal from './components/tablaPersonal';
import ReportePdf from './components/reportePdf';
import SolicitarBaja from './components/vistaBajaEq';
import ReporteTotal from './components/reporteTotalEq';
import RegistroEqAd from './components/vistaEquipoAdicional';
import SolicitarMovimiento from './components/vistaMovimientoEq';
import TablaAutorizar from './components/vistaAutorizar';
import SolicitarMovimientoComponente from './components/vistaMovimientoCOmponentes';
import ReporteHistoricoEq from './components/reportePDFHistorialMovEq';
import TablaHistorialMovimientos from './components/vistaHistorialMovEq';
import SolicitarMovimientoAdicional from './components/vistaMovimientoAd';

import ReporteHistoricoDeEquipo from './components/vistaHistoricoDeEquipo';
import TablaAutorizarMovAd from './components/vistaAutorizarMovimientoAdicional';
import TablaAutorizarMovComp from './components/vistaAutorizarMovComponente';
import SolicitarBajaAdicional from './components/vistaBajaEqAd';
import TablaAutorizarBajaAdicional from './components/vistaAutorizarBajaAdicional';

import TablaAutorizarBajaEquipo from './components/vistaAutorizarBajaEquipo';

import ReporteTotalAdicional from './components/vistaReporteEquipoAdicional';
import ReporteAltaDeEquipo from './components/vistaReporteAltaEquipo';
import ReportePorComponente from './components/vistaReportePorComponente';

import ReporteBajaDeEquipo from './components/vistaReporteBajaEquipo';

import TablaAtenderSolicitudes from './components/vistaMantenimientosPendientes';
import RegistrarEquipoComponente from './components/vistaRegistrarEquipoComponente';

import ReporteAnualMovimientoEquipos from './components/vistaReporteAnualMovEq';

import ReporteBajaDeEquipoAdicional from './components/vistaReporteBajaAdicionalXgestion';
import ReporteMovimientoEquipoAdicional from './components/vistaReporteMovimientosAdicionales';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/motivo" element={<Motivo />} />
        <Route path="/componente" element={<NewComponent />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/detalleItem" element={<DetalleItem />} />
        <Route path="/detalleEq" element={<DetalleEquipo />} />
        <Route path="/prueba" element={<ElementGenerator />} />
        <Route path="/p" element={<ComponentePadre />} />
        <Route path="/solicitudes" element={<Solicitar />} />
        <Route path="/personal" element={<TablaPersonal />} />
        <Route path="/reporte" element={<ReportePdf />} />
        <Route path="/solicitarbaja" element={<SolicitarBaja />} />
        <Route path="/reporteTotal" element={<ReporteTotal />} />
        <Route path="/registroAd" element={<RegistroEqAd />} />
        <Route path="/movimientoEq" element={<SolicitarMovimiento />} />
        <Route path="/autorizarMovimientoEq" element={<TablaAutorizar />} />
        <Route path="/SolicitudMovimientoComp" element={<SolicitarMovimientoComponente />} />
        <Route path="/ReporteHistoricoMovimientos" element={<ReporteHistoricoEq />} />
        <Route path="/TablaHistorialMovEq" element={<TablaHistorialMovimientos />} />
        <Route path="/historicoDeEquipo" element={<ReporteHistoricoDeEquipo />} />
        <Route path="/movimientoEquipoAdicional" element={<SolicitarMovimientoAdicional />} />
        <Route path="/AutorizarMovAd" element={<TablaAutorizarMovAd />} />
        <Route path="/AutorizarMovComp" element={<TablaAutorizarMovComp />} />
        <Route path="/SolicitarBajaAdicional" element={<SolicitarBajaAdicional />} />
        <Route path="/AutorizarBajaAdicional" element={<TablaAutorizarBajaAdicional />} />
        <Route path="/ReporteEquiposAdicionales" element={<ReporteTotalAdicional />} />
        <Route path="/ReporteAltaEquipo" element={<ReporteAltaDeEquipo />} />
        <Route path="/ReportePorComponente" element={<ReportePorComponente />} />
        <Route path="/SolicitudesPendientes" element={<TablaAtenderSolicitudes />} />
        <Route path="/RegistrarEqComponente" element={<RegistrarEquipoComponente />} />
        <Route path="/AutorizarBajaDeEquipo" element={<TablaAutorizarBajaEquipo />} />
        <Route path="/ReporteBajaEquipo" element={<ReporteBajaDeEquipo />} />
        <Route path="/MovimientosGestion" element={<ReporteAnualMovimientoEquipos />} />
        <Route path="/ReporteBajaEquipoAdicional" element={<ReporteBajaDeEquipoAdicional />} />
        <Route path="/ReporteMovimientoEquipoAdicional" element={<ReporteMovimientoEquipoAdicional />} />
      </Routes>
    </Router>
  );
}

export default App;

