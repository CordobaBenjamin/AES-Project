import * as React from 'react';
import "animate.css"
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className="custom-navbar">
        <Toolbar className="custom-toolbar">
          <Typography variant="h6" className="navbar-title animate__animated animate__pulse">
          Demostracion de Criptografía simétrica
          </Typography>
          <IconButton className="avatar-button">
            <Avatar className="avatar-icon">
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
