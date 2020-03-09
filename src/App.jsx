import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import { ChildrenDemo } from './pages';
import { theme } from './theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography align="center"><ChildrenDemo /></Typography>
    </ThemeProvider>
  );
}

export default App;
