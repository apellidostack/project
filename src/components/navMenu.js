
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from './login';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import FactCheckIcon from '@mui/icons-material/FactCheck';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  let arr=[];

  if(localStorage.getItem('user')!=null){
    const storedJsonString = localStorage.getItem('user');
    // Convertir la cadena JSON en un objeto
  const storedUserData = JSON.parse(storedJsonString);
  //console.log(storedUserData.usuario);
    
    switch(storedUserData.usuario.DescripCar){
      case 'DOCENTE': arr=['solicitudes'];
      break;
      case 'ENCARGADO': arr={'Registro de Equipo':'p','Registro de Equipo Adicional':'registroAd','Informe de Equipos':'detalleEq','Baja de Equipo':'solicitarbaja','Baja de Equipo Adicional':'SolicitarBajaAdicional','Movimientos':'movimientoEq','Movimiento de Equipo Adicional':'movimientoEquipoAdicional','Reporte de movimiento de equipo':'TablaHistorialMovEq'};
      break;
      case 'RECTOR': arr={'Autorizar Movimiento de Equipos':'autorizarMovimientoEq','Autorizar Movimiento de Equipos Adicionales':'AutorizarMovAd','Personal':'personal','Informe de Equipos':'detalleEq','Informe de Equipos Adicionales Disponibles':'ReporteEquiposAdicionales','Informe de Movimiento de Equipos Adicionales por Gestión':'ReporteMovimientoEquipoAdicional','Informe de Baja de Equipos Adicionales por la Gestión':'ReporteBajaEquipoAdicional'};
      break;
    }
  }else{
  
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{background: 'rgb(2,0,36)',
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}} position="fixed" open={open}>
        <Toolbar sx={{background: 'rgb(2,0,36)',
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Intjem
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{background: 'rgb(2,0,36)',
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{height: '100vh',background: 'rgb(2,0,36)',
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', color: 'white'}}>
          {Object.entries(arr).map(([text, index]) => (
            <ListItem onClick={() => navigate(`/${index}`)} sx={{background: 'rgb(2,0,36)',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}} key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color:'white'}}>
                  {<FactCheckIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{backgroundColor: 'white'}}/>
          <ListItem onClick={() => {localStorage.removeItem('user'); navigate('/')}} sx={{background: 'rgb(2,0,36)',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color:'white'}}>
                  <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary={'Cerrar sesion'} />
              </ListItemButton>
            </ListItem>
        </List>
        
      </Drawer>
    </Box>
  );
}