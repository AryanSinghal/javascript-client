import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Trainee, Navbar } from './pages';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <br />
      <Trainee />
    </>
  );
}

export default App;
